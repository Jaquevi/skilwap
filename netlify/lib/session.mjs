import { createHash, randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { getStore } from '@netlify/blobs';

const derive = promisify(scrypt);
const cookieName = 'skillswap_session';
const sessionSeconds = 8 * 60 * 60;
const accounts = [
  { id: 'demo1', name: 'Usuario 1', salt: 'e48cdac57d1e808716943864afb4d1d2', hash: '652e3d8cf7e8274a091f0be69bc2a580280e2668cf18bb53cee6e316d2780254f1a69d11a2d0227454cfded1ffcacca3476d49fbc16aa17c2828c4f3f3f218ae' },
  { id: 'demo2', name: 'Usuario 2', salt: '2381630748d092d22718481dba2bcf84', hash: '1d9a96b8cb8e780189676ce1ad095c3310bffae25da2f6526eecd9f61be1bbc420f13ee88ee8fc83f301f043a033778ee81415efd38384e5aa816e4d589aafb2' },
];

function sessions() {
  return getStore({ name: 'skillswap-sessions', consistency: 'strong' });
}

function tokenKey(token) {
  return createHash('sha256').update(token).digest('hex');
}

function requestToken(request) {
  const cookie = request.headers.get('cookie') ?? '';
  return cookie.match(/(?:^|;\s*)skillswap_session=([\w-]{43})(?:;|$)/)?.[1];
}

function publicUser(account) {
  return { id: account.id, name: account.name };
}

export async function authenticate(username, password) {
  const account = accounts.find(({ id }) => id === username?.trim().toLowerCase());
  if (!account || typeof password !== 'string' || password.length > 128) return null;
  const hash = await derive(password, account.salt, 64);
  return timingSafeEqual(hash, Buffer.from(account.hash, 'hex')) ? publicUser(account) : null;
}

export async function getUser(request) {
  const token = requestToken(request);
  if (!token) return null;
  const session = await sessions().get(tokenKey(token), { type: 'json' });
  if (!session || session.expiresAt <= Date.now()) return null;
  const account = accounts.find(({ id }) => id === session.userId);
  return account ? publicUser(account) : null;
}

function sessionCookie(request, token, maxAge) {
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return { 'Set-Cookie': `${cookieName}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${secure}` };
}

export async function clearSession(request) {
  const token = requestToken(request);
  if (token) await sessions().delete(tokenKey(token));
  return sessionCookie(request, '', 0);
}

export async function createSession(request, user) {
  const token = randomBytes(32).toString('base64url');
  await sessions().setJSON(tokenKey(token), {
    userId: user.id,
    expiresAt: Date.now() + sessionSeconds * 1000,
  });
  return sessionCookie(request, token, sessionSeconds);
}

import { createHash, randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { getStore } from '@netlify/blobs';

const derive = promisify(scrypt);
const cookieName = 'skillswap_session';
const sessionSeconds = 8 * 60 * 60;
const accounts = [
  { id: 'demo1', username: 'user1', name: 'Usuario 1', salt: '90576087ed89f3b161eeed673dd99209', hash: '4db56eb78f90cc1b8a458ce8b8c25937d69b98271d29c482681fcb86d050ba1eb1f4541bec916c4646f48134a42fcabca52a036e7331ddb55a847b445d7b4d1f' },
  { id: 'demo2', username: 'user2', name: 'Usuario 2', salt: 'f28c4b2b563ee587f44a98b5f31c71e2', hash: '96f14f793c2a20a4388486b252a7649152b69b115e3bf763589d6ab8f9a7adf5096f72d9876b562e2e7352e08e7cb9e5b6ed8488ba4918467453d58426f2c77c' },
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
  const account = accounts.find((account) => account.username === username?.trim().toLowerCase());
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

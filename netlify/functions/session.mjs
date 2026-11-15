import { json, readBody, run, safeText } from '../lib/api.mjs';
import { authenticate, clearSession, createSession, getUser } from '../lib/session.mjs';

export default function handler(request) {
  return run(request, {
    async GET() {
      return json({ user: await getUser(request) });
    },
    async POST() {
      const body = await readBody(request);
      const user = await authenticate(safeText(body?.username, 32), body?.password);
      if (!user) return json({ error: 'Usuario o contraseña incorrectos.' }, 401);
      await clearSession(request);
      return json({ user }, 200, await createSession(request, user));
    },
    async DELETE() {
      return json({ user: null }, 200, await clearSession(request));
    },
  });
}

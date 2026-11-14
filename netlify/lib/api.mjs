import { getStore } from '@netlify/blobs';

export function skillsStore() {
  return getStore({ name: 'skillswap-skills', consistency: 'strong' });
}

export function json(value, status = 200, headers = {}) {
  return Response.json(value, {
    status,
    headers: { 'Cache-Control': 'no-store', ...headers },
  });
}

export async function readBody(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export function safeText(value, limit) {
  if (typeof value !== 'string') return null;
  const text = value.trim();
  return text.length <= limit ? text : null;
}

export async function run(request, handlers) {
  const handler = Object.hasOwn(handlers, request.method) && handlers[request.method];
  if (!handler) {
    return json({ error: 'Método no permitido.' }, 405, { Allow: Object.keys(handlers).join(', ') });
  }

  try {
    return await handler();
  } catch (error) {
    console.error('Error en la API de SkillSwap', error);
    return json({ error: 'No se pudo completar la solicitud.' }, 500);
  }
}

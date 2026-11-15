const apiBase = import.meta.env.VITE_API_URL ?? '/api';

export async function requestApi(resource, options) {
  const response = await fetch(`${apiBase}/${resource}`, options);
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.error ?? 'No se pudo completar la solicitud. Inténtalo de nuevo.');
  }
  return response.json();
}

function sendRecord(resource, method, record) {
  return requestApi(resource, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record),
  });
}

export function createRecord(resource, record) {
  return sendRecord(resource, 'POST', record);
}

export function updateRecord(resource, record) {
  return sendRecord(resource, 'PATCH', record);
}

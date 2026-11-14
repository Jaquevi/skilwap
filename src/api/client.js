const apiBase = import.meta.env.VITE_API_URL ?? '/api';

export async function requestApi(resource, options) {
  const response = await fetch(`${apiBase}/${resource}`, options);
  if (!response.ok) throw new Error(`Error HTTP ${response.status}`);
  return response.json();
}

export function createRecord(resource, record) {
  return requestApi(resource, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record),
  });
}

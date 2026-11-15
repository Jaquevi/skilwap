import { randomUUID } from 'node:crypto';
import { getStore } from '@netlify/blobs';
import { json, readBody, run, safeText, skillsStore } from '../lib/api.mjs';
import { getUser } from '../lib/session.mjs';

function isRecordId(value) {
  return typeof value === 'string' && /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/.test(value);
}

export default function handler(request) {
  return run(request, {
    GET: () => handleProposalRequest(request, listProposals),
    POST: () => handleProposalRequest(request, sendProposal),
    PATCH: () => handleProposalRequest(request, answerProposal),
  });
}

async function handleProposalRequest(request, handle) {
  const user = await getUser(request);
  if (!user) return json({ error: 'Inicia sesión para usar las propuestas.' }, 401);
  const store = getStore({ name: 'skillswap-proposals', consistency: 'strong' });
  return handle(request, user, store);
}

async function listProposals(_request, user, store) {
  const { blobs } = await store.list();
  const records = await Promise.all(blobs.map(({ key }) => store.get(key, { type: 'json' })));
  const proposals = records
    .filter((record) => record && (record.senderId === user.id || record.recipientId === user.id))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return json({
    sent: proposals.filter((record) => record.senderId === user.id),
    received: proposals.filter((record) => record.recipientId === user.id),
  });
}

async function sendProposal(request, user, store) {
  const body = await readBody(request);
  const skillId = body?.skillId;
  const teaches = safeText(body?.teaches, 150);
  const message = safeText(body?.message ?? '', 1000);
  if (!isRecordId(skillId) || !teaches || message === null) {
    return json({ error: 'Revisa los datos de la propuesta.' }, 400);
  }

  const skill = await skillsStore().get(skillId, { type: 'json' });
  if (!skill?.ownerId || skill.ownerId === user.id) {
    return json({ error: 'Elige una habilidad publicada por la otra cuenta.' }, 409);
  }

  const record = {
    id: randomUUID(),
    skillId,
    skillName: skill.teaches,
    senderId: user.id,
    senderName: user.name,
    recipientId: skill.ownerId,
    recipientName: skill.author.name,
    teaches,
    message,
    status: 'pending',
    reply: '',
    createdAt: new Date().toISOString(),
  };
  await store.setJSON(record.id, record);
  return json({ id: record.id }, 201);
}

async function answerProposal(request, user, store) {
  const body = await readBody(request);
  const status = body?.status;
  const reply = safeText(body?.reply ?? '', 1000);
  if (!isRecordId(body?.id) || !['accepted', 'rejected'].includes(status) || reply === null) {
    return json({ error: 'Revisa la respuesta.' }, 400);
  }

  const existing = await store.getWithMetadata(body.id, { type: 'json' });
  if (!existing || existing.data.recipientId !== user.id) {
    return json({ error: 'No se encontró la propuesta recibida.' }, 404);
  }
  if (existing.data.status !== 'pending') {
    return json({ error: 'Esta propuesta ya fue respondida. Actualiza la bandeja.' }, 409);
  }

  const record = { ...existing.data, status, reply };
  const { modified } = await store.setJSON(body.id, record, { onlyIfMatch: existing.etag });
  if (!modified) return json({ error: 'La propuesta cambió. Actualiza la bandeja.' }, 409);
  return json(record);
}

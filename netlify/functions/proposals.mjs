import { randomUUID } from 'node:crypto';
import { getStore } from '@netlify/blobs';
import seed from '../../db.json' with { type: 'json' };
import { json, readBody, run, safeText, skillsStore } from '../lib/api.mjs';
import { getUser } from '../lib/session.mjs';

function isRecordId(value) {
  return typeof value === 'string' && /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/.test(value);
}

export default function handler(request) {
  return run(request, {
    GET: () => handleProposalRequest(request, listProposals),
    POST: () => sendProposal(request),
    PATCH: () => handleProposalRequest(request, answerProposal),
  });
}

async function handleProposalRequest(request, handle) {
  const user = await getUser(request);
  if (!user) return json({ error: 'Inicia sesión para usar las propuestas.' }, 401);
  return handle(request, user, proposalsStore());
}

function proposalsStore() {
  return getStore({ name: 'skillswap-proposals', consistency: 'strong' });
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

async function sendProposal(request) {
  const user = await getUser(request);
  const body = await readBody(request);
  const skillId = body?.skillId;
  const name = safeText(body?.name ?? user?.name, 120);
  const teaches = safeText(body?.teaches, 150);
  const message = safeText(body?.message ?? '', 1000);
  if ((!Number.isSafeInteger(skillId) && !isRecordId(skillId)) || !name || !teaches || message === null) {
    return json({ error: 'Revisa los datos de la propuesta.' }, 400);
  }

  const skill = Number.isSafeInteger(skillId)
    ? seed.skills.find((record) => record.id === skillId)
    : await skillsStore().get(skillId, { type: 'json' });
  if (!skill) return json({ error: 'La habilidad ya no está disponible.' }, 404);
  if (skill.ownerId && !user) return json({ error: 'Inicia sesión para enviar la propuesta a esta cuenta.' }, 401);
  if (skill.ownerId && skill.ownerId === user?.id) {
    return json({ error: 'Elige una habilidad de otra persona.' }, 409);
  }

  const record = {
    id: randomUUID(),
    skillId,
    skillName: skill.teaches,
    senderId: user?.id ?? null,
    senderName: name,
    recipientId: skill.ownerId ?? null,
    recipientName: skill.author.name,
    teaches,
    message,
    status: skill.ownerId ? 'pending' : 'registered',
    reply: '',
    createdAt: new Date().toISOString(),
  };
  await proposalsStore().setJSON(record.id, record);
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

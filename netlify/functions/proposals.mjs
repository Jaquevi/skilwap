import { randomUUID } from 'node:crypto';
import { getStore } from '@netlify/blobs';
import seed from '../../db.json' with { type: 'json' };
import { readBody, safeText, json, run, skillsStore } from '../lib/api.mjs';

export default function handler(request) {
  return run(request, {
    async POST() {
      const body = await readBody(request);
      const skillId = body?.skillId;
      const name = safeText(body?.name, 120);
      const teaches = safeText(body?.teaches, 150);
      const message = safeText(body?.message ?? '', 1000);
      const initialSkill = seed.skills.some((skill) => skill.id === skillId);
      const publishedId = typeof skillId === 'string' && /^[a-f\d-]{36}$/.test(skillId);
      if (!name || !teaches || message === null || (!initialSkill && !publishedId)) {
        return json({ error: 'Revisa los datos de la propuesta.' }, 400);
      }
      if (!initialSkill && !await skillsStore().get(skillId)) {
        return json({ error: 'La habilidad ya no está disponible.' }, 404);
      }

      const record = { id: randomUUID(), skillId, name, teaches, message };
      await getStore('skillswap-proposals').setJSON(record.id, record);
      return json({ id: record.id }, 201);
    },
  });
}

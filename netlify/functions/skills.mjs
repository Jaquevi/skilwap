import { randomUUID } from 'node:crypto';
import seed from '../../db.json' with { type: 'json' };
import { CATEGORIES } from '../../src/data/mockSkills.js';
import { readBody, safeText, json, run, skillsStore } from '../lib/api.mjs';

const modes = ['Online (Zoom / Meet)', 'Presencial', 'Híbrido'];

export default function handler(request) {
  return run(request, {
    async GET() {
      const store = skillsStore();
      const { blobs } = await store.list();
      const records = await Promise.all(blobs.map(({ key }) => store.get(key, { type: 'json' })));
      const published = records.filter(Boolean).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
      return json([...seed.skills, ...published]);
    },
    async POST() {
      const body = await readBody(request);
      const name = safeText(body?.author?.name, 120);
      const teaches = safeText(body?.teaches, 150);
      const wants = safeText(body?.wants, 150);
      const description = safeText(body?.description ?? '', 1000);
      if (!name || !teaches || !wants || description === null ||
          body.category === 'Todas' || !CATEGORIES.includes(body.category) || !modes.includes(body.mode)) {
        return json({ error: 'Revisa los datos de la habilidad.' }, 400);
      }

      const record = {
        id: randomUUID(),
        author: { name, avatar: '', rating: null, location: '' },
        category: body.category,
        teaches,
        wants,
        teachesLevel: 'Entusiasta',
        mode: body.mode,
        description,
        badges: ['Nuevo'],
        createdAt: new Date().toISOString(),
      };
      await skillsStore().setJSON(record.id, record);
      return json(record, 201);
    },
  });
}

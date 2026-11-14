import { useEffect, useState } from 'react';
import { requestApi } from './client';

export function useSkills() {
  const [skills, setSkills] = useState([]);
  const [status, setStatus] = useState('loading');
  const [revision, setRevision] = useState(0);

  function reload() {
    setStatus('loading');
    setRevision((current) => current + 1);
  }

  useEffect(() => {
    const controller = new AbortController();
    requestApi('skills', { signal: controller.signal })
      .then((records) => {
        if (!Array.isArray(records)) throw new Error('Catálogo inválido');
        if (controller.signal.aborted) return;
        setSkills([...records].reverse());
        setStatus('ready');
      })
      .catch(() => {
        if (!controller.signal.aborted) setStatus('error');
      });
    return () => controller.abort();
  }, [revision]);

  return { skills, status, reload };
}

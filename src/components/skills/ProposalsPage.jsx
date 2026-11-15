import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { requestApi, updateRecord } from '../../api/client';

const labels = { registered: 'Registrada', pending: 'Pendiente', accepted: 'Aceptada', rejected: 'Rechazada' };

function ProposalCard({ proposal, received, onAnswer }) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function answer(event) {
    event.preventDefault();
    if (saving) return;
    const reply = new FormData(event.currentTarget).get('reply');
    const status = event.nativeEvent.submitter?.value;
    if (!status) return;
    setSaving(true);
    setError('');

    try {
      await onAnswer({ id: proposal.id, status, reply });
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <article className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-bold text-slate-900">{proposal.skillName}</h3>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-900">{labels[proposal.status]}</span>
      </div>
      <p className="text-sm text-slate-600">{received ? 'De' : 'Para'} {received ? proposal.senderName : proposal.recipientName}</p>
      <p className="break-words text-sm"><strong>Ofrece enseñar</strong> {proposal.teaches}</p>
      {proposal.message && <p className="whitespace-pre-wrap break-words text-sm text-slate-700">{proposal.message}</p>}
      {proposal.reply && <p className="whitespace-pre-wrap break-words rounded-xl bg-slate-100 p-3 text-sm"><strong>Respuesta</strong> {proposal.reply}</p>}
      {received && proposal.status === 'pending' && (
        <form onSubmit={answer} className="space-y-3 border-t border-slate-200 pt-3">
          <label className="block text-sm font-semibold">
            Mensaje de respuesta (opcional)
            <textarea name="reply" rows={2} maxLength={1000} className="mt-1 block w-full rounded-lg border border-slate-300 p-2" />
          </label>
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <div className="flex flex-wrap gap-2">
            <button value="accepted" disabled={saving} className="rounded-lg bg-emerald-800 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">Aceptar</button>
            <button value="rejected" disabled={saving} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold disabled:opacity-60">Rechazar</button>
          </div>
        </form>
      )}
    </article>
  );
}

export function ProposalsPage({ currentUser, sessionReady, onOpenLogin }) {
  if (!sessionReady) return <p role="status" className="mx-auto max-w-5xl px-4 py-10">Comprobando sesión…</p>;
  if (currentUser) return <Inbox key={currentUser.id} />;

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold">Propuestas</h1>
      <p className="my-4 text-slate-600">Inicia sesión para ver tu bandeja.</p>
      <button onClick={onOpenLogin} className="rounded-xl bg-emerald-800 px-4 py-2 font-semibold text-white">Iniciar sesión</button>
    </section>
  );
}

function Inbox() {
  const { state } = useLocation();
  const [tab, setTab] = useState(state?.tab === 'sent' ? 'sent' : 'received');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    requestApi('proposals', { signal: controller.signal })
      .then(setData)
      .catch((error) => {
        if (!controller.signal.aborted) setError(error.message);
      });
    return () => controller.abort();
  }, [refresh]);

  function reload() {
    setData(null);
    setError('');
    setRefresh((value) => value + 1);
  }

  async function answer(values) {
    const updated = await updateRecord('proposals', values);
    setData((current) => current && ({
      ...current,
      received: current.received.map((proposal) => proposal.id === updated.id ? updated : proposal),
    }));
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">Propuestas</h1>
        <button onClick={reload} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold">Actualizar</button>
      </div>
      <div className="mb-5 flex gap-2">
        {Object.entries({ received: 'Recibidas', sent: 'Enviadas' }).map(([value, label]) => (
          <button key={value} aria-pressed={tab === value} onClick={() => setTab(value)} className="rounded-lg border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-900 aria-pressed:bg-emerald-800 aria-pressed:text-white">
            {label}
          </button>
        ))}
      </div>
      {error ? <p role="alert" className="text-red-700">{error}</p> : !data ? <p role="status">Cargando propuestas…</p> : (
        <div className="grid gap-4">
          {data[tab].length === 0 && <p className="text-slate-600">Aún no hay propuestas {tab === 'received' ? 'recibidas' : 'enviadas'}.</p>}
          {data[tab].map((proposal) => <ProposalCard key={proposal.id} proposal={proposal} received={tab === 'received'} onAnswer={answer} />)}
        </div>
      )}
    </section>
  );
}

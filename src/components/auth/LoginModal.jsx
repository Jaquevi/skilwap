import { useState } from 'react';
import { LogIn, X } from 'lucide-react';
import { createRecord } from '../../api/client';

export function LoginModal({ onClose, onLoginSuccess }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    if (pending) return;
    const form = new FormData(event.currentTarget);
    setError('');
    setPending(true);

    try {
      const { user } = await createRecord('session', {
        username: form.get('username'),
        password: form.get('password'),
      });
      onLoginSuccess(user);
    } catch (error) {
      setError(error.message);
      setPending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <section role="dialog" aria-modal="true" aria-labelledby="login-title" className="max-h-full w-full max-w-md overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <header className="flex items-center justify-between bg-emerald-950 px-6 py-5 text-white">
          <h2 id="login-title" className="flex items-center gap-2 text-lg font-bold">
            <LogIn aria-hidden="true" className="size-5 text-emerald-300" />
            Iniciar sesión
          </h2>
          <button type="button" onClick={onClose} disabled={pending} aria-label="Cerrar inicio de sesión" className="rounded-lg p-2 hover:bg-white/10">
            <X className="size-5" />
          </button>
        </header>
        <form onSubmit={submit} className="space-y-4 p-6">
          <p className="text-sm text-slate-600">Usa una de las dos cuentas de demostración.</p>
          <label className="block text-sm font-semibold">
            Usuario
            <input name="username" autoComplete="username" required maxLength={32} className="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2" />
          </label>
          <label className="block text-sm font-semibold">
            Contraseña
            <input name="password" type="password" autoComplete="current-password" required maxLength={128} className="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2" />
          </label>
          {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          <button disabled={pending} className="w-full rounded-xl bg-emerald-800 px-4 py-3 font-bold text-white hover:bg-emerald-900 disabled:opacity-60">
            {pending ? 'Ingresando…' : 'Iniciar sesión'}
          </button>
        </form>
      </section>
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, CheckCircle, Repeat, Send } from 'lucide-react';
import { CATEGORIES } from '../../data/mockSkills';

export const SwapModal = ({ onClose, targetSkill, showProposalsLink, onSubmit }) => {
  const hasRecipient = Boolean(targetSkill?.ownerId);
  const [formData, setFormData] = useState({
    name: '',
    teaches: '',
    wants: '',
    category: 'Programación & Tech',
    mode: 'Online (Zoom / Meet)',
    message: '',
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === 'saving') return;
    const data = {
      ...formData,
      name: formData.name.trim(),
      teaches: formData.teaches.trim(),
      wants: formData.wants.trim(),
      message: formData.message.trim(),
    };
    if (!data.name || !data.teaches || (!targetSkill && !data.wants)) {
      setError('Completa todos los campos obligatorios.');
      return;
    }

    setError('');
    setStatus('saving');
    try {
      await onSubmit(data, targetSkill);
      setStatus('saved');
    } catch (error) {
      setError(error.message);
      setStatus('idle');
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div role="dialog" aria-modal="true" aria-labelledby="swap-title" className="relative max-h-full overflow-y-auto w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-white">
              <Repeat className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 id="swap-title" className="text-lg font-bold">
                {targetSkill ? `Proponer Swap a ${targetSkill.author.name}` : 'Publicar Nueva Habilidad'}
              </h3>
              <p className="text-xs text-emerald-200">
                {targetSkill
                  ? (hasRecipient ? 'Conéctate y acuerden el intercambio' : 'Esta habilidad no tiene una bandeja para responder.')
                  : 'Comparte tu talento con la comunidad'}
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Cerrar formulario"
            disabled={status === 'saving'}
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {status === 'saved' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 role="status" className="text-xl font-bold text-slate-900 mb-2">{targetSkill ? 'Propuesta registrada' : 'Habilidad publicada'}</h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                {targetSkill ? 'Tu propuesta quedó guardada en SkillSwap.' : 'Tu habilidad ya está disponible en el catálogo.'}
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {targetSkill && showProposalsLink && <Link to="/propuestas" state={{ tab: 'sent' }} onClick={onClose} className="rounded-lg bg-emerald-800 px-4 py-2 text-white">Ver propuestas</Link>}
                <button type="button" onClick={onClose} className="rounded-lg border border-slate-300 px-4 py-2">Cerrar</button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <fieldset disabled={status === 'saving'} className="space-y-4">
                <div>
                  <label htmlFor="swap-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Tu Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ej. Claudio Morales"
                    id="swap-name"
                    maxLength={120}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                <div className={`grid grid-cols-1 gap-3 ${targetSkill ? '' : 'sm:grid-cols-2'}`}>
                  <div>
                    <label htmlFor="swap-teaches" className="block text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                      ¿Qué enseñas? *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ej. Guitarra, React, Inglés"
                      id="swap-teaches"
                      maxLength={150}
                      value={formData.teaches}
                      onChange={(e) => setFormData({ ...formData, teaches: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-emerald-300 bg-emerald-50/30 text-sm focus:outline-hidden focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>

                  {!targetSkill && (
                    <div>
                        <label htmlFor="swap-wants" className="block text-xs font-bold text-sky-800 uppercase tracking-wider mb-1">
                          ¿Qué buscas aprender? *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="ej. Python, Francés, Figma"
                          id="swap-wants"
                        maxLength={150}
                          value={formData.wants}
                          onChange={(e) => setFormData({ ...formData, wants: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-sky-300 bg-sky-50/30 text-sm focus:outline-hidden focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
                        />
                    </div>
                  )}
                </div>

                {!targetSkill && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="swap-category" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Categoría
                        </label>
                        <select
                          id="swap-category"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-emerald-600"
                        >
                          {CATEGORIES.filter(c => c !== 'Todas').map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="swap-mode" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Modalidad Preferida
                        </label>
                        <select
                          id="swap-mode"
                          value={formData.mode}
                          onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-emerald-600"
                        >
                          <option value="Online (Zoom / Meet)">Online (Zoom / Meet)</option>
                          <option value="Presencial">Presencial</option>
                          <option value="Híbrido">Híbrido</option>
                        </select>
                      </div>
                  </div>
                )}

                <div>
                  <label htmlFor="swap-message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mensaje o Presentación
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Cuéntanos un poco sobre tu experiencia o tu motivación..."
                    id="swap-message"
                    maxLength={1000}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-emerald-600"
                  ></textarea>
                </div>

              </fieldset>
              {error && <p role="alert" className="text-sm text-rose-700">{error}</p>}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  disabled={status === 'saving'}
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={status === 'saving'}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-bold shadow-md shadow-emerald-950/20 transition-all"
                >
                  <Send className="w-4 h-4 text-emerald-300" />
                  <span>{status === 'saving' ? 'Guardando…' : targetSkill ? 'Enviar propuesta' : 'Publicar habilidad'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

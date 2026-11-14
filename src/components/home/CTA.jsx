import { ActionLink } from '../shared/ActionLink';
import React from 'react';
import { PlusCircle, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const CTA = ({ onOpenSwapModal }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white relative overflow-hidden">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-700/60 text-emerald-200 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Acceso libre para toda la comunidad
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-6 leading-tight">
            ¿Listo para compartir tu talento y aprender sin límites?
          </h2>

          <p className="text-emerald-100/90 text-base sm:text-lg mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Todos somos expertos en algo y principiantes en algo más. Da el primer paso: publica lo que sabes y descubre quién quiere aprender de ti.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenSwapModal()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-emerald-950 font-black text-base shadow-lg shadow-emerald-950/40 hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              <PlusCircle className="w-5 h-5 text-emerald-950" />
              <span>Publicar Mi Primera Habilidad</span>
            </button>

            <ActionLink to="/habilidades" variant="secondary">
              <span>Explorar Habilidades</span>
              <ArrowRight className="w-4 h-4" />
            </ActionLink>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6 text-xs text-emerald-200/80">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Perfiles verificados
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Sin comisiones ni cobros
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% Colaborativo
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

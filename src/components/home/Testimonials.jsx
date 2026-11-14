import React from 'react';
import { Star, Quote, ArrowLeftRight } from 'lucide-react';
import { TESTIMONIALS } from '../../data/mockSkills';

export const Testimonials = ({ asPage = false }) => {
  const Heading = asPage ? 'h1' : 'h2';
  return (
    <section id="testimonials" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
            Historias Reales
          </span>
          <Heading className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Lo que dice nuestra comunidad
          </Heading>
          <p className="text-slate-600 mt-3 text-base">
            Miles de personas ya expandieron sus habilidades intercambiando tiempo y conocimientos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-emerald-200 mb-2" />

                <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-emerald-200"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <ArrowLeftRight className="w-3 h-3 text-emerald-600" />
                  <span>{t.swap}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

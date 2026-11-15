import React from 'react';
import { UserCheck, ArrowLeftRight, GraduationCap, CheckCircle } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../../data/mockSkills';

export const HowItWorks = ({ asPage = false }) => {
  const Heading = asPage ? 'h1' : 'h2';
  const stepIcons = [
    <UserCheck key="publish" className="w-7 h-7 text-emerald-700" />,
    <ArrowLeftRight key="explore" className="w-7 h-7 text-emerald-700" />,
    <GraduationCap key="learn" className="w-7 h-7 text-emerald-700" />
  ];

  return (
    <section id="how-it-works" className={`bg-white border-y border-slate-100 ${asPage ? 'py-9 sm:py-12' : 'pt-4 pb-9 sm:pb-12'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Proceso Colaborativo
          </span>
          <Heading className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            ¿Cómo funciona el intercambio?
          </Heading>
          <p className="text-slate-600 mt-3 text-base">
            Aprender una nueva disciplina no debería costar una fortuna. Sigue estos tres sencillos pasos para empezar hoy mismo.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-4 lg:gap-6 relative">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="relative p-5 lg:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-950/5 transition-all duration-300 group"
            >
              {/* Step number badge */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-50 transition-all">
                  {stepIcons[idx]}
                </div>
                <span className="text-4xl font-black text-slate-200 group-hover:text-emerald-200 transition-colors">
                  {step.step}
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-800 transition-colors">
                {step.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {step.description}
              </p>

              <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity">
                <CheckCircle className="w-4 h-4" />
                <span>Simple y transparente</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

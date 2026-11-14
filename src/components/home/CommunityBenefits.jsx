import React from 'react';
import { Coins, HeartHandshake, Clock, Users } from 'lucide-react';

export const CommunityBenefits = ({ asPage = false }) => {
  const Heading = asPage ? 'h1' : 'h2';
  const benefits = [
    {
      icon: <Coins className="w-6 h-6 text-emerald-700" />,
      title: 'Economía Colaborativa Real',
      desc: 'Accede a conocimientos de alto nivel sin barreras de precio. El intercambio se basa en el valor recíproco de lo que cada uno enseña.'
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-emerald-700" />,
      title: 'Aprendizaje 1 a 1 Auténtico',
      desc: 'Olvídate de cursos aburridos y videos estáticos. Aprende con interacción directa, resolución de dudas y práctica en tiempo real.'
    },
    {
      icon: <Users className="w-6 h-6 text-emerald-700" />,
      title: 'Networking & Comunidad',
      desc: 'Conecta con profesionales, creativos y estudiantes que comparten tu curiosidad y entusiasmo por superarse continuamente.'
    },
    {
      icon: <Clock className="w-6 h-6 text-emerald-700" />,
      title: 'Flexibilidad de Horarios',
      desc: 'Tú y tu compañero de swap fijan las sesiones y el ritmo que mejor se adapte a su rutina semanal (online o presencial).'
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            ¿Por qué elegirnos?
          </span>
          <Heading className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
            Beneficios de aprender mediante el trueque
          </Heading>
          <p className="text-slate-600 mt-3 text-base">
            Una alternativa moderna, humana y accesible frente a la educación tradicional y las plataformas costosas.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-emerald-50/40 hover:border-emerald-300 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center mb-5">
                {b.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {b.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {b.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

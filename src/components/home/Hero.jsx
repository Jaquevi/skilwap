import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Search, ArrowRight } from 'lucide-react';

export const Hero = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();

  function search(query) {
    const term = query.trim();
    navigate(term ? `/habilidades?${new URLSearchParams({ q: term })}` : '/habilidades');
  }

  const trendingTags = ['Python', 'Inglés C1', 'Figma & UI', 'Guitarra', 'Marketing Digital', 'React'];

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 pt-8 pb-4 sm:pt-10">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-emerald-200/30 via-emerald-100/40 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-semibold mb-4 shadow-xs animate-bounce-short">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            Comunidad Abierta de Intercambio de Conocimientos
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight sm:leading-none mb-4">
            Enseña lo que <span className="text-emerald-800">sabes</span>.<br />
            Aprende lo que <span className="bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">sueñas</span>.
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed mb-5 max-w-2xl mx-auto">
            La plataforma colaborativa donde intercambias tus talentos y habilidades con otras personas. Sin pagos monetarios: solo trueque de conocimiento 1 a 1.
          </p>

          {/* Search Box */}
          <form onSubmit={(event) => { event.preventDefault(); search(searchQuery); }} className="max-w-2xl mx-auto mb-5 bg-white p-2.5 rounded-2xl shadow-xl shadow-emerald-950/5 border border-slate-200 flex flex-col sm:flex-row items-center gap-2">
            <div className="flex items-center gap-3 px-3 w-full text-slate-400">
              <Search className="w-5 h-5 text-emerald-700" />
              <input
                type="search"
                aria-label="Buscar habilidades"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="¿Qué quieres aprender hoy? ej. React, Francés, Diseño..."
                className="w-full text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-hidden bg-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all whitespace-nowrap"
            >
              <span>Buscar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Trending Tags */}
          <div className="flex items-center justify-center gap-2 flex-wrap text-xs text-slate-500 mb-6">
            <span className="font-semibold text-slate-700">Tendencias:</span>
            {trendingTags.map((tag) => (
              <button
                key={tag}
                onClick={() => search(tag)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-600 transition-colors cursor-pointer"
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-3 pt-4 border-t border-slate-200/80">
            <div className="py-1 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-950">+15,000</div>
              <div className="text-xs text-slate-500 font-medium">Miembros activos</div>
            </div>
            <div className="py-1 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-950">98%</div>
              <div className="text-xs text-slate-500 font-medium">Intercambios exitosos</div>
            </div>
            <div className="py-1 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-950">$0.00</div>
              <div className="text-xs text-slate-500 font-medium">Costo de membresía</div>
            </div>
            <div className="py-1 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-950">120+</div>
              <div className="text-xs text-slate-500 font-medium">Categorías de estudio</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

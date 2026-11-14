import React, { useState } from 'react';
import { CATEGORIES } from '../../data/mockSkills';
import { Star, MapPin, ArrowLeftRight, MessageSquareShare, User } from 'lucide-react';

export const SkillCatalog = ({ searchQuery, setSearchQuery, onSelectSkillToSwap, skills, status, onRetry, asPage = false }) => {
  const Heading = asPage ? 'h1' : 'h2';
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const query = searchQuery.toLowerCase().trim();

  // Filter skills according to category and search query
  const filteredSkills = skills.filter((skill) => {
    const matchesCategory =
      selectedCategory === 'Todas' || skill.category === selectedCategory;

    const matchesSearch =
      query === '' ||
      skill.teaches.toLowerCase().includes(query) ||
      skill.wants.toLowerCase().includes(query) ||
      skill.author.name.toLowerCase().includes(query) ||
      skill.category.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="skills" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
              Catálogo de Intercambio
            </span>
            <Heading className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Habilidades listas para intercambio
            </Heading>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              Conecta con personas que tienen justo el conocimiento que buscas y están listas para aprender lo tuyo.
            </p>
          </div>

          {status === 'ready' && <div role="status" className="text-sm text-slate-500 font-medium">
            Mostrando <span className="font-bold text-slate-800">{filteredSkills.length}</span> oportunidades
          </div>}
        </div>

        <label className="mb-4 block text-sm font-semibold text-slate-700">
          Buscar en el catálogo
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Ej. React, francés o música"
            className="mt-1 block w-full max-w-sm rounded-xl border border-slate-300 bg-white px-4 py-2"
          />
        </label>

        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                aria-pressed={isSelected}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-800 text-white shadow-md shadow-emerald-950/20'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Cards Grid */}
        {status === 'loading' ? (
          <p role="status" className="py-12 text-center text-slate-600">Cargando habilidades…</p>
        ) : status === 'error' ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <p role="alert" className="font-semibold text-slate-700">No se pudo cargar el catálogo.</p>
            <button type="button" onClick={onRetry} className="mt-4 rounded-lg bg-emerald-800 px-4 py-2 text-white">
              Reintentar
            </button>
          </div>
        ) : filteredSkills.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-lg font-semibold text-slate-700">No encontramos habilidades con ese criterio de búsqueda.</p>
            <p className="text-sm text-slate-500 mt-1">Prueba seleccionando otra categoría o borrando el término de búsqueda.</p>
            <button
              onClick={() => {
                setSelectedCategory('Todas');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-emerald-800 text-white rounded-lg text-sm font-medium hover:bg-emerald-900"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-950/5 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-6">
                  {/* Author Header */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      {item.author.avatar ? <img
                        src={item.author.avatar}
                        alt={item.author.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-emerald-100"
                      /> : <User aria-hidden="true" className="h-10 w-10 rounded-xl bg-emerald-50 p-2 text-emerald-800" />}
                      <div>
                        <h4 className="font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                          {item.author.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="flex items-center gap-1 font-semibold text-amber-500">
                            {item.author.rating == null ? 'Sin valoraciones' : <><Star className="w-3.5 h-3.5 fill-current" />
                            {item.author.rating}</>}
                          </span>
                          <span>•</span>
                          {item.author.location && <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3 text-slate-400" /> {item.author.location}</span>}
                        </div>
                      </div>
                    </div>

                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {item.category}
                    </span>
                  </div>

                  {/* Teaches Box */}
                  <div className="mb-3 p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/70">
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-800 mb-1">
                      <span className="uppercase tracking-wider">Te Enseña:</span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-200/60 text-emerald-900 text-[10px]">
                        {item.teachesLevel}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-slate-900">{item.teaches}</div>
                  </div>

                  {/* Swap Indicator Divider */}
                  <div className="flex items-center justify-center my-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <ArrowLeftRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Wants Box */}
                  <div className="p-3.5 rounded-xl bg-sky-50/70 border border-sky-200/70">
                    <div className="text-xs font-bold text-sky-800 uppercase tracking-wider mb-1">
                      Quiere aprender a cambio:
                    </div>
                    <div className="text-sm font-bold text-slate-900">{item.wants}</div>
                  </div>

                  {/* Short description */}
                  <p className="mt-4 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    "{item.description}"
                  </p>
                </div>

                {/* Card Action Footer */}
                <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">
                    Modalidad: <strong className="text-slate-700">{item.mode}</strong>
                  </span>
                  <button
                    onClick={() => onSelectSkillToSwap(item)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-xs transition-all"
                  >
                    <MessageSquareShare className="w-3.5 h-3.5" />
                    <span>Proponer Swap</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

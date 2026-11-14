import { Link } from 'react-router-dom';
import React from 'react';
import { Repeat, Heart, Globe, Share2, MessageCircle, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-900 flex items-center justify-center text-white shadow-md">
                <Repeat className="w-5 h-5 text-emerald-300" />
              </div>
              <span className="text-2xl font-black text-white font-serif tracking-tight">
                Skill<span className="text-emerald-400">Swap</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
              Plataforma comunitaria de trueque de habilidades y conocimientos. Conectamos personas dispuestas a enseñar lo que saben para aprender lo que apasiona.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <Link to="/" className="p-2 rounded-lg bg-slate-800 hover:text-emerald-400 hover:bg-slate-700 transition-colors" aria-label="Web">
                <Globe className="w-4 h-4" />
              </Link>
              <Link to="/habilidades" className="p-2 rounded-lg bg-slate-800 hover:text-emerald-400 hover:bg-slate-700 transition-colors" aria-label="Comunidad">
                <Share2 className="w-4 h-4" />
              </Link>
              <Link to="/testimonios" className="p-2 rounded-lg bg-slate-800 hover:text-emerald-400 hover:bg-slate-700 transition-colors" aria-label="Chat">
                <MessageCircle className="w-4 h-4" />
              </Link>
              <a href="mailto:contacto@skillswap.app" className="p-2 rounded-lg bg-slate-800 hover:text-emerald-400 hover:bg-slate-700 transition-colors" aria-label="Email">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Navegación</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-emerald-400 transition-colors">Inicio</Link></li>
              <li><Link to="/habilidades" className="hover:text-emerald-400 transition-colors">Explorar Habilidades</Link></li>
              <li><Link to="/como-funciona" className="hover:text-emerald-400 transition-colors">Cómo Funciona</Link></li>
              <li><Link to="/beneficios" className="hover:text-emerald-400 transition-colors">Beneficios</Link></li>
              <li><Link to="/testimonios" className="hover:text-emerald-400 transition-colors">Testimonios</Link></li>
            </ul>
          </div>

          {/* Categorías */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Categorías</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/habilidades" className="hover:text-emerald-400 transition-colors">Programación & Tech</Link></li>
              <li><Link to="/habilidades" className="hover:text-emerald-400 transition-colors">Idiomas & Conversación</Link></li>
              <li><Link to="/habilidades" className="hover:text-emerald-400 transition-colors">Diseño UI/UX & Arte</Link></li>
              <li><Link to="/habilidades" className="hover:text-emerald-400 transition-colors">Música & Producción</Link></li>
              <li><Link to="/habilidades" className="hover:text-emerald-400 transition-colors">Negocios & Marketing</Link></li>
            </ul>
          </div>

          {/* Legal y Comunidad */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Comunidad</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Código de Conducta</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Seguridad en Swaps</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Términos de Servicio</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacidad de Datos</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 SkillSwap - Plataforma de Intercambio de Habilidades.</p>
          <p className="flex items-center gap-1">
            Desarrollado con <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> usando React + Tailwind CSS
          </p>
        </div>

      </div>
    </footer>
  );
};

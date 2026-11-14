import { Link, NavLink } from 'react-router-dom';
import { navigation } from '../../navigation';
import React, { useState } from 'react';
import { Repeat, Menu, X, PlusCircle, LogIn, LogOut } from 'lucide-react';

export const Navbar = ({ onOpenSwapModal, onOpenLoginModal, currentUser, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-950/10 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo (SIN BETA) */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center text-white shadow-md shadow-emerald-950/20 group-hover:scale-105 transition-transform">
              <Repeat className="w-6 h-6 text-emerald-300 group-hover:rotate-180 transition-transform duration-500" />
            </div>
            <div>
              <div className="flex items-center">
                <span className="text-2xl font-black tracking-tight text-emerald-950 font-serif">
                  Skill<span className="text-emerald-600">Swap</span>
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 tracking-wide">Intercambio de Habilidades</p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-2">
            {navigation.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/80 rounded-lg transition-colors aria-[current=page]:bg-emerald-50 aria-[current=page]:text-emerald-800"
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Action Buttons (Login + Publicar) */}
          <div className="hidden lg:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3 pl-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover border border-emerald-300"
                  />
                  <div className="max-w-24 min-w-0 text-left">
                    <p className="truncate text-xs font-bold text-emerald-950 leading-tight">{currentUser.name}</p>
                    <p className="truncate text-[10px] text-emerald-700 font-medium leading-none">{currentUser.skill || 'En línea'}</p>
                  </div>
                </div>
                <button
                  onClick={onLogout}
                  title="Cerrar Sesión"
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  aria-label="Cerrar sesión"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLoginModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-bold text-emerald-900 hover:text-emerald-700 hover:bg-emerald-50/80 rounded-xl transition-all cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-emerald-700" />
                <span>Iniciar Sesión</span>
              </button>
            )}

            <button
              onClick={() => onOpenSwapModal()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white text-sm font-bold shadow-md shadow-emerald-900/20 hover:shadow-lg hover:shadow-emerald-900/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-emerald-300" />
              <span>Publicar Habilidad</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-emerald-800 hover:bg-emerald-50 focus:outline-hidden cursor-pointer"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-emerald-900/10 bg-white px-4 pt-2 pb-6 space-y-3 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {navigation.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-800 hover:text-emerald-800 hover:bg-emerald-50"
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            {currentUser ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 mb-1">
                <div className="flex items-center gap-2.5">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold text-emerald-950">{currentUser.name}</p>
                    <p className="text-xs text-emerald-700">{currentUser.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-1.5 text-xs font-bold text-rose-700 bg-rose-50 rounded-lg hover:bg-rose-100 cursor-pointer"
                >
                  Salir
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLoginModal();
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-emerald-800 text-emerald-900 font-bold text-sm hover:bg-emerald-50 cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-emerald-800" />
                Iniciar Sesión / Registrarse
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSwapModal();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-800 text-white font-bold text-sm shadow-md cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-emerald-300" />
              Publicar Habilidad
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

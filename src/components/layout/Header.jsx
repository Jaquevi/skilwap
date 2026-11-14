import { Link } from 'react-router-dom';
import React from 'react';
import { Navbar } from './Navbar';
import { Sparkles, ArrowRight } from 'lucide-react';

export const Header = ({ onOpenSwapModal, onOpenLoginModal, currentUser, onLogout }) => {
  return (
    <header className="w-full">
      {/* Top Notification Announcement Bar */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white text-xs sm:text-sm py-2 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center flex-wrap">
          <span className="inline-flex items-center gap-1.5 bg-emerald-700/60 px-2 py-0.5 rounded-full text-xs font-semibold text-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            Novedad
          </span>
          <span>¡Más de 500 nuevas habilidades disponibles para intercambiar este mes sin dinero de por medio!</span>
          <Link
            to="/habilidades"
            className="inline-flex items-center gap-1 text-emerald-300 hover:text-white underline font-semibold transition-colors ml-1"
          >
            Explorar ahora <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Main Responsive Navbar */}
      <Navbar
        onOpenSwapModal={onOpenSwapModal}
        onOpenLoginModal={onOpenLoginModal}
        currentUser={currentUser}
        onLogout={onLogout}
      />
    </header>
  );
};

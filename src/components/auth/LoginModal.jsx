import React, { useState } from 'react';
import { X, Lock, Mail, User, Eye, EyeOff, LogIn, CheckCircle, ArrowRight } from 'lucide-react';

export const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    primarySkill: '',
    rememberMe: true
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const userName = isRegisterMode
        ? (formData.name || 'Usuario')
        : (formData.email.split('@')[0] || 'Usuario');

      const loggedUser = {
        name: userName,
        email: formData.email,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        skill: formData.primarySkill || 'Miembro SkillSwap'
      };

      setSuccessMessage(isRegisterMode ? '¡Cuenta creada con éxito!' : '¡Inicio de sesión exitoso!');

      setTimeout(() => {
        onLoginSuccess(loggedUser);
        setSuccessMessage('');
        onClose();
      }, 1200);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-white shadow-md">
              <LogIn className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-lg font-bold">
                {isRegisterMode ? 'Crear Cuenta' : 'Iniciar Sesión'}
              </h3>
              <p className="text-xs text-emerald-200">
                {isRegisterMode ? 'Únete a la comunidad de trueque de habilidades' : 'Accede a tu perfil de SkillSwap'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800/60 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {successMessage ? (
            <div className="text-center py-8 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckCircle className="w-9 h-9" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-1">{successMessage}</h4>
              <p className="text-xs text-slate-500">Bienvenido de vuelta a SkillSwap.</p>
            </div>
          ) : (
            <>
              {/* Tab Selector */}
              <div className="flex rounded-xl bg-slate-100 p-1 mb-6 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(false)}
                  className={`w-1/2 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                    !isRegisterMode
                      ? 'bg-white text-emerald-950 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Iniciar Sesión
                </button>
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(true)}
                  className={`w-1/2 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
                    isRegisterMode
                      ? 'bg-white text-emerald-950 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Registrarse
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {isRegisterMode && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Nombre Completo *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required={isRegisterMode}
                        placeholder="ej. Claudio Morales"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Correo Electrónico *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="tu@correo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Contraseña *
                    </label>
                    {!isRegisterMode && (
                      <button
                        type="button"
                        onClick={() => alert('Se ha enviado un enlace de recuperación simulado a tu correo.')}
                        className="text-[11px] font-semibold text-emerald-700 hover:underline"
                      >
                        ¿Olvidaste tu contraseña?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {isRegisterMode && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      ¿Qué habilidad te gustaría enseñar primero?
                    </label>
                    <input
                      type="text"
                      placeholder="ej. Python, Inglés, Guitarra, Fotografía..."
                      value={formData.primarySkill}
                      onChange={(e) => setFormData({ ...formData, primarySkill: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                )}

                {!isRegisterMode && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.rememberMe}
                        onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                        className="rounded text-emerald-700 focus:ring-emerald-500"
                      />
                      <span>Recordar sesión en este equipo</span>
                    </label>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-900 active:bg-emerald-950 text-white font-bold text-sm shadow-md shadow-emerald-950/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-70 mt-2"
                >
                  {loading ? (
                    <span>Procesando...</span>
                  ) : (
                    <>
                      <span>{isRegisterMode ? 'Crear Cuenta y Empezar' : 'Acceder a mi Cuenta'}</span>
                      <ArrowRight className="w-4 h-4 text-emerald-300" />
                    </>
                  )}
                </button>
              </form>

              {/* Demo Account Helper */}
              <div className="mt-5 pt-4 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-500 mb-2">
                  {isRegisterMode ? '¿Ya tienes una cuenta?' : '¿Primera vez en SkillSwap?'}
                </p>
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(!isRegisterMode)}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-950 hover:underline cursor-pointer"
                >
                  {isRegisterMode ? 'Iniciar sesión aquí' : 'Crea una cuenta gratis en 30 segundos'}
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

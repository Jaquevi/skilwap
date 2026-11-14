import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useSearchParams } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/home/Hero';
import { HowItWorks } from './components/home/HowItWorks';
import { CommunityBenefits } from './components/home/CommunityBenefits';
import { Testimonials } from './components/home/Testimonials';
import { CTA } from './components/home/CTA';
import { SkillCatalog } from './components/skills/SkillCatalog';
import { SwapModal } from './components/skills/SwapModal';
import { LoginModal } from './components/auth/LoginModal';
import { ActionLink } from './components/shared/ActionLink';
import { createRecord } from './api/client';
import { useSkills } from './api/useSkills';

function CatalogPage(props) {
  const [params, setParams] = useSearchParams();
  const searchQuery = params.get('q') ?? '';

  function setSearchQuery(query) {
    setParams((previous) => {
      const next = new URLSearchParams(previous);
      if (query) next.set('q', query);
      else next.delete('q');
      return next;
    }, { replace: true });
  }

  return <SkillCatalog {...props} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />;
}

function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-4xl font-black text-slate-900">404 · Página no encontrada</h1>
      <p className="mb-6 mt-3 text-slate-600">La dirección que abriste no corresponde a una página de SkillSwap.</p>
      <ActionLink to="/">Volver al inicio</ActionLink>
    </section>
  );
}

export function App() {
  const { pathname } = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [swap, setSwap] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { skills, status, reload } = useSkills();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  function openPublish() {
    setSwap({ target: null });
  }

  async function submitSwap(form, target) {
    if (target) {
      await createRecord('proposals', {
        skillId: target.id,
        name: form.name,
        teaches: form.teaches,
        message: form.message,
      });
      return;
    }

    await createRecord('skills', {
      author: {
        name: currentUser?.name || form.name,
        avatar: currentUser?.avatar || '',
        rating: null,
        location: '',
      },
      category: form.category,
      teaches: form.teaches,
      teachesLevel: 'Entusiasta',
      wants: form.wants,
      mode: form.mode,
      description: form.message,
      badges: ['Nuevo'],
    });
    reload();
  }

  const catalogProps = {
    skills,
    status,
    onRetry: reload,
    onSelectSkillToSwap: (target) => setSwap({ target }),
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-emerald-200 selection:text-emerald-950">
      <Header
        onOpenSwapModal={openPublish}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        currentUser={currentUser}
        onLogout={() => setCurrentUser(null)}
      />

      <main className="grow">
        <Routes>
          <Route path="/" element={
            <>
              <Hero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              <HowItWorks />
              <SkillCatalog {...catalogProps} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              <CommunityBenefits />
              <Testimonials />
              <CTA onOpenSwapModal={openPublish} />
            </>
          } />
          <Route path="/habilidades" element={<CatalogPage {...catalogProps} asPage />} />
          <Route path="/como-funciona" element={<><HowItWorks asPage /><CTA onOpenSwapModal={openPublish} /></>} />
          <Route path="/beneficios" element={<><CommunityBenefits asPage /><CTA onOpenSwapModal={openPublish} /></>} />
          <Route path="/testimonios" element={<Testimonials asPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      {swap && <SwapModal targetSkill={swap.target} onClose={() => setSwap(null)} onSubmit={submitSwap} />}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={setCurrentUser}
      />
    </div>
  );
}

export default App;

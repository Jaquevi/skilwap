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
import { createRecord, requestApi } from './api/client';
import { ProposalsPage } from './components/skills/ProposalsPage';
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
  const [loginRequest, setLoginRequest] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [sessionReady, setSessionReady] = useState(false);
  const [sessionError, setSessionError] = useState('');
  const { skills, status, reload } = useSkills();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  useEffect(() => {
    const controller = new AbortController();
    requestApi('session', { signal: controller.signal })
      .then(({ user }) => {
        if (!controller.signal.aborted) setCurrentUser(user ?? null);
      })
      .catch(() => {})
      .finally(() => {
        if (!controller.signal.aborted) setSessionReady(true);
      });
    return () => controller.abort();
  }, []);

  function openPublish() {
    if (sessionReady) setSwap({ target: null });
  }

  function openProposal(target) {
    if (!sessionReady) return;
    if (!currentUser && target.ownerId) {
      setLoginRequest({ target });
      return;
    }
    setSwap({ target });
  }

  async function logout() {
    setSessionError('');
    try {
      await requestApi('session', { method: 'DELETE' });
      setCurrentUser(null);
    } catch (error) {
      setSessionError(error.message);
    }
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
        name: form.name,
        avatar: '',
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
    onSelectSkillToSwap: openProposal,
    currentUserId: currentUser?.id,
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-emerald-200 selection:text-emerald-950">
      <Header
        onOpenSwapModal={openPublish}
        onOpenLoginModal={() => sessionReady && setLoginRequest({})}
        currentUser={currentUser}
        onLogout={logout}
      />

      <main className="grow">
        {sessionError && <p role="alert" className="mx-auto max-w-5xl px-4 py-3 text-sm text-red-700">{sessionError}</p>}
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
          <Route path="/propuestas" element={<ProposalsPage currentUser={currentUser} sessionReady={sessionReady} onOpenLogin={() => setLoginRequest({})} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />

      {swap && <SwapModal targetSkill={swap.target} showProposalsLink={Boolean(currentUser)} onClose={() => setSwap(null)} onSubmit={submitSwap} />}
      {loginRequest && <LoginModal
        onClose={() => setLoginRequest(null)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          setSessionError('');
          if (loginRequest.target) setSwap({ target: loginRequest.target });
          setLoginRequest(null);
        }}
      />}
    </div>
  );
}

export default App;

import { Link } from 'react-router-dom';

export function ActionLink({ to, children, variant = 'primary' }) {
  const colors = variant === 'secondary'
    ? 'border border-white/20 bg-white/10 text-white hover:bg-white/15'
    : 'bg-emerald-800 text-white hover:bg-emerald-900';

  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold ${colors}`}
    >
      {children}
    </Link>
  );
}

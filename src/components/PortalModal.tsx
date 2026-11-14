import { useState, type FormEvent } from 'react';
import { X, ShieldCheck, LogOut } from 'lucide-react';
import { validatePortalSignIn } from '../utils/missionLogic';

interface PortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  signedInEmail: string | null;
  onSignInSuccess: (email: string) => void;
  onSignOut: () => void;
}

export function PortalModal({
  isOpen,
  onClose,
  signedInEmail,
  onSignInSuccess,
  onSignOut,
}: PortalModalProps) {
  const [email, setEmail] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = validatePortalSignIn(email, accessCode);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    onSignInSuccess(email.trim());
    setEmail('');
    setAccessCode('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="portal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <div className="w-full max-w-md bg-[#12100C] border border-[#D4AF37]/40 rounded-xl p-6 sm:p-8 text-[#F3E7C9] shadow-2xl">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-1">
              Partner Access
            </p>
            <h2
              id="portal-modal-title"
              className="font-display text-2xl font-bold uppercase text-[#F5D77F]"
            >
              {signedInEmail ? 'Mission Partner Console' : 'Client Portal Sign In'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close partner portal dialog"
            className="w-10 h-10 inline-flex items-center justify-center rounded-sm border border-[#D4AF37]/30 text-[#E6D39A] hover:text-[#F5D77F] hover:bg-[#D4AF37]/15 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {signedInEmail ? (
          <div className="space-y-5">
            <div className="p-4 rounded-sm bg-[#D4AF37]/15 border border-[#D4AF37]/45 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" aria-hidden="true" />
              <div className="text-sm">
                <p className="font-semibold text-[#F5D77F]">Authenticated Partner Session</p>
                <p className="text-[#F3E7C9] mt-0.5">{signedInEmail}</p>
              </div>
            </div>

            <div className="space-y-3 text-xs border-t border-[#D4AF37]/20 pt-4">
              <div className="flex justify-between py-1.5 border-b border-[#D4AF37]/10">
                <span className="text-[#C5A55A] font-mono uppercase">Assigned Vehicle</span>
                <span className="text-[#F5D77F] font-medium">Blue Ring BR-04 · Cislunar</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#D4AF37]/10">
                <span className="text-[#C5A55A] font-mono uppercase">Launch Complex</span>
                <span className="text-[#F5D77F] font-medium">LC-36 Hybrid Pad</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#C5A55A] font-mono uppercase">Integration Status</span>
                <span className="text-[#D4AF37] font-semibold">Horizontal Mate Ready</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onSignOut}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold uppercase tracking-wider border border-[#D4AF37]/35 text-[#F5D77F] hover:bg-[#D4AF37]/15 rounded-sm cursor-pointer"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
              Sign Out
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label
                htmlFor="portal-email"
                className="block text-xs font-mono uppercase tracking-wider text-[#E6D39A] mb-1.5"
              >
                Partner Email
              </label>
              <input
                id="portal-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ops@partner-aerospace.com"
                className="w-full bg-[#080705] border border-[#D4AF37]/30 rounded-sm px-3.5 py-2.5 text-sm text-[#F5D77F] placeholder:text-[#7D6838] focus:outline-none focus:border-[#F5D77F]"
              />
              {errors.email && <p className="mt-1 text-xs text-[#FBBF24]">{errors.email}</p>}
            </div>

            <div>
              <label
                htmlFor="portal-code"
                className="block text-xs font-mono uppercase tracking-wider text-[#E6D39A] mb-1.5"
              >
                Mission Access Code
              </label>
              <input
                id="portal-code"
                type="password"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full bg-[#080705] border border-[#D4AF37]/30 rounded-sm px-3.5 py-2.5 text-sm text-[#F5D77F] placeholder:text-[#7D6838] focus:outline-none focus:border-[#F5D77F]"
              />
              {errors.accessCode && (
                <p className="mt-1 text-xs text-[#FBBF24]">{errors.accessCode}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 text-xs font-semibold uppercase tracking-wider bg-[#D4AF37] text-[#080705] hover:bg-[#F5D77F] rounded-sm cursor-pointer"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('partner@dbcollection.space');
                  setAccessCode('DBC-2026-OPS');
                  setErrors({});
                }}
                className="py-2.5 px-4 text-xs font-medium border border-[#D4AF37]/35 text-[#E6D39A] hover:text-[#F5D77F] hover:border-[#F5D77F] rounded-sm cursor-pointer"
              >
                Use Demo Partner
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

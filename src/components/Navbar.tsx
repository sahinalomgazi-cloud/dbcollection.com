import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenPortal: () => void;
  signedInEmail: string | null;
}

const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Lunar Landers', href: '#lunar-landers' },
  { label: 'Blue Ring', href: '#blue-ring' },
  { label: 'Propulsion', href: '#propulsion' },
  { label: 'Solutions', href: '#solutions' },
];

export function Navbar({ onOpenPortal, signedInEmail }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#080705]/95 backdrop-blur-md border-b border-[#D4AF37]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          className="font-display text-xl sm:text-2xl font-bold tracking-wide text-[#F5D77F] uppercase whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-sm"
        >
          DB COLLECTION
        </a>

        {/* Zone 2: 5 single-line navigation links */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#E6D39A] hover:text-[#F5D77F] transition-colors underline-offset-4 hover:underline whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={onOpenPortal}
            className="text-sm font-medium text-[#E6D39A] hover:text-[#F5D77F] transition-colors underline-offset-4 hover:underline whitespace-nowrap shrink-0 cursor-pointer"
          >
            {signedInEmail ? 'Partner Portal' : 'Sign In'}
          </button>
        </nav>

        {/* Zone 3: 1 Primary CTA + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#D4AF37] text-[#080705] hover:bg-[#F5D77F] transition-colors rounded-sm whitespace-nowrap shrink-0"
          >
            Contact Us
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-sm border border-[#D4AF37]/30 text-[#F5D77F] hover:bg-[#D4AF37]/15 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="lg:hidden border-t border-[#D4AF37]/20 bg-[#0D0B07] px-4 py-4 space-y-2"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 px-3 text-sm font-medium text-[#E6D39A] hover:text-[#F5D77F] hover:bg-[#D4AF37]/10 rounded-sm"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onOpenPortal();
            }}
            className="w-full text-left py-2.5 px-3 text-sm font-medium text-[#E6D39A] hover:text-[#F5D77F] hover:bg-[#D4AF37]/10 rounded-sm cursor-pointer"
          >
            {signedInEmail ? 'Partner Portal' : 'Sign In'}
          </button>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="block text-center mt-3 py-3 px-4 text-xs font-semibold uppercase tracking-wider bg-[#D4AF37] text-[#080705] hover:bg-[#F5D77F] rounded-sm"
          >
            Contact Us
          </a>
        </nav>
      )}
    </header>
  );
}

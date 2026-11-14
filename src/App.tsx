import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { LunarLandersSection } from './components/LunarLandersSection';
import { BlueRingSection } from './components/BlueRingSection';
import { PropulsionCarouselSection } from './components/PropulsionCarouselSection';
import { Orbital3DAnimationSection } from './components/Orbital3DAnimationSection';
import { MiddleShowcaseSection } from './components/MiddleShowcaseSection';
import { ReturnToFlightSection } from './components/ReturnToFlightSection';
import { CapabilitiesAndSolutionsSection } from './components/CapabilitiesAndSolutionsSection';
import { ContactSection } from './components/ContactSection';
import { PortalModal } from './components/PortalModal';

export default function App() {
  const [portalOpen, setPortalOpen] = useState(false);
  const [signedInEmail, setSignedInEmail] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#080705] text-[#F3E7C9]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#D4AF37] focus:text-[#080705] focus:text-sm focus:font-semibold"
      >
        Skip to Content
      </a>

      <Navbar onOpenPortal={() => setPortalOpen(true)} signedInEmail={signedInEmail} />

      <main id="main-content">
        <HeroSection />
        <LunarLandersSection />
        <BlueRingSection />
        <PropulsionCarouselSection />
        <Orbital3DAnimationSection />
        <MiddleShowcaseSection />
        <ReturnToFlightSection />
        <CapabilitiesAndSolutionsSection />
        <ContactSection />
      </main>

      <PortalModal
        isOpen={portalOpen}
        onClose={() => setPortalOpen(false)}
        signedInEmail={signedInEmail}
        onSignInSuccess={(email) => setSignedInEmail(email)}
        onSignOut={() => setSignedInEmail(null)}
      />
    </div>
  );
}

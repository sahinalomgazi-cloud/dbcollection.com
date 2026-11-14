import { ArrowRight } from 'lucide-react';
import { BRAND_BANNERS, IMAGES } from '../data/missions';
import { ResilientImage } from './ResilientImage';

export function HeroSection() {
  const marqueeText = '• WELCOME TO DB COLLECTION ';

  return (
    <section id="top" className="relative bg-[#080705]">
      {/* Full-Width UP Showcase Banner */}
      <div className="w-full bg-[#000000] border-b border-[#D4AF37]/30">
        <ResilientImage
          src={BRAND_BANNERS.up}
          alt="DB COLLECTION crown gold and monochrome full top brand crest"
          className="w-full max-h-[82vh] object-contain mx-auto block"
        />
      </div>

      {/* Hero Cover Stage */}
      <div className="relative min-h-[540px] lg:min-h-[640px] flex items-end overflow-hidden border-b border-[#D4AF37]/25">
        <ResilientImage
          src={IMAGES.hero}
          alt="DB COLLECTION orbital spacecraft ring above the luminous horizon of Earth"
          className="absolute inset-0 w-full h-full object-cover object-center sepia-[.35] saturate-150 brightness-90"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#080705] via-[#080705]/75 to-black/50"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#080705]/85 via-[#080705]/45 to-transparent"
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pb-20">
          <div className="max-w-3xl">
            <p className="text-xs font-mono tracking-widest uppercase text-[#D4AF37] mb-4">
              Orbital Mobility · Lunar Landers · Launch
            </p>
            <h1
              className="font-display font-bold text-[#F5D77F] uppercase tracking-tight leading-[1.02] mb-6"
              style={{
                fontSize: 'clamp(2.5rem, 5.2vw, 4.5rem)',
                textWrap: 'balance',
              }}
            >
              DB COLLECTION
            </h1>
            <p className="text-base sm:text-lg text-[#F3E7C9] leading-relaxed max-w-2xl mb-8">
              Engineering high-cadence lunar cargo and crew landers, multi-orbit Blue Ring
              spacecraft, and reusable BE-4 staged-combustion launch architecture for Earth,
              Moon, and deep-space logistics.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <a
                href="#lunar-landers"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-wider bg-[#D4AF37] text-[#080705] hover:bg-[#F5D77F] transition-colors rounded-sm whitespace-nowrap shrink-0"
              >
                Explore Fleet Programs
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#blue-ring"
                className="text-sm font-medium text-[#F5D77F] hover:text-white underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
              >
                Launch Delta-V Estimator
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Scrolling Marquee Band */}
      <div
        aria-label="DB COLLECTION announcement banner"
        className="overflow-hidden bg-[#0D0B07] border-b border-[#D4AF37]/30 py-4"
      >
        <div className="animate-marquee font-display text-2xl sm:text-4xl font-bold tracking-wider text-[#F5D77F] uppercase select-none">
          <span className="pr-4">{marqueeText.repeat(4)}</span>
          <span className="pr-4" aria-hidden="true">
            {marqueeText.repeat(4)}
          </span>
        </div>
      </div>
    </section>
  );
}

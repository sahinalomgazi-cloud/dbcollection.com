import { useState } from 'react';
import { IMAGES } from '../data/missions';
import { ResilientImage } from './ResilientImage';

type LanderVariant = 'mk2' | 'mk1';

const LANDER_DATA: Record<
  LanderVariant,
  {
    name: string;
    subtitle: string;
    summary: string;
    crewSpec: string;
    cargoSpec: string;
    program: string;
    propulsion: string;
  }
> = {
  mk2: {
    name: 'Blue Moon Mark 2 (MK2)',
    subtitle: "Crew & Heavy Cargo Lander · NASA's Artemis Program",
    summary:
      "MK2 crew and cargo landers service NASA's Artemis Program. The crew variant is 4-crew capable, and the cargo variant carries up to 80 metric tons to the lunar surface.",
    crewSpec: '4 Crew Capable',
    cargoSpec: '80 Metric Tons',
    program: 'NASA Artemis Sustaining',
    propulsion: 'BE-7 LOX / LH2 Cryogenic',
  },
  mk1: {
    name: 'Blue Moon Mark 1 (MK1)',
    subtitle: 'Autonomous Surface Cargo Pathfinder · Early Infrastructure',
    summary:
      'MK1 cargo landers provide precision point-to-point payload delivery for lunar surface habitats and rovers, carrying up to 30 metric tons directly to the lunar surface.',
    crewSpec: 'Autonomous Uncrewed',
    cargoSpec: '30 Metric Tons',
    program: 'Lunar Cargo Pathfinder',
    propulsion: 'BE-7 Deep-Throttle Engine',
  },
};

export function LunarLandersSection() {
  const [variant, setVariant] = useState<LanderVariant>('mk2');
  const active = LANDER_DATA[variant];

  return (
    <section
      id="lunar-landers"
      className="py-16 lg:py-24 bg-[#080705] border-b border-[#D4AF37]/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-2">
              Lunar Surface Architecture · Blue Moon
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#F5D77F]">
              Lunar Landers · Blue Moon
            </h2>
          </div>

          {/* Interactive Variant Selector */}
          <div
            role="tablist"
            aria-label="Select Lunar Lander Variant"
            className="inline-flex items-center p-1 bg-[#12100C] border border-[#D4AF37]/25 rounded-md self-start md:self-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={variant === 'mk2'}
              onClick={() => setVariant('mk2')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                variant === 'mk2'
                  ? 'bg-[#D4AF37] text-[#080705]'
                  : 'text-[#E6D39A] hover:text-[#F5D77F]'
              }`}
            >
              Blue Moon MK2
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={variant === 'mk1'}
              onClick={() => setVariant('mk1')}
              className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                variant === 'mk1'
                  ? 'bg-[#D4AF37] text-[#080705]'
                  : 'text-[#E6D39A] hover:text-[#F5D77F]'
              }`}
            >
              Blue Moon MK1
            </button>
          </div>
        </div>

        {/* Visual Showcase Frame */}
        <div className="rounded-xl overflow-hidden border border-[#D4AF37]/25 bg-[#12100C] mb-10">
          <div className="aspect-[16/9] max-h-[520px] w-full overflow-hidden">
            <ResilientImage
              src={IMAGES.lunarMk2}
              alt={`${active.name} lunar lander operating on the sunlit cratered Moon surface`}
              className="w-full h-full object-cover object-center sepia-[.2] contrast-105"
            />
          </div>
        </div>

        {/* Editorial Specs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F5D77F] mb-2">
              {active.name}
            </h3>
            <p className="text-sm text-[#D4AF37] mb-4">{active.subtitle}</p>
            <p className="text-base text-[#F3E7C9] leading-relaxed">{active.summary}</p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-6 pt-2 lg:pt-0 border-t lg:border-t-0 lg:border-l border-[#D4AF37]/20 lg:pl-8">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[#C5A55A] mb-1">
                Cargo Capacity
              </p>
              <p className="font-display text-2xl font-bold text-[#F5D77F] tabular-nums">
                {active.cargoSpec}
              </p>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[#C5A55A] mb-1">
                Crew Configuration
              </p>
              <p className="font-display text-2xl font-bold text-[#F5D77F]">{active.crewSpec}</p>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[#C5A55A] mb-1">
                Propulsion System
              </p>
              <p className="text-sm font-medium text-[#F3E7C9]">{active.propulsion}</p>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[#C5A55A] mb-1">
                Mission Alignment
              </p>
              <p className="text-sm font-medium text-[#F3E7C9]">{active.program}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

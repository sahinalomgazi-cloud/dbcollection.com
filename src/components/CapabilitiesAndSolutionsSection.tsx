import { useState } from 'react';
import { Search, X } from 'lucide-react';
import {
  CAPABILITY_STEPS,
  SOLUTION_TILES,
  type MissionCategory,
} from '../data/missions';
import { filterMissionPrograms } from '../utils/missionLogic';
import { ResilientImage } from './ResilientImage';

const FILTER_TABS: { id: MissionCategory; label: string }[] = [
  { id: 'all', label: 'All Systems' },
  { id: 'lunar', label: 'Lunar Landers' },
  { id: 'orbital', label: 'Blue Ring' },
  { id: 'launch', label: 'Launch Vehicles' },
  { id: 'habitat', label: 'LEO Habitats' },
];

export function CapabilitiesAndSolutionsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<MissionCategory>('all');

  const filteredPrograms = filterMissionPrograms(searchQuery, activeCategory);

  return (
    <section id="solutions" className="bg-[#080705]">
      {/* 01-04 Engineering & Vehicle Integration Capabilities */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-2">
            Aerospace Integration Standards
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#F5D77F] mb-3">
            Precision Spacecraft & Launch Vehicle Operations
          </h2>
          <p className="text-base text-[#F3E7C9]">
            End-to-end engineering, payload integration, and reusable booster recovery across every
            flight campaign.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {CAPABILITY_STEPS.map((step) => (
            <article
              key={step.index}
              className="bg-[#12100C] border border-[#D4AF37]/25 rounded-xl overflow-hidden flex flex-col"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <ResilientImage
                  src={step.image}
                  alt={step.imageAlt}
                  className="w-full h-full object-cover object-center sepia-[.25] contrast-105"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <p className="font-mono text-sm font-semibold text-[#D4AF37] tabular-nums mb-2">
                  {step.index}.
                </p>
                <h3 className="font-display text-xl font-bold text-[#F5D77F] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[#F3E7C9] leading-relaxed">{step.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Interactive Mission & Vehicle Directory Search */}
        <div className="border-t border-[#D4AF37]/20 pt-14">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F5D77F]">
                Fleet & Mission Specification Directory
              </h3>
              <p className="text-sm text-[#C5A55A] mt-1">
                Search vehicles, propulsion engines, or filter by orbital domain.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative">
                <Search
                  className="w-4 h-4 text-[#D4AF37] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  aria-label="Search fleet programs and propulsion specs"
                  placeholder="Search BE-4, MK2, LEO..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 bg-[#12100C] border border-[#D4AF37]/30 rounded-sm pl-9 pr-8 py-2 text-sm text-[#F5D77F] placeholder:text-[#8E7640] focus:outline-none focus:border-[#F5D77F]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    aria-label="Clear mission search"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#D4AF37] hover:text-[#F5D77F] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div
            role="tablist"
            aria-label="Filter fleet programs by mission domain"
            className="flex flex-wrap items-center gap-2 mb-8"
          >
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#D4AF37] text-[#080705] border-[#D4AF37]'
                    : 'bg-[#12100C] text-[#E6D39A] border-[#D4AF37]/25 hover:border-[#D4AF37]/60 hover:text-[#F5D77F]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {filteredPrograms.length === 0 ? (
            <div className="bg-[#12100C] border border-[#D4AF37]/25 rounded-xl p-10 text-center">
              <p className="text-base text-[#F3E7C9] mb-4">
                No spacecraft or launch programs matched &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#D4AF37] text-[#080705] rounded-sm hover:bg-[#F5D77F] cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrograms.map((program) => (
                <article
                  key={program.id}
                  className="bg-[#12100C] border border-[#D4AF37]/25 rounded-xl p-6 flex flex-col justify-between gap-5"
                >
                  <div>
                    <p className="text-xs font-mono text-[#D4AF37] mb-2">
                      {program.designation} · {program.orbitTarget}
                    </p>
                    <h4 className="font-display text-2xl font-bold text-[#F5D77F] mb-2">
                      {program.title}
                    </h4>
                    <p className="text-sm text-[#F3E7C9] leading-relaxed">{program.summary}</p>
                  </div>

                  <div className="pt-4 border-t border-[#D4AF37]/20 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="block font-mono uppercase text-[#C5A55A]">Payload</span>
                      <span className="font-semibold text-[#F5D77F] tabular-nums">
                        {program.payloadCapacity}
                      </span>
                    </div>
                    <div>
                      <span className="block font-mono uppercase text-[#C5A55A]">Propulsion</span>
                      <span className="font-semibold text-[#F5D77F]">{program.propulsion}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Burnished Gold Contrast Mosaic ("Unveiling our newest solutions") with Obsidian Black Cards */}
      <div className="bg-[#D4AF37] text-[#080705] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-mono uppercase tracking-widest text-[#292008] font-semibold mb-2">
              Orbital & Surface Showcase
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-[#080705] mb-3">
              Unveiling Our Newest Solutions
            </h2>
            <p className="text-base sm:text-lg text-[#1A1506]">
              Discover our latest orbital transfer, lunar surface, and heavy-lift solutions for your
              mission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {SOLUTION_TILES.map((tile, idx) => {
              const spanClass = idx === 0 || idx === 3 ? 'md:col-span-7' : 'md:col-span-5';
              return (
                <article
                  key={tile.id}
                  className={`${spanClass} group rounded-xl overflow-hidden border border-[#080705]/30 bg-[#0E0C08] flex flex-col`}
                >
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    <ResilientImage
                      src={tile.image}
                      alt={tile.imageAlt}
                      className="w-full h-full object-cover object-center sepia-[.2] contrast-105 group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-mono text-[#D4AF37] mb-1.5">{tile.domain}</p>
                    <h3 className="font-display text-2xl font-bold text-[#F5D77F] mb-2">
                      {tile.title}
                    </h3>
                    <p className="text-sm text-[#F3E7C9] leading-relaxed">{tile.summary}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IMAGES, PROPULSION_SLIDES } from '../data/missions';
import { ResilientImage } from './ResilientImage';

export function PropulsionCarouselSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentSlide = PROPULSION_SLIDES[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? PROPULSION_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === PROPULSION_SLIDES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="propulsion" className="bg-[#080705]">
      {/* Dark Reusable Launch Carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-2">
              Heavy-Lift Architecture
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#F5D77F]">
              Reusable for Affordability and Availability
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="inline-flex items-center justify-center w-11 h-11 rounded-sm border border-[#D4AF37]/30 bg-[#12100C] text-[#F5D77F] hover:bg-[#D4AF37] hover:text-[#080705] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="inline-flex items-center justify-center w-11 h-11 rounded-sm border border-[#D4AF37]/30 bg-[#12100C] text-[#F5D77F] hover:bg-[#D4AF37] hover:text-[#080705] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slide Stage */}
        <div className="rounded-xl overflow-hidden border border-[#D4AF37]/25 bg-[#12100C]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto lg:min-h-[400px] overflow-hidden">
              <ResilientImage
                src={currentSlide.image}
                alt={currentSlide.imageAlt}
                className="w-full h-full object-cover object-center sepia-[.25] contrast-105"
              />
            </div>

            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between gap-6">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-2">
                  {currentSlide.subtitle}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F5D77F] mb-4">
                  {currentSlide.title}
                </h3>
                <p className="text-sm sm:text-base text-[#F3E7C9] leading-relaxed">
                  {currentSlide.description}
                </p>
              </div>

              <div className="pt-6 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-mono uppercase text-[#C5A55A]">
                    {currentSlide.metricLabel}
                  </p>
                  <p className="font-mono text-lg font-semibold text-[#F5D77F] tabular-nums mt-0.5">
                    {currentSlide.metricValue}
                  </p>
                </div>

                {/* Slide Selector Dots / Tabs */}
                <div role="tablist" aria-label="Propulsion slides" className="flex items-center gap-1">
                  {PROPULSION_SLIDES.map((slide, index) => (
                    <button
                      key={slide.id}
                      type="button"
                      role="tab"
                      aria-selected={index === activeIndex}
                      aria-label={`Slide ${index + 1} of ${PROPULSION_SLIDES.length}: ${slide.title}`}
                      onClick={() => setActiveIndex(index)}
                      className="py-3 px-1 flex items-center justify-center cursor-pointer group"
                    >
                      <span
                        className={`block h-2 rounded-sm transition-all ${
                          index === activeIndex
                            ? 'w-8 bg-[#F5D77F]'
                            : 'w-4 bg-[#D4AF37]/30 group-hover:bg-[#D4AF37]/70'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Burnished Gold Contrast Editorial Block with Obsidian Black Ink */}
      <div className="bg-[#D4AF37] text-[#080705] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <p className="text-xs font-mono uppercase tracking-widest text-[#292008] font-semibold">
                BE-4 Staged Combustion Propulsion
              </p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-[#080705]">
                Powerful
              </h2>
              <p className="text-base sm:text-lg text-[#1A1506] leading-relaxed">
                The vehicle is powered by seven of the most powerful liquid oxygen (LOX) /
                liquefied natural gas (LNG)-fueled oxygen-rich staged combustion engines ever
                flown. Each BE-4 engine is reusable and generates{' '}
                <span className="font-mono font-semibold tabular-nums text-[#080705]">
                  640,000 lbf (2,846 kN)
                </span>{' '}
                thrust at sea level with deep-throttle capability.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#080705]/25">
                <div>
                  <p className="text-xs font-mono uppercase text-[#292008] font-semibold">Engines</p>
                  <p className="font-display text-2xl font-bold text-[#080705] tabular-nums">7× BE-4</p>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-[#292008] font-semibold">
                    Propellants
                  </p>
                  <p className="font-display text-2xl font-bold text-[#080705]">LOX / LNG</p>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-[#292008] font-semibold">
                    Total Liftoff
                  </p>
                  <p className="font-display text-2xl font-bold text-[#080705] tabular-nums">
                    4.48M lbf
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-xl overflow-hidden border-2 border-[#080705]/40 bg-[#080705] aspect-[16/10]">
                <ResilientImage
                  src={IMAGES.launchVehicle}
                  alt="Seven BE-4 powered reusable launch vehicle on the coastal pad"
                  className="w-full h-full object-cover object-center sepia-[.2] contrast-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

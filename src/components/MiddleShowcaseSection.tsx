import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { MIDDLE_GALLERY_ITEMS } from '../data/missions';
import { ResilientImage } from './ResilientImage';

export function MiddleShowcaseSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedItem =
    selectedIndex !== null ? MIDDLE_GALLERY_ITEMS[selectedIndex] ?? null : null;

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedIndex(null);
      } else if (event.key === 'ArrowRight') {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev + 1) % MIDDLE_GALLERY_ITEMS.length
        );
      } else if (event.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + MIDDLE_GALLERY_ITEMS.length) % MIDDLE_GALLERY_ITEMS.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  return (
    <section
      id="middle-showcase"
      aria-labelledby="middle-showcase-heading"
      className="bg-[#0C0A07] border-y border-[#D4AF37]/25 py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-2">
              DB Collection Visual Archive
            </p>
            <h2
              id="middle-showcase-heading"
              className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#F5D77F] mb-3"
            >
              Featured Mission & Collection Showcase
            </h2>
            <p className="text-base text-[#F3E7C9]">
              Curated orbital hardware plates, flight operations records, and signature DB
              Collection archive editions displayed at full clarity.
            </p>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-[#C5A55A] tabular-nums shrink-0">
            09 Curated Plates · Click to Inspect
          </p>
        </div>

        <div
          data-testid="middle-gallery-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: '1200px' }}
        >
          {MIDDLE_GALLERY_ITEMS.map((item, index) => {
            const isSelectedFor3D = index === 0 || index === 1 || index === 2 || index === 6;
            return (
              <article
                key={item.id}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const dx = (e.clientX - rect.left) / rect.width - 0.5;
                  const dy = (e.clientY - rect.top) / rect.height - 0.5;
                  e.currentTarget.style.transform = `rotateX(${(-dy * 8).toFixed(2)}deg) rotateY(${(dx * 8).toFixed(2)}deg) translateY(-4px)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg) translateY(0px)';
                }}
                className="group bg-[#12100C] border border-[#D4AF37]/25 hover:border-[#F5D77F]/65 rounded-xl overflow-hidden flex flex-col transition-transform duration-200 ease-out will-change-transform"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <button
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`Inspect ${item.title} full view`}
                  style={isSelectedFor3D ? { perspective: '900px' } : undefined}
                  className="relative aspect-[4/5] w-full bg-[#080705] p-3 overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  <ResilientImage
                    src={item.image}
                    alt={item.imageAlt}
                    className={`w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-300 ${
                      isSelectedFor3D
                        ? `animate-3d-image ${
                            index === 1
                              ? '[animation-delay:0.6s]'
                              : index === 2
                                ? '[animation-delay:1.2s]'
                                : index === 6
                                  ? '[animation-delay:1.8s]'
                                  : ''
                          }`
                        : ''
                    }`}
                  />
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#080705]/90 border border-[#D4AF37]/40 text-[#F5D77F] text-[11px] font-mono uppercase tracking-wider rounded-sm">
                    <Expand className="w-3.5 h-3.5" aria-hidden="true" />
                    View
                  </span>
                </button>

              <div className="p-5 border-t border-[#D4AF37]/20 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#D4AF37]">
                      {item.category}
                    </span>
                    <span className="font-mono text-xs text-[#C5A55A] tabular-nums">
                      0{index + 1} / 09
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#F5D77F] mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#F3E7C9] leading-relaxed">{item.caption}</p>
                </div>
              </div>
              </article>
            );
          })}
        </div>
      </div>

      {selectedItem && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedItem.title} full image preview`}
          className="fixed inset-0 z-50 bg-[#080705]/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#12100C] border border-[#D4AF37]/40 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-[#D4AF37]/25 bg-[#0D0B07]">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[#D4AF37]">
                  {selectedItem.category} · Plate 0{selectedIndex + 1} of 09
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F5D77F]">
                  {selectedItem.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                aria-label="Close image preview"
                className="w-10 h-10 inline-flex items-center justify-center rounded-sm border border-[#D4AF37]/30 text-[#F5D77F] hover:bg-[#D4AF37] hover:text-[#080705] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 min-h-0 bg-[#080705] p-4 flex items-center justify-center overflow-auto">
              <ResilientImage
                src={selectedItem.image}
                alt={selectedItem.imageAlt}
                className="max-h-[68vh] w-auto max-w-full object-contain rounded-sm"
              />
            </div>

            <div className="px-5 py-4 border-t border-[#D4AF37]/25 bg-[#0D0B07] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-sm text-[#F3E7C9]">{selectedItem.caption}</p>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex(
                      (selectedIndex - 1 + MIDDLE_GALLERY_ITEMS.length) %
                        MIDDLE_GALLERY_ITEMS.length
                    )
                  }
                  aria-label="Previous showcase plate"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider bg-[#12100C] border border-[#D4AF37]/35 text-[#F5D77F] hover:bg-[#D4AF37] hover:text-[#080705] rounded-sm transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Prev
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex((selectedIndex + 1) % MIDDLE_GALLERY_ITEMS.length)
                  }
                  aria-label="Next showcase plate"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider bg-[#D4AF37] text-[#080705] hover:bg-[#F5D77F] rounded-sm transition-colors cursor-pointer"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

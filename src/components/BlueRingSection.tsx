import { useState } from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { IMAGES, ORBIT_DESTINATIONS } from '../data/missions';
import { calculateMissionEstimate } from '../utils/missionLogic';
import { ResilientImage } from './ResilientImage';

export function BlueRingSection() {
  const [selectedOrbit, setSelectedOrbit] = useState(ORBIT_DESTINATIONS[1].id);
  const [payloadMassKg, setPayloadMassKg] = useState(1400);

  const activeOrbit =
    ORBIT_DESTINATIONS.find((orbit) => orbit.id === selectedOrbit) ?? ORBIT_DESTINATIONS[0];
  const estimate = calculateMissionEstimate(selectedOrbit, payloadMassKg);

  return (
    <section
      id="blue-ring"
      className="py-16 lg:py-24 bg-[#080705] border-b border-[#D4AF37]/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-10">
          <div className="lg:col-span-6">
            <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-2">
              In-Space Logistics & Mobility
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#F5D77F]">
              Blue Ring
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="text-base sm:text-lg text-[#F3E7C9]">
              A Highly Maneuverable, Multi-Destination Spacecraft providing 3,000–4,000 m/s of
              Delta-V across Earth orbits, cislunar corridors, Mars, and near-Earth asteroids.
            </p>
          </div>
        </div>

        {/* Full-Width Spacecraft Image */}
        <div className="rounded-xl overflow-hidden border border-[#D4AF37]/25 bg-[#12100C] mb-12">
          <div className="aspect-[16/9] max-h-[500px] w-full overflow-hidden">
            <ResilientImage
              src={IMAGES.blueRing}
              alt="Blue Ring hybrid solar-electric spacecraft operating above Earth"
              className="w-full h-full object-cover object-center sepia-[.25] contrast-105"
            />
          </div>
        </div>

        {/* Multi-Mission Narrative + Interactive Delta-V Estimator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h3 className="font-display text-2xl sm:text-4xl font-bold text-[#F5D77F] uppercase tracking-tight mb-3">
                Multi-Mission. Multi-Orbit. Space Mobility
              </h3>
              <p className="text-base text-[#F3E7C9] leading-relaxed">
                Blue Ring is an all-in-one, high-powered hybrid solar-electric and chemical
                propelled spacecraft that provides unmatched mission maneuverability, versatility,
                and capacity at dramatically lower profile costs. It maneuvers, hosts, and deploys
                payloads and infrastructure services in Earth orbits, the Moon, Mars,
                interplanetary space, and near-Earth asteroids.
              </p>
            </div>

            <div className="pt-6 border-t border-[#D4AF37]/20">
              <p className="font-display text-xl sm:text-2xl font-medium text-[#F5D77F] leading-snug">
                Humanity&apos;s time to inhabit the eighth continent is now. High-cadence,
                reliable, and safe access makes it possible.
              </p>
            </div>
          </div>

          {/* Interactive Orbital Transfer Estimator */}
          <div className="lg:col-span-6 bg-[#12100C] border border-[#D4AF37]/30 rounded-xl p-6 sm:p-8">
            <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[#F5D77F] mb-1">
              Orbital Transfer & Delta-V Estimator
            </h3>
            <p className="text-xs text-[#C5A55A] mb-6">
              Simulate payload mass against Blue Ring&apos;s 4,000 m/s Delta-V envelope.
            </p>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="orbit-select"
                  className="block text-xs font-mono uppercase tracking-wider text-[#E6D39A] mb-2"
                >
                  Target Orbit Destination
                </label>
                <select
                  id="orbit-select"
                  value={selectedOrbit}
                  onChange={(e) => setSelectedOrbit(e.target.value)}
                  className="w-full bg-[#080705] border border-[#D4AF37]/30 rounded-sm px-3.5 py-2.5 text-sm text-[#F5D77F] focus:outline-none focus:border-[#F5D77F]"
                >
                  {ORBIT_DESTINATIONS.map((orbit) => (
                    <option key={orbit.id} value={orbit.id}>
                      {orbit.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="payload-mass-input"
                    className="text-xs font-mono uppercase tracking-wider text-[#E6D39A]"
                  >
                    Hosted Payload Mass (kg)
                  </label>
                  <span className="font-mono text-sm font-semibold text-[#F5D77F] tabular-nums">
                    {payloadMassKg.toLocaleString()} kg
                  </span>
                </div>
                <input
                  id="payload-mass-input"
                  type="range"
                  min={200}
                  max={3600}
                  step={50}
                  value={payloadMassKg}
                  onChange={(e) => setPayloadMassKg(Number(e.target.value))}
                  className="w-full accent-[#D4AF37] cursor-pointer"
                />
                <div className="flex justify-between text-xs font-mono text-[#C5A55A] mt-1 tabular-nums">
                  <span>200 kg</span>
                  <span>Max for orbit: {activeOrbit.maxPayloadKg.toLocaleString()} kg</span>
                  <span>3,600 kg</span>
                </div>
              </div>

              {/* Readout */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#D4AF37]/20">
                <div>
                  <p className="text-xs font-mono uppercase text-[#C5A55A]">Delta-V Margin</p>
                  <p className="font-mono text-xl font-semibold text-[#F5D77F] tabular-nums mt-0.5">
                    {estimate.remainingDeltaV >= 0
                      ? `+${estimate.remainingDeltaV.toLocaleString()} m/s`
                      : `${estimate.remainingDeltaV.toLocaleString()} m/s`}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-[#C5A55A]">Transit Window</p>
                  <p className="text-sm font-medium text-[#F3E7C9] mt-1">
                    {activeOrbit.transitWindow}
                  </p>
                </div>
              </div>

              <div
                aria-live="polite"
                className={`flex items-start gap-2.5 p-3.5 rounded-sm border text-xs leading-relaxed ${
                  estimate.feasible
                    ? 'bg-[#D4AF37]/10 border-[#D4AF37]/40 text-[#F5D77F]'
                    : 'bg-[#2A1A06] border-[#F59E0B]/60 text-[#FDE68A]'
                }`}
              >
                {estimate.feasible ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#D4AF37]" aria-hidden="true" />
                ) : (
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#F59E0B]" aria-hidden="true" />
                )}
                <div>
                  <span className="font-semibold">
                    {estimate.feasible ? 'Nominal Profile: ' : 'Envelope Warning: '}
                  </span>
                  {estimate.feasible
                    ? `${estimate.recommendedMode} (${estimate.utilizationPercent}% Delta-V budget utilized).`
                    : estimate.warning}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

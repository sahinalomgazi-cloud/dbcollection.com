import { EXECUTIVE_LEADERSHIP, IMAGES } from '../data/missions';
import { ResilientImage } from './ResilientImage';

export function ReturnToFlightSection() {
  return (
    <section className="py-16 lg:py-24 bg-[#080705] border-b border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* New Glenn Return to Flight + NASA / John Glenn Heritage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-2">
                Launch Complex 36 · Operations Update
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#F5D77F] mb-2">
                New Glenn Return to Flight
              </h2>
              <p className="text-sm font-medium text-[#D4AF37] mb-6">
                A Note from CEO Ranvir Sharma · Pad Recovery & Hybrid CONOPS
              </p>

              <div className="space-y-4 text-sm sm:text-base text-[#F3E7C9] leading-relaxed">
                <p>
                  Following the May 28, 2026 New Glenn Integrated Launch Vehicle hotfire test
                  anomaly at Launch Complex 36 in Florida, hardware recovery and debris removal
                  operations are complete, and pad reconstruction is underway.
                </p>
                <p>
                  With the tank farm, Integration Facility, vehicle access tower, and water tower
                  intact, engineering teams relocated flight hardware safely and accelerated
                  directly to a horizontal/vertical hybrid CONOPS developed for the 9×4 New Glenn
                  launch vehicle—creating a common operations concept across two coastal pads.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#D4AF37]/20">
              <p className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] mb-1">
                Heritage · Credit: NASA
              </p>
              <p className="text-sm text-[#E6D39A] leading-relaxed">
                New Glenn is named after John Glenn, the first American to orbit Earth. The rocket
                is engineered with the safety and redundancy required to fly humans and build a road
                to space for the benefit of Earth.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div
              className="rounded-xl overflow-hidden border border-[#D4AF37]/25 h-full min-h-[340px]"
              style={{ perspective: '1000px' }}
            >
              <ResilientImage
                src={IMAGES.launchVehicle}
                alt="New Glenn reusable launch vehicle integrated at Launch Complex 36"
                className="w-full h-full object-cover object-center sepia-[.25] contrast-105 animate-3d-image"
              />
            </div>
          </div>
        </div>

        {/* Horizontal Mating & Crane Breakover Two-Column Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-[#D4AF37]/20">
          <article className="bg-[#12100C] border border-[#D4AF37]/25 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] mb-2">
                Stage Integration · GS1 & GS2
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F5D77F] mb-3">
                Vehicles Are Mated Horizontally
              </h3>
              <p className="text-sm sm:text-base text-[#F3E7C9] leading-relaxed">
                GS1 and GS2 stages are mated horizontally inside the Integration Facility using
                existing tooling and common CONOPS, then transferred onto the transporter for
                streamlined rollout to the launch pad.
              </p>
            </div>
          </article>

          <article className="bg-[#12100C] border border-[#D4AF37]/25 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] mb-2">
                Pad Erection · Hybrid CONOPS
              </p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F5D77F] mb-3">
                Crane-Based Breakover & Lift to Launch Pedestal
              </h3>
              <p className="text-sm sm:text-base text-[#F3E7C9] leading-relaxed">
                A heavy-lift crane executes a vertical breakover of New Glenn onto the launch
                pedestal—eliminating the need for a dedicated transporter-erector and accelerating
                return-to-flight cadence across dual pads.
              </p>
            </div>
          </article>
        </div>

        {/* Living and Working in Space (Commercial LEO Destinations) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-12 border-t border-[#D4AF37]/20">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div
              className="rounded-xl overflow-hidden border border-[#D4AF37]/25 aspect-[4/3]"
              style={{ perspective: '1000px' }}
            >
              <ResilientImage
                src={IMAGES.orbitalStation}
                alt="Commercial low Earth orbit station habitat with panoramic cupola above Earth"
                className="w-full h-full object-cover object-center sepia-[.25] contrast-105 animate-3d-image [animation-delay:1.2s]"
              />
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
            <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
              Low Earth Orbit Destinations
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#F5D77F]">
              Living and Working in Space
            </h2>
            <p className="text-base text-[#F3E7C9] leading-relaxed">
              Commercial destinations in LEO (low Earth orbit) are a key focus for NASA to ensure a
              smooth transition from the International Space Station. An enormous amount of
              engineering and innovation goes into building mixed-use orbital habitats for
              commerce, microgravity research, orbital manufacturing, and spaceflight operations.
            </p>
          </div>
        </div>
        {/* Executive Leadership: CEO & MD */}
        <div id="leadership" className="pt-12 border-t border-[#D4AF37]/20">
          <div className="mb-8">
            <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-2">
              DB COLLECTION · Executive Command
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#F5D77F]">
              Executive Leadership
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EXECUTIVE_LEADERSHIP.map((leader) => (
              <article
                key={leader.id}
                className="bg-[#12100C] border border-[#D4AF37]/30 rounded-xl p-6 sm:p-8 flex flex-col justify-between gap-4"
              >
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-2">
                    {leader.shortTitle} · {leader.title}
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F5D77F] mb-3">
                    {leader.name}
                  </h3>
                  <p className="text-sm sm:text-base text-[#F3E7C9] leading-relaxed">
                    {leader.focus}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export type MissionCategory = 'all' | 'lunar' | 'orbital' | 'launch' | 'habitat';

export interface MissionProgram {
  id: string;
  title: string;
  designation: string;
  category: Exclude<MissionCategory, 'all'>;
  summary: string;
  payloadCapacity: string;
  propulsion: string;
  orbitTarget: string;
  image: string;
  imageAlt: string;
}

export interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  metricLabel: string;
  metricValue: string;
  image: string;
  imageAlt: string;
}

export interface OrbitDestination {
  id: string;
  name: string;
  deltaVRequired: number;
  transitWindow: string;
  propulsionMode: string;
  maxPayloadKg: number;
}

export interface CapabilityStep {
  index: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface SolutionTile {
  id: string;
  title: string;
  domain: string;
  summary: string;
  image: string;
  imageAlt: string;
}

export const IMAGES = {
  hero: '/src/assets/images/hero_dark_gravity_1794677017084.jpg',
  lunarMk2: '/src/assets/images/lunar_lander_mk2_1794677017357.jpg',
  blueRing: '/src/assets/images/blue_ring_spacecraft_1794677017688.jpg',
  launchVehicle: '/src/assets/images/launch_vehicle_rocket_1794677018090.jpg',
  orbitalStation: '/src/assets/images/orbital_station_leo_1794677017856.jpg',
} as const;

export const BRAND_BANNERS = {
  up: '/assets/aistudio/file_0000000073b48211a2c2a033780e5c73_dd153dc9.png',
  down: '/assets/aistudio/file_00000000a82482119e9f410f439e7930_acbe392f.png',
} as const;

export const MISSION_PROGRAMS: MissionProgram[] = [
  {
    id: 'blue-moon-mk2',
    title: 'Blue Moon Mark 2 (MK2)',
    designation: 'Artemis Crew & Heavy Cargo Lander',
    category: 'lunar',
    summary:
      "MK2 crew and cargo landers service NASA's Artemis Program. The crew variant supports 4 astronauts, and the cargo variant carries up to 80 metric tons to the lunar surface.",
    payloadCapacity: '4 Crew / 80 Metric Tons',
    propulsion: 'BE-7 Cryogenic LOX/LH2',
    orbitTarget: 'Lunar South Pole',
    image: IMAGES.lunarMk2,
    imageAlt: 'Blue Moon Mark 2 lunar lander deployed on the cratered lunar surface with Earth in the distance',
  },
  {
    id: 'blue-moon-mk1',
    title: 'Blue Moon Mark 1 (MK1)',
    designation: 'Autonomous Cargo Pathfinder',
    category: 'lunar',
    summary:
      'MK1 cargo landers provide precision point-to-point payload delivery for early lunar surface infrastructure, carrying up to 30 metric tons directly to targeted landing zones.',
    payloadCapacity: '30 Metric Tons',
    propulsion: 'BE-7 Precision Throttle',
    orbitTarget: 'Lunar Equatorial & Polar',
    image: IMAGES.lunarMk2,
    imageAlt: 'Blue Moon Mark 1 autonomous cargo lander staged on the lunar regolith',
  },
  {
    id: 'blue-ring',
    title: 'Blue Ring Spacecraft',
    designation: 'Multi-Mission Multi-Orbit Mobility',
    category: 'orbital',
    summary:
      'An all-in-one hybrid solar-electric and chemical propelled spacecraft delivering 3,000–4,000 m/s of Delta-V across Earth orbits, the Moon, Mars, and near-Earth asteroids.',
    payloadCapacity: '3,000+ kg Hosted / Deployed',
    propulsion: 'Hybrid Solar-Electric + Chemical',
    orbitTarget: 'LEO, GEO, Cislunar & Deep Space',
    image: IMAGES.blueRing,
    imageAlt: 'Blue Ring orbital transfer spacecraft deploying solar arrays above Earth',
  },
  {
    id: 'new-glenn',
    title: 'New Glenn Launch Vehicle',
    designation: 'Reusable Heavy-Lift Orbital Rocket',
    category: 'launch',
    summary:
      'Named after John Glenn, the first American to orbit Earth. Engineered with human-rated redundancy and powered by seven reusable BE-4 staged-combustion engines.',
    payloadCapacity: '45 Metric Tons to LEO',
    propulsion: '7× BE-4 LOX/LNG (640,000 lbf each)',
    orbitTarget: 'LEO / GTO / Trans-Lunar Injection',
    image: IMAGES.launchVehicle,
    imageAlt: 'Heavy-lift reusable orbital launch vehicle on a coastal launch pad at twilight',
  },
  {
    id: 'orbital-reef-leo',
    title: 'Commercial LEO Destinations',
    designation: 'Living & Working in Space',
    category: 'habitat',
    summary:
      'Mixed-use commercial low-Earth orbit destinations engineered for microgravity research, orbital manufacturing, commerce, and smooth post-ISS human spaceflight transition.',
    payloadCapacity: 'Modular Multi-Port Habitat',
    propulsion: 'Station-Keeping & Visiting Vehicle Docking',
    orbitTarget: 'Low Earth Orbit (400 km)',
    image: IMAGES.orbitalStation,
    imageAlt: 'Commercial low-Earth orbit space station module with panoramic cupola above Earth',
  },
];

export const PROPULSION_SLIDES: CarouselSlide[] = [
  {
    id: 'slide-be4',
    title: 'Seven BE-4 Staged Combustion Engines',
    subtitle: 'Reusable LOX / LNG Powerhouse',
    description:
      'Powered by seven oxygen-rich staged combustion engines. Each reusable BE-4 generates 640,000 lbf (2,846 kN) thrust at sea level with deep-throttle landing capability.',
    metricLabel: 'Sea-Level Thrust / Engine',
    metricValue: '640,000 lbf · 2,846 kN',
    image: IMAGES.launchVehicle,
    imageAlt: 'New Glenn orbital booster fueled on the launch pad with cryogenic venting',
  },
  {
    id: 'slide-hybrid-conops',
    title: 'Horizontal Mating & Hybrid Pad CONOPS',
    subtitle: 'High-Cadence Pad Turnaround',
    description:
      'GS1 and GS2 stages are mated horizontally inside the Integration Facility before crane-based vertical breakover onto the launch pedestal, enabling rapid multi-pad operations.',
    metricLabel: 'Integration Architecture',
    metricValue: 'Horizontal Mate · Dual Pad',
    image: IMAGES.hero,
    imageAlt: 'DB COLLECTION orbital ring architecture silhouetted above the Earth horizon',
  },
  {
    id: 'slide-blue-ring-delta',
    title: 'Multi-Orbit Logistics & Deep Space Windows',
    subtitle: 'Blue Ring Orbital Transfer Platform',
    description:
      'Delivers 3,000 to 4,000 meters per second of Delta-V, reducing launch profile costs while expanding Mars, cislunar, and geostationary deployment windows.',
    metricLabel: 'Available Delta-V',
    metricValue: '3,000–4,000 m/s',
    image: IMAGES.blueRing,
    imageAlt: 'Blue Ring spacecraft operating in high Earth orbit with wide solar wings',
  },
];

export const ORBIT_DESTINATIONS: OrbitDestination[] = [
  {
    id: 'leo-to-geo',
    name: 'LEO to Geostationary Transfer (GEO)',
    deltaVRequired: 1850,
    transitWindow: '14 Days (Solar-Electric Spiral)',
    propulsionMode: 'High-ISP Solar-Electric Primary',
    maxPayloadKg: 3500,
  },
  {
    id: 'cislunar',
    name: 'Cislunar & NRHO (Artemis Corridor)',
    deltaVRequired: 3150,
    transitWindow: '6–11 Days (Hybrid Burn)',
    propulsionMode: 'Chemical Perigee + Solar-Electric Cruise',
    maxPayloadKg: 2600,
  },
  {
    id: 'lunar-surface',
    name: 'Low Lunar Orbit Staging (MK1 / MK2)',
    deltaVRequired: 3850,
    transitWindow: '9 Days Direct Transfer',
    propulsionMode: 'Dual-Mode Storable + LOX/LH2',
    maxPayloadKg: 2100,
  },
  {
    id: 'mars-escape',
    name: 'Trans-Mars & Near-Earth Asteroid Window',
    deltaVRequired: 3980,
    transitWindow: 'Expanded Synodic Window',
    propulsionMode: 'Deep-Space Hybrid Solar-Electric',
    maxPayloadKg: 1450,
  },
];

export const CAPABILITY_STEPS: CapabilityStep[] = [
  {
    index: '01',
    title: 'Cleanroom Integration Facilities',
    description:
      'State-of-the-art horizontal integration bays and cryogenic test stands built for superior spacecraft assembly and thermal-vacuum validation.',
    image: IMAGES.launchVehicle,
    imageAlt: 'Launch complex and vehicle integration facility along the coast',
  },
  {
    index: '02',
    title: 'Propulsion & Avionics Specialists',
    description:
      'Dedicated aerospace engineers specializing in oxygen-rich staged combustion engines, flight software redundancy, and autonomous guidance.',
    image: IMAGES.blueRing,
    imageAlt: 'High-precision orbital transfer spacecraft avionics and solar wing',
  },
  {
    index: '03',
    title: 'Tailored Mission Profiles',
    description:
      'Custom payload adapter interfaces, hosted power/telemetry buses, and trajectory optimization to ensure optimal mission performance.',
    image: IMAGES.lunarMk2,
    imageAlt: 'Lunar lander surface mission deployment and cargo unloading',
  },
  {
    index: '04',
    title: 'Flight-Proven Hardware Reliability',
    description:
      'Instrumented recovery telemetry, reusable booster refurbishment, and redundant human-rated margins across every orbital campaign.',
    image: IMAGES.orbitalStation,
    imageAlt: 'Orbital habitat module docked in low Earth orbit',
  },
];

export const SOLUTION_TILES: SolutionTile[] = [
  {
    id: 'sol-lunar',
    title: 'Artemis Surface Cargo',
    domain: 'Lunar Logistics · MK2',
    summary: 'Up to 80 metric tons delivered directly to polar research bases.',
    image: IMAGES.lunarMk2,
    imageAlt: 'Blue Moon lunar cargo lander on the Moon surface',
  },
  {
    id: 'sol-mobility',
    title: 'Hosted Orbital Infrastructure',
    domain: 'In-Space Mobility · Blue Ring',
    summary: 'Power, compute, and station-keeping for multi-orbit payloads.',
    image: IMAGES.blueRing,
    imageAlt: 'Blue Ring multi-orbit spacecraft in Earth orbit',
  },
  {
    id: 'sol-heavy',
    title: 'Heavy-Lift Reusable Access',
    domain: 'Launch Systems · 7× BE-4',
    summary: 'High-cadence coastal pad turnaround with horizontal integration.',
    image: IMAGES.launchVehicle,
    imageAlt: 'Reusable orbital rocket standing vertically on coastal pad',
  },
  {
    id: 'sol-leo',
    title: 'Commercial LEO Habitats',
    domain: 'Orbital Destinations · 400 km',
    summary: 'Mixed-use modules for microgravity R&D and commercial crew.',
    image: IMAGES.orbitalStation,
    imageAlt: 'Commercial LEO orbital station above blue ocean curvature',
  },
];

export const CONTACT_DETAILS = {
  email: 'dubaicollection971@gmail.com',
  phoneDisplay: '+91 7029769667',
  phoneHref: 'tel:+917029769667',
  whatsappHref: 'https://wa.me/917029769667',
  address: 'DB Km From Chotila, 8, To, Ahmedabad National Highway, 8A, Magharikhada, Gujarat 363520',
};

export interface ExecutiveLeader {
  id: string;
  title: string;
  shortTitle: string;
  name: string;
  focus: string;
}

export const EXECUTIVE_LEADERSHIP: ExecutiveLeader[] = [
  {
    id: 'ceo',
    title: 'Chief Executive Officer',
    shortTitle: 'CEO',
    name: 'Ranvir Sharma',
    focus:
      'Directing orbital mobility architecture, heavy-lift launch strategy, and Artemis-class lunar logistics partnerships.',
  },
  {
    id: 'md',
    title: 'Managing Director',
    shortTitle: 'MD',
    name: 'Sanjay Singh',
    focus:
      'Leading spacecraft integration facilities, hybrid launch complex operations, and commercial payload manifest execution.',
  },
];

export interface MiddleGalleryItem {
  id: string;
  title: string;
  category: string;
  caption: string;
  image: string;
  imageAlt: string;
}

export const MIDDLE_GALLERY_ITEMS: MiddleGalleryItem[] = [
  {
    id: 'gallery-blue-ring',
    title: 'Blue Ring Multi-Orbit',
    category: 'Space Mobility',
    caption: 'All-in-one hybrid solar-electric and chemical propelled spacecraft platform.',
    image: '/assets/aistudio/Screenshot_20261114_232106_d2e41fb2.jpg',
    imageAlt: 'Blue Ring Multi-Mission Multi-Orbit spacecraft feature showcase',
  },
  {
    id: 'gallery-lunar-mark1',
    title: 'Blue Moon Mark (1)',
    category: 'Lunar Systems',
    caption: 'Gold-foil insulated lander bay engineered for high-mass Artemis cargo delivery.',
    image: '/assets/aistudio/Screenshot_20261114_232119_6b65acc0.jpg',
    imageAlt: 'Blue Moon Mark 1 lunar lander module encased in gold thermal foil inside test bay',
  },
  {
    id: 'gallery-reusable-station',
    title: 'Reusable Orbital Architecture',
    category: 'Commercial LEO',
    caption: 'Modular orbital station infrastructure built for affordability and high availability.',
    image: '/assets/aistudio/Screenshot_20261114_232131_fcc831dc.jpg',
    imageAlt: 'Reusable orbital space station concept in low Earth orbit',
  },
  {
    id: 'gallery-be4-engine',
    title: 'BE-4 Staged Combustion',
    category: 'Propulsion',
    caption: 'Reusable LOX / LNG engine delivering 640,000 lbf (2,846 kN) thrust at sea level.',
    image: '/assets/aistudio/Screenshot_20261114_232143_e8e4abb0.jpg',
    imageAlt: 'BE-4 oxygen-rich staged combustion engine technical showcase',
  },
  {
    id: 'gallery-blue-ring-ops',
    title: 'Orbit Delivery & Heritage',
    category: 'Flight Operations',
    caption: '3,000–4,000 m/s Delta-V reach paired with human-rated launch vehicle redundancy.',
    image: '/assets/aistudio/Screenshot_20261114_232155_93c98d2c.jpg',
    imageAlt: 'How Blue Ring works overview paired with archival orbital flight heritage',
  },
  {
    id: 'gallery-return-to-flight',
    title: 'Pad Recovery & Fabrication',
    category: 'Launch Complex',
    caption: 'Hardware fabrication, hotfire diagnostics, and rapid pad rebuild execution.',
    image: '/assets/aistudio/Screenshot_20261114_232206_ee6ac984.jpg',
    imageAlt: 'Technician welding aerospace tank hardware during Return to Flight engineering update',
  },
  {
    id: 'gallery-horizontal-mate',
    title: 'Horizontal Mating & Breakover',
    category: 'Hybrid CONOPS',
    caption: 'GS1 and GS2 horizontal stage mating followed by crane-based vertical pad erection.',
    image: '/assets/aistudio/Screenshot_20261114_232231_b790ec5e.jpg',
    imageAlt: 'Launch vehicle horizontal mating and crane-based vertical breakover operations',
  },
  {
    id: 'gallery-orbital-heritage',
    title: 'Living in Orbit & Gold Crest',
    category: 'DB Collection Archive',
    caption: 'Commercial LEO station habitats alongside carved golden triangular artifact detailing.',
    image: '/assets/aistudio/Screenshot_20261114_232239_d0a4b011.jpg',
    imageAlt: 'Living and working in space showcase with ornate golden triangular emblem',
  },
  {
    id: 'gallery-curated-relics',
    title: 'Curated Heritage Collection',
    category: 'Special Editions',
    caption: 'Rare collector pieces, carved bronze crests, and graded historic medallions.',
    image: '/assets/aistudio/Screenshot_20261114_232252_9c5d53a6.jpg',
    imageAlt: 'DB Collection showcase of gemstones, antique coins, bronze emblem, and medallion',
  },
];


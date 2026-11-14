import {
  MISSION_PROGRAMS,
  ORBIT_DESTINATIONS,
  type MissionCategory,
  type MissionProgram,
} from '../data/missions';

export interface MissionEstimateResult {
  feasible: boolean;
  remainingDeltaV: number;
  utilizationPercent: number;
  recommendedMode: string;
  warning: string | null;
}

export interface ContactFormInput {
  name: string;
  email: string;
  organization: string;
  missionType: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function filterMissionPrograms(
  query: string,
  category: MissionCategory,
  programs: MissionProgram[] = MISSION_PROGRAMS
): MissionProgram[] {
  const normalizedQuery = query.trim().toLowerCase();

  return programs.filter((program) => {
    const matchesCategory = category === 'all' || program.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;

    return (
      program.title.toLowerCase().includes(normalizedQuery) ||
      program.designation.toLowerCase().includes(normalizedQuery) ||
      program.summary.toLowerCase().includes(normalizedQuery) ||
      program.propulsion.toLowerCase().includes(normalizedQuery) ||
      program.orbitTarget.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function calculateMissionEstimate(
  destinationId: string,
  payloadMassKg: number
): MissionEstimateResult {
  const maxBlueRingDeltaV = 4000;
  const destination =
    ORBIT_DESTINATIONS.find((item) => item.id === destinationId) ?? ORBIT_DESTINATIONS[0];

  const sanitizedMass = Number.isFinite(payloadMassKg) ? Math.max(0, payloadMassKg) : 0;
  const massPenaltyDeltaV = Math.round(Math.max(0, sanitizedMass - 1200) * 0.12);
  const totalRequired = destination.deltaVRequired + massPenaltyDeltaV;
  const remainingDeltaV = maxBlueRingDeltaV - totalRequired;
  const utilizationPercent = Math.min(100, Math.round((totalRequired / maxBlueRingDeltaV) * 100));

  const withinMassLimit = sanitizedMass > 0 && sanitizedMass <= destination.maxPayloadKg;
  const withinDeltaV = remainingDeltaV >= 0;
  const feasible = withinMassLimit && withinDeltaV;

  let warning: string | null = null;
  if (sanitizedMass <= 0) {
    warning = 'Enter a payload mass greater than 0 kg.';
  } else if (!withinMassLimit) {
    warning = `Payload exceeds ${destination.maxPayloadKg.toLocaleString()} kg limit for ${destination.name}.`;
  } else if (!withinDeltaV) {
    warning = 'Required Delta-V exceeds Blue Ring 4,000 m/s upper envelope.';
  }

  return {
    feasible,
    remainingDeltaV,
    utilizationPercent,
    recommendedMode: destination.propulsionMode,
    warning,
  };
}

export function validateContactForm(input: ContactFormInput): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.name.trim() || input.name.trim().length < 2) {
    errors.name = 'Please enter your full name (at least 2 characters).';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(input.email.trim())) {
    errors.email = 'Please enter a valid work or personal email address.';
  }

  if (!input.message.trim() || input.message.trim().length < 10) {
    errors.message = 'Please describe your mission requirements (at least 10 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validatePortalSignIn(email: string, accessCode: string): ValidationResult {
  const errors: Record<string, string> = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email.trim())) {
    errors.email = 'Enter a valid partner email address.';
  }

  if (!accessCode.trim() || accessCode.trim().length < 6) {
    errors.accessCode = 'Partner access code must be at least 6 characters.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export type CameraPresetId = 'overview' | 'propulsion' | 'crest';

export interface CameraPresetConfig {
  id: CameraPresetId;
  label: string;
  position: [number, number, number];
  target: [number, number, number];
}

export const ORBITAL_CAMERA_PRESETS: CameraPresetConfig[] = [
  {
    id: 'overview',
    label: 'Orbital Full',
    position: [4.8, 2.3, 5.4],
    target: [0, 0.05, 0],
  },
  {
    id: 'propulsion',
    label: 'BE-4 Nozzle',
    position: [2.9, -1.4, 3.2],
    target: [0, -1.35, 0],
  },
  {
    id: 'crest',
    label: 'Gold Emblem',
    position: [2.2, 2.35, 2.75],
    target: [0, 1.45, 0],
  },
];

export interface StageKinematics {
  crestY: number;
  nozzleY: number;
  wingSpreadOffset: number;
  gimbalScale: number;
}

export function computeStageKinematics(explodedFactor: number): StageKinematics {
  const clamped = Number.isFinite(explodedFactor)
    ? Math.max(0, Math.min(1, explodedFactor))
    : 0;
  return {
    crestY: 1.24 + clamped * 0.85,
    nozzleY: -1.22 - clamped * 0.72,
    wingSpreadOffset: clamped * 0.55,
    gimbalScale: 1 + clamped * 0.22,
  };
}


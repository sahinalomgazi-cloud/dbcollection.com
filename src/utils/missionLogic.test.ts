import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateMissionEstimate,
  filterMissionPrograms,
  validateContactForm,
  validatePortalSignIn,
} from './missionLogic';

test('filterMissionPrograms filters by category and search query', () => {
  const lunarPrograms = filterMissionPrograms('', 'lunar');
  assert.equal(lunarPrograms.length, 2);
  assert.ok(lunarPrograms.every((p) => p.category === 'lunar'));

  const be4Match = filterMissionPrograms('BE-4', 'all');
  assert.equal(be4Match.length, 1);
  assert.equal(be4Match[0].id, 'new-glenn');

  const noMatch = filterMissionPrograms('nonexistent-spacecraft-xyz', 'all');
  assert.equal(noMatch.length, 0);
});

test('calculateMissionEstimate validates Delta-V envelope and payload caps', () => {
  const nominalGeo = calculateMissionEstimate('leo-to-geo', 1500);
  assert.equal(nominalGeo.feasible, true);
  assert.equal(nominalGeo.warning, null);
  assert.ok(nominalGeo.remainingDeltaV > 0);

  const overweight = calculateMissionEstimate('mars-escape', 2500);
  assert.equal(overweight.feasible, false);
  assert.ok(overweight.warning?.includes('exceeds'));

  const zeroMass = calculateMissionEstimate('cislunar', 0);
  assert.equal(zeroMass.feasible, false);
  assert.ok(zeroMass.warning?.includes('greater than 0 kg'));
});

test('validateContactForm rejects empty or malformed fields and accepts valid input', () => {
  const invalid = validateContactForm({
    name: 'A',
    email: 'bad-email',
    organization: '',
    missionType: 'Lunar Cargo',
    message: 'short',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    name: 'Arjun Rao',
    email: 'arjun@orbital.in',
    organization: 'Deccan Satellites',
    missionType: 'Blue Ring Orbital Hosting',
    message: 'Requesting payload manifest slot for Q4 cislunar deployment.',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

import { BRAND_BANNERS, MIDDLE_GALLERY_ITEMS } from '../data/missions';
import { computeStageKinematics, ORBITAL_CAMERA_PRESETS } from './missionLogic';

test('validatePortalSignIn enforces email format and minimum access code length', () => {
  const bad = validatePortalSignIn('invalid', '123');
  assert.equal(bad.valid, false);
  assert.ok(bad.errors.email);
  assert.ok(bad.errors.accessCode);

  const ok = validatePortalSignIn('partner@dbcollection.space', 'DBC-2026-OPS');
  assert.equal(ok.valid, true);
});

test('MIDDLE_GALLERY_ITEMS and BRAND_BANNERS point to local uploaded assets', () => {
  assert.equal(MIDDLE_GALLERY_ITEMS.length, 9);
  const uniquePaths = new Set(MIDDLE_GALLERY_ITEMS.map((item) => item.image));
  assert.equal(uniquePaths.size, 9);
  assert.ok(MIDDLE_GALLERY_ITEMS.every((item) => item.image.startsWith('/assets/aistudio/')));
  assert.ok(BRAND_BANNERS.up.startsWith('/assets/aistudio/'));
  assert.ok(BRAND_BANNERS.down.startsWith('/assets/aistudio/'));
});

test('computeStageKinematics clamps exploded factor and defines 3 camera presets', () => {
  assert.equal(ORBITAL_CAMERA_PRESETS.length, 3);
  const closed = computeStageKinematics(-0.5);
  assert.equal(closed.crestY, 1.24);
  assert.equal(closed.nozzleY, -1.22);
  assert.equal(closed.gimbalScale, 1);

  const expanded = computeStageKinematics(1.5);
  assert.ok(expanded.crestY > 2.0);
  assert.ok(expanded.nozzleY < -1.9);
  assert.equal(expanded.gimbalScale, 1.22);
});




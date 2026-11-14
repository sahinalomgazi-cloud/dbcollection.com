import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { ChevronDown, ChevronUp, Pause, Play, RotateCcw } from 'lucide-react';
import { buildSpacecraftModel } from '../three/buildSpacecraftModel';
import {
  computeStageKinematics,
  ORBITAL_CAMERA_PRESETS,
  type CameraPresetId,
} from '../utils/missionLogic';

const _targetPos = new THREE.Vector3();
const _targetLook = new THREE.Vector3();

function detectSoftwareGl(): boolean {
  try {
    const probeCanvas = document.createElement('canvas');
    const gl = probeCanvas.getContext('webgl2');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) ?? '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

export function Orbital3DAnimationSection() {
  const mountRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [explodedPct, setExplodedPct] = useState(18);
  const [activePreset, setActivePreset] = useState<CameraPresetId>('overview');
  const [dockCollapsed, setDockCollapsed] = useState(false);
  const [webglError, setWebglError] = useState(false);

  const simStateRef = useRef({
    isPlaying: true,
    explodedFactor: 0.18,
    presetRequest: null as {
      position: [number, number, number];
      target: [number, number, number];
    } | null,
    resetRequested: false,
  });

  useEffect(() => {
    simStateRef.current.isPlaying = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    simStateRef.current.explodedFactor = explodedPct / 100;
  }, [explodedPct]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareGl();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglError(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x080705, 1);

    const width = Math.max(container.clientWidth, 320);
    const height = Math.max(container.clientHeight, 320);
    renderer.setSize(width, height);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080705);
    scene.fog = new THREE.FogExp2(0x080705, 0.042);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    pmremGenerator.dispose();

    const initialAspect = width / height;
    const camera = new THREE.PerspectiveCamera(
      initialAspect < 1 ? 54 : 42,
      initialAspect,
      0.1,
      100
    );
    const initialPreset = ORBITAL_CAMERA_PRESETS[0];
    camera.position.set(...initialPreset.position);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(
      initialPreset.target[0],
      initialAspect < 1 ? -0.35 : initialPreset.target[1],
      initialPreset.target[2]
    );
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.06;
    controls.minDistance = 2.6;
    controls.maxDistance = 12;
    controls.enablePan = false;
    controls.update();

    const cancelCameraPreset = () => {
      simStateRef.current.presetRequest = null;
    };
    controls.addEventListener('start', cancelCameraPreset);

    // 3-Point Warm/Cool Studio Lighting
    const hemiLight = new THREE.HemisphereLight(0x93c5fd, 0x1a1306, 0.85);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffe08a, 2.8);
    keyLight.position.set(5, 7, 5);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 20;
    keyLight.shadow.camera.left = -4;
    keyLight.shadow.camera.right = 4;
    keyLight.shadow.camera.top = 4;
    keyLight.shadow.camera.bottom = -4;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd4af37, 1.8);
    rimLight.position.set(-5, -2, -4);
    scene.add(rimLight);

    // Build Procedural Golden Orbital Spacecraft Assembly
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const assembly = buildSpacecraftModel(maxAniso);
    scene.add(assembly.root);
    scene.add(assembly.orbitalDust);

    // Ground Contact Shadow Disc & Orbital Reference Grid Ring
    const discGeo = new THREE.RingGeometry(1.1, 2.35, 48);
    const discMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const orbitalRingFloor = new THREE.Mesh(discGeo, discMat);
    orbitalRingFloor.rotation.x = -Math.PI / 2;
    orbitalRingFloor.position.y = -2.45;
    scene.add(orbitalRingFloor);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const handleResize = () => {
      if (!container) return;
      const w = Math.max(container.clientWidth, 320);
      const h = Math.max(container.clientHeight, 320);
      const nextAspect = w / h;
      camera.aspect = nextAspect;
      camera.fov = nextAspect < 1 ? 54 : 42;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    let frameId = 0;
    let disposed = false;
    let simTime = 0;
    let currentExploded = simStateRef.current.explodedFactor;
    let lastTimestamp = performance.now();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync ? gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0) : null;
      gl.flush();
      if (!sync) {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const poll = () => {
        if (disposed) {
          gl.deleteSync(sync);
          return;
        }
        const state = gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      if (disposed) return;

      const now = performance.now();
      const delta = Math.min((now - lastTimestamp) / 1000, 0.1);
      lastTimestamp = now;
      const state = simStateRef.current;

      if (state.isPlaying) {
        simTime += delta;
        assembly.root.rotation.y += delta * 0.28;
        assembly.root.position.y = Math.sin(simTime * 1.35) * 0.09;
        assembly.gimbalOuter.rotation.z += delta * 0.65;
        assembly.gimbalOuter.rotation.x = Math.PI / 3 + Math.sin(simTime * 0.8) * 0.14;
        assembly.gimbalInner.rotation.x -= delta * 0.85;
        assembly.gimbalInner.rotation.z += delta * 0.35;
        assembly.orbitalDust.rotation.y -= delta * 0.14;
        assembly.thrusterCore.scale.y = 0.88 + Math.sin(simTime * 8) * 0.14;
      }

      // Smooth exponential damping for exploded stage kinematics
      currentExploded = THREE.MathUtils.damp(currentExploded, state.explodedFactor, 6.5, delta);
      const kin = computeStageKinematics(currentExploded);
      assembly.fairingCrest.position.y = kin.crestY;
      assembly.nozzleGroup.position.y = kin.nozzleY;
      assembly.gimbalOuter.scale.setScalar(kin.gimbalScale);
      assembly.gimbalInner.scale.setScalar(kin.gimbalScale);

      assembly.solarWings.forEach((wingPivot, idx) => {
        const dirX = Math.cos((idx * Math.PI) / 2);
        const dirZ = Math.sin((idx * Math.PI) / 2);
        wingPivot.position.set(
          dirX * kin.wingSpreadOffset,
          0,
          -dirZ * kin.wingSpreadOffset
        );
        wingPivot.rotation.z =
          (idx % 2 === 0 ? 1 : -1) *
          (0.06 * Math.sin(simTime * 0.9) + currentExploded * 0.18);
      });

      // Smooth scripted camera preset glide
      if (state.presetRequest) {
        _targetPos.set(...state.presetRequest.position);
        _targetLook.set(...state.presetRequest.target);
        const lerpAlpha = 1 - Math.exp(-5.5 * delta);
        camera.position.lerp(_targetPos, lerpAlpha);
        controls.target.lerp(_targetLook, lerpAlpha);
        if (
          camera.position.distanceTo(_targetPos) < 0.03 &&
          controls.target.distanceTo(_targetLook) < 0.03
        ) {
          camera.position.copy(_targetPos);
          controls.target.copy(_targetLook);
          state.presetRequest = null;
        }
      }

      controls.update();
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      resizeObserver.disconnect();
      controls.removeEventListener('start', cancelCameraPreset);
      controls.dispose();
      discGeo.dispose();
      discMat.dispose();
      envTarget.dispose();
      assembly.dispose();
      renderer.dispose();
    };
  }, []);

  const handleSelectPreset = (presetId: CameraPresetId) => {
    const preset = ORBITAL_CAMERA_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setActivePreset(presetId);
    simStateRef.current.presetRequest = {
      position: preset.position,
      target: preset.target,
    };
  };

  const handleResetView = () => {
    setExplodedPct(18);
    setIsPlaying(true);
    handleSelectPreset('overview');
  };

  return (
    <section
      id="orbital-3d"
      aria-labelledby="orbital-3d-heading"
      className="bg-[#080705] border-t border-[#D4AF37]/25 py-16 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-2">
              Real-Time 3D WebGL Simulation
            </p>
            <h2
              id="orbital-3d-heading"
              className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#F5D77F] mb-2"
            >
              Interactive 3D Orbital Vehicle Animation
            </h2>
            <p className="text-base text-[#F3E7C9]">
              Inspect DB COLLECTION&apos;s golden orbital mobility core, gimbaled gyro rings,
              deployable solar wings, and BE-4 thruster assembly in 3D space. Drag to orbit.
            </p>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-[#C5A55A] shrink-0">
            Drag to Orbit · Scroll to Zoom
          </p>
        </div>

        {/* Dedicated 3D Viewport Wrapper with Collapsible Bottom Dock */}
        <div className="relative h-[460px] sm:h-[520px] lg:h-[560px] w-full rounded-xl overflow-hidden border border-[#D4AF37]/30 bg-[#080705]">
          {webglError ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#0C0A07]">
              <p className="font-display text-2xl font-bold uppercase text-[#F5D77F] mb-2">
                3D Viewport Unavailable
              </p>
              <p className="text-sm text-[#F3E7C9] max-w-md">
                WebGL2 graphics acceleration is disabled in this browser context. Hardware specs
                and mission plates remain available below.
              </p>
            </div>
          ) : (
            <div
              ref={mountRef}
              data-testid="orbital-3d-canvas-container"
              className="w-full h-full cursor-grab active:cursor-grabbing"
              aria-label="Interactive 3D golden spacecraft animation viewport"
            />
          )}

          {/* Top-Left Minimal Spec Badge (No occluding sidebars) */}
          <div className="pointer-events-none absolute top-4 left-4 bg-[#0D0B07]/90 border border-[#D4AF37]/35 px-3.5 py-2 rounded-sm">
            <p className="font-mono text-[11px] uppercase tracking-widest text-[#D4AF37]">
              DB-ORBITAL 3D CORE
            </p>
            <p className="text-xs font-semibold text-[#F5D77F]">
              {isPlaying ? 'Active Gyro Kinematics' : 'Paused Inspection'}
            </p>
          </div>

          {/* Unified Collapsible Bottom Control Dock (Zero backdrop-blur over WebGL) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[min(860px,94%)] flex flex-col items-center z-10">
            <button
              type="button"
              onClick={() => setDockCollapsed((prev) => !prev)}
              aria-expanded={!dockCollapsed}
              aria-label={dockCollapsed ? 'Expand 3D controls' : 'Collapse 3D controls'}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#12100C] border border-b-0 border-[#D4AF37]/40 text-[#F5D77F] text-[11px] font-mono uppercase tracking-wider rounded-t-sm hover:bg-[#1B1710] cursor-pointer"
            >
              {dockCollapsed ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
                  Show 3D Controls
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                  Hide 3D Controls
                </>
              )}
            </button>

            {!dockCollapsed && (
              <div className="w-full bg-[#12100C] border border-[#D4AF37]/40 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 shadow-2xl">
                {/* Play / Pause & Reset */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPlaying((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider bg-[#D4AF37] text-[#080705] hover:bg-[#F5D77F] rounded-sm cursor-pointer whitespace-nowrap"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" aria-hidden="true" />
                        Animate
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleResetView}
                    aria-label="Reset 3D camera and stage view"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[#E6D39A] border border-[#D4AF37]/30 hover:border-[#F5D77F] hover:text-[#F5D77F] rounded-sm cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                    Reset
                  </button>
                </div>

                {/* Exploded Stage Separation Slider */}
                <label className="flex items-center gap-2.5 text-xs text-[#F3E7C9]">
                  <span className="font-mono uppercase text-[#D4AF37] whitespace-nowrap">
                    Stage Expand
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={explodedPct}
                    onChange={(e) => setExplodedPct(Number(e.target.value))}
                    aria-label="Stage separation expansion percentage"
                    className="w-24 sm:w-32 accent-[#D4AF37] cursor-pointer"
                  />
                  <span className="font-mono text-[#F5D77F] tabular-nums w-9 text-right">
                    {explodedPct}%
                  </span>
                </label>

                {/* Camera Presets */}
                <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="3D Camera Presets">
                  {ORBITAL_CAMERA_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset.id)}
                      aria-pressed={activePreset === preset.id}
                      className={`px-2.5 py-1.5 text-[11px] font-mono uppercase tracking-wider rounded-sm border transition-colors cursor-pointer whitespace-nowrap ${
                        activePreset === preset.id
                          ? 'bg-[#D4AF37] text-[#080705] border-[#D4AF37] font-semibold'
                          : 'bg-[#080705] text-[#E6D39A] border-[#D4AF37]/25 hover:border-[#F5D77F] hover:text-[#F5D77F]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

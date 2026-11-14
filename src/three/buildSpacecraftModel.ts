import * as THREE from 'three';

export interface SpacecraftAssembly {
  root: THREE.Group;
  coreStage: THREE.Group;
  nozzleGroup: THREE.Group;
  gimbalOuter: THREE.Mesh;
  gimbalInner: THREE.Mesh;
  solarWings: THREE.Group[];
  fairingCrest: THREE.Group;
  thrusterCore: THREE.Mesh;
  orbitalDust: THREE.InstancedMesh;
  dispose: () => void;
}

function createBrushedGoldBumpTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 256, 256);
    for (let y = 0; y < 256; y += 2) {
      const shade = 110 + Math.floor(((Math.sin(y * 0.7) + 1) * 0.5) * 35);
      ctx.fillStyle = `rgb(${shade},${shade},${shade})`;
      ctx.fillRect(0, y, 256, 1);
    }
    for (let i = 0; i < 320; i++) {
      const x = (i * 53) % 256;
      const y = (i * 97) % 256;
      const w = 18 + (i % 44);
      ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
      ctx.fillRect(x, y, w, 1);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 2);
  texture.anisotropy = maxAnisotropy;
  return texture;
}

function createSolarGridTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#0D0B07';
    ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 2;
    for (let x = 0; x <= 256; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 256);
      ctx.stroke();
    }
    for (let y = 0; y <= 256; y += 64) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(256, y);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(212, 175, 55, 0.12)';
    for (let x = 4; x < 256; x += 32) {
      for (let y = 4; y < 256; y += 64) {
        ctx.fillRect(x, y, 24, 56);
      }
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = maxAnisotropy;
  return texture;
}

export function buildSpacecraftModel(maxAnisotropy: number): SpacecraftAssembly {
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const textures: THREE.Texture[] = [];

  const trackGeo = <T extends THREE.BufferGeometry>(g: T): T => {
    geometries.push(g);
    return g;
  };
  const trackMat = <T extends THREE.Material>(m: T): T => {
    materials.push(m);
    return m;
  };

  const brushedBump = createBrushedGoldBumpTexture(maxAnisotropy);
  const solarTexture = createSolarGridTexture(maxAnisotropy);
  textures.push(brushedBump, solarTexture);

  const goldAlloyMat = trackMat(
    new THREE.MeshPhysicalMaterial({
      color: 0xd4af37,
      metalness: 0.92,
      roughness: 0.22,
      clearcoat: 0.55,
      clearcoatRoughness: 0.18,
      bumpMap: brushedBump,
      bumpScale: 0.015,
    })
  );

  const brightGoldMat = trackMat(
    new THREE.MeshPhysicalMaterial({
      color: 0xf5d77f,
      metalness: 0.96,
      roughness: 0.14,
      clearcoat: 0.85,
      clearcoatRoughness: 0.1,
    })
  );

  const obsidianHullMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x16130d,
      metalness: 0.55,
      roughness: 0.58,
      bumpMap: brushedBump,
      bumpScale: 0.01,
    })
  );

  const matteCarbonMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x0b0906,
      metalness: 0.2,
      roughness: 0.82,
    })
  );

  const solarPanelMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: solarTexture,
      metalness: 0.35,
      roughness: 0.28,
    })
  );

  const thrusterMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xf5d77f,
      emissive: 0xd97706,
      emissiveIntensity: 2.2,
      roughness: 0.25,
      metalness: 0.1,
    })
  );

  const root = new THREE.Group();

  // 1. Core Fuselage (LatheGeometry silhouette)
  const coreStage = new THREE.Group();
  const hullPoints = [
    new THREE.Vector2(0.01, -1.2),
    new THREE.Vector2(0.55, -1.18),
    new THREE.Vector2(0.68, -0.75),
    new THREE.Vector2(0.68, 0.72),
    new THREE.Vector2(0.56, 1.05),
    new THREE.Vector2(0.42, 1.15),
    new THREE.Vector2(0.01, 1.15),
  ];
  const hullGeo = trackGeo(new THREE.LatheGeometry(hullPoints, 32));
  const hullMesh = new THREE.Mesh(hullGeo, obsidianHullMat);
  hullMesh.castShadow = true;
  hullMesh.receiveShadow = true;
  coreStage.add(hullMesh);

  // Anodized gold compression bands around core hull
  const collarGeo = trackGeo(new THREE.CylinderGeometry(0.71, 0.71, 0.14, 32));
  const upperCollar = new THREE.Mesh(collarGeo, goldAlloyMat);
  upperCollar.position.y = 0.56;
  const lowerCollar = new THREE.Mesh(collarGeo, goldAlloyMat);
  lowerCollar.position.y = -0.58;
  coreStage.add(upperCollar, lowerCollar);
  root.add(coreStage);

  // 2. BE-4 Engine Nozzle Bell (LatheGeometry) + Glowing Thruster Core
  const nozzleGroup = new THREE.Group();
  nozzleGroup.position.y = -1.22;
  const nozzlePoints = [
    new THREE.Vector2(0.24, 0.12),
    new THREE.Vector2(0.18, -0.05),
    new THREE.Vector2(0.32, -0.45),
    new THREE.Vector2(0.48, -0.82),
    new THREE.Vector2(0.44, -0.84),
    new THREE.Vector2(0.16, -0.08),
  ];
  const nozzleGeo = trackGeo(new THREE.LatheGeometry(nozzlePoints, 32));
  const nozzleMesh = new THREE.Mesh(nozzleGeo, matteCarbonMat);
  nozzleMesh.castShadow = true;
  nozzleGroup.add(nozzleMesh);

  const thrusterRingGeo = trackGeo(new THREE.TorusGeometry(0.46, 0.03, 12, 32));
  const thrusterRing = new THREE.Mesh(thrusterRingGeo, goldAlloyMat);
  thrusterRing.rotation.x = Math.PI / 2;
  thrusterRing.position.y = -0.82;
  nozzleGroup.add(thrusterRing);

  const thrusterCoreGeo = trackGeo(new THREE.ConeGeometry(0.32, 0.55, 24));
  const thrusterCore = new THREE.Mesh(thrusterCoreGeo, thrusterMat);
  thrusterCore.position.y = -0.55;
  nozzleGroup.add(thrusterCore);
  root.add(nozzleGroup);

  // 3. Blue Ring Concentric Gyroscopic Mobility Bus
  const gimbalOuterGeo = trackGeo(new THREE.TorusGeometry(1.52, 0.065, 16, 48));
  const gimbalOuter = new THREE.Mesh(gimbalOuterGeo, goldAlloyMat);
  gimbalOuter.rotation.x = Math.PI / 3;
  root.add(gimbalOuter);

  const gimbalInnerGeo = trackGeo(new THREE.TorusGeometry(1.22, 0.045, 16, 48));
  const gimbalInner = new THREE.Mesh(gimbalInnerGeo, brightGoldMat);
  gimbalInner.rotation.y = Math.PI / 4;
  root.add(gimbalInner);

  // 4. Four Articulated Solar Wings (Beveled ExtrudeGeometry)
  const wingShape = new THREE.Shape();
  wingShape.moveTo(0, -0.34);
  wingShape.lineTo(1.55, -0.26);
  wingShape.lineTo(1.55, 0.26);
  wingShape.lineTo(0, 0.34);
  wingShape.closePath();

  const wingGeo = trackGeo(
    new THREE.ExtrudeGeometry(wingShape, {
      depth: 0.04,
      bevelEnabled: true,
      bevelThickness: 0.015,
      bevelSize: 0.015,
      bevelSegments: 2,
    })
  );
  const strutGeo = trackGeo(new THREE.CylinderGeometry(0.035, 0.035, 0.42, 12));

  const solarWings: THREE.Group[] = [];
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI) / 2;
    const pivot = new THREE.Group();
    pivot.rotation.y = angle;

    const strut = new THREE.Mesh(strutGeo, goldAlloyMat);
    strut.rotation.z = Math.PI / 2;
    strut.position.x = 0.85;
    pivot.add(strut);

    const wingPanel = new THREE.Mesh(wingGeo, solarPanelMat);
    wingPanel.position.set(1.02, 0, -0.02);
    wingPanel.castShadow = true;
    pivot.add(wingPanel);

    const frame = new THREE.Mesh(
      trackGeo(new THREE.BoxGeometry(1.58, 0.04, 0.08)),
      goldAlloyMat
    );
    frame.position.set(1.8, 0.28, 0);
    pivot.add(frame);

    root.add(pivot);
    solarWings.push(pivot);
  }

  // 5. Golden Triangular Payload Emblem / Forward Docking Fairing (ExtrudeGeometry)
  const fairingCrest = new THREE.Group();
  fairingCrest.position.y = 1.24;

  const triShape = new THREE.Shape();
  triShape.moveTo(0, 0.72);
  triShape.lineTo(-0.52, -0.18);
  triShape.lineTo(0.52, -0.18);
  triShape.closePath();

  const crestGeo = trackGeo(
    new THREE.ExtrudeGeometry(triShape, {
      depth: 0.14,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.025,
      bevelSegments: 3,
    })
  );
  crestGeo.center();
  const crestFront = new THREE.Mesh(crestGeo, brightGoldMat);
  crestFront.position.y = 0.34;
  crestFront.castShadow = true;

  const dockingRing = new THREE.Mesh(
    trackGeo(new THREE.TorusGeometry(0.42, 0.05, 14, 32)),
    goldAlloyMat
  );
  dockingRing.rotation.x = Math.PI / 2;
  dockingRing.position.y = -0.04;

  fairingCrest.add(dockingRing, crestFront);
  root.add(fairingCrest);

  // 6. Instanced Golden Orbital Telemetry Nodes (160 instances)
  const dustCount = 160;
  const dustGeo = trackGeo(new THREE.OctahedronGeometry(0.032, 0));
  const dustMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0xf5d77f,
      emissive: 0xd4af37,
      emissiveIntensity: 0.9,
      roughness: 0.3,
      metalness: 0.8,
    })
  );
  const orbitalDust = new THREE.InstancedMesh(dustGeo, dustMat, dustCount);
  orbitalDust.frustumCulled = false;

  const dummy = new THREE.Object3D();
  for (let i = 0; i < dustCount; i++) {
    const theta = (i / dustCount) * Math.PI * 2 + (i % 7) * 0.19;
    const radius = 2.4 + ((i * 37) % 100) * 0.028;
    const yOffset = (((i * 19) % 100) / 100 - 0.5) * 2.4;
    const scale = 0.55 + ((i * 13) % 10) * 0.09;
    dummy.position.set(Math.cos(theta) * radius, yOffset, Math.sin(theta) * radius);
    dummy.rotation.set(i * 0.5, i * 0.8, 0);
    dummy.scale.setScalar(scale);
    dummy.updateMatrix();
    orbitalDust.setMatrixAt(i, dummy.matrix);
  }
  orbitalDust.instanceMatrix.needsUpdate = true;
  orbitalDust.computeBoundingSphere();

  const dispose = () => {
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
    textures.forEach((t) => t.dispose());
  };

  return {
    root,
    coreStage,
    nozzleGroup,
    gimbalOuter,
    gimbalInner,
    solarWings,
    fairingCrest,
    thrusterCore,
    orbitalDust,
    dispose,
  };
}

import * as THREE from 'three';
import { SAMPLE_TOKENS, VECTOR_EMBEDDING_NODES } from '../data/storyData';

export class ThreeEngine {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private container!: HTMLElement;
  
  // 3D Group Containers for sections
  public heroGroup!: THREE.Group;
  public tokenGroup!: THREE.Group;
  public stemGroup!: THREE.Group;
  public vectorGroup!: THREE.Group;
  public transformerGroup!: THREE.Group;
  public aiCoreGroup!: THREE.Group;
  public earthGroup!: THREE.Group;

  // Interactive Raycasting
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2(-999, -999);
  private hoveredCube: THREE.Mesh | null = null;
  private tokenMeshes: { mesh: THREE.Mesh; tokenData: any; originalScale: THREE.Vector3; originalColor: number }[] = [];
  public onTokenHoverCallback?: (token: any | null, clientX: number, clientY: number) => void;
  public onTokenClickCallback?: (token: any) => void;

  // Animation state
  private clock = new THREE.Clock();
  private isRunning = false;

  constructor(containerId: string) {
    const el = document.getElementById(containerId);
    if (!el) throw new Error(`Container #${containerId} not found`);
    this.container = el;
    this.init();
  }

  private init(): void {
    // Scene: light cream editorial background
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xF7F5F2);
    this.scene.fog = new THREE.FogExp2(0xF7F5F2, 0.028);

    // Camera
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(58, width / height, 0.1, 1000);
    this.camera.position.set(0, 0, 15);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // Lighting: warm museum-style (no neon)
    const ambientLight = new THREE.AmbientLight(0xFFF8F0, 0.7); // warm white fill
    this.scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xFFE8C8, 1.0); // warm key light
    keyLight.position.set(10, 20, 15);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    this.scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xC8D0FF, 0.35); // cool lavender fill
    fillLight.position.set(-12, -5, 8);
    this.scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xFFDDAA, 0.8, 60); // warm rim/backlight
    rimLight.position.set(0, -10, -15);
    this.scene.add(rimLight);

    // Build 3D Zones
    this.buildHeroParticles();
    this.buildTokenCubes();
    this.buildStemmingGeometry();
    this.buildVectorSpace();
    this.buildTransformerNetwork();
    this.buildAICore();
    this.buildEarth();

    // Event listeners
    window.addEventListener('resize', this.onWindowResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('click', this.onClick.bind(this));

    // Start render loop
    this.isRunning = true;
    this.animate();
  }

  private createParticleTexture(): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    return new THREE.CanvasTexture(canvas);
  }

  private buildHeroParticles(): void {
    this.heroGroup = new THREE.Group();
    const particleCount = 700; // Reduced from 2000 — calmer, more intentional

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Warm, darker palette for light background
    const colorPalette = [
      new THREE.Color(0xC65D3B), // terracotta
      new THREE.Color(0x4F5D95), // muted indigo
      new THREE.Color(0xC9A227), // warm gold
      new THREE.Color(0x3A7D44), // forest green
      new THREE.Color(0xA03030), // crimson
      new THREE.Color(0x8B6E5A), // warm brown
    ];

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Distributed across a wider, more spacious volume
      positions[i]     = (Math.random() - 0.5) * 50;
      positions[i + 1] = (Math.random() - 0.5) * 50;
      positions[i + 2] = (Math.random() - 0.5) * 40 - 5;

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i]     = col.r;
      colors[i + 1] = col.g;
      colors[i + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.10,          // smaller, more delicate
      vertexColors: true,
      transparent: true,
      opacity: 0.55,       // softer presence
      blending: THREE.NormalBlending, // no additive glow accumulation
      map: this.createParticleTexture(),
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    this.heroGroup.add(particles);
    this.heroGroup.position.set(0, 0, 0);
    this.scene.add(this.heroGroup);
  }

  private buildTokenCubes(): void {
    this.tokenGroup = new THREE.Group();
    const spacing = 2.2;
    const startX = -((SAMPLE_TOKENS.length - 1) * spacing) / 2;

    const cubeGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);

    // Warm editorial palette for token cubes
    const activeColors  = [0xC65D3B, 0x4F5D95, 0xC9A227, 0x3A7D44, 0x8B6E5A];
    const stopwordColor = 0x4A4540; // dark warm grey for stopwords

    SAMPLE_TOKENS.forEach((tok, idx) => {
      const color = tok.isStopword ? stopwordColor : activeColors[idx % activeColors.length];

      const mat = new THREE.MeshPhysicalMaterial({
        color: color,
        roughness: 0.35,
        metalness: 0.55,
        transparent: true,
        opacity: tok.isStopword ? 0.5 : 0.88,
      });

      const mesh = new THREE.Mesh(cubeGeo, mat);
      mesh.position.set(startX + idx * spacing, 0, 0);

      // Subtle wireframe overlay
      const wireGeo = new THREE.WireframeGeometry(cubeGeo);
      const wireMat = new THREE.LineBasicMaterial({ color: 0x1B1B1B, transparent: true, opacity: 0.1 });
      const wire = new THREE.LineSegments(wireGeo, wireMat);
      mesh.add(wire);

      this.tokenGroup.add(mesh);
      this.tokenMeshes.push({
        mesh,
        tokenData: tok,
        originalScale: new THREE.Vector3(1, 1, 1),
        originalColor: color
      });
    });

    this.tokenGroup.position.set(0, -35, 0);
    this.scene.add(this.tokenGroup);
  }

  private buildStemmingGeometry(): void {
    this.stemGroup = new THREE.Group();

    // Central octahedron — warm gold wireframe
    const coreGeo = new THREE.OctahedronGeometry(1.8, 0);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0xC9A227,
      roughness: 0.1,
      metalness: 0.8,
      wireframe: true,
      transparent: true,
      opacity: 0.85
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    this.stemGroup.add(coreMesh);

    // Orbiting spheres — terracotta
    const sphereGeo = new THREE.SphereGeometry(0.5, 16, 16);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0xC65D3B,
      roughness: 0.4,
      metalness: 0.3
    });

    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.set(Math.cos(angle) * 4, Math.sin(angle) * 4, 0);
      sphere.userData = { angle, radius: 4, speed: 0.5 + i * 0.1 }; // slower orbit
      this.stemGroup.add(sphere);
    }

    this.stemGroup.position.set(0, -70, 0);
    this.scene.add(this.stemGroup);
  }

  private buildVectorSpace(): void {
    this.vectorGroup = new THREE.Group();

    // Subtle warm-grey axes
    const axisMat = new THREE.LineBasicMaterial({ color: 0x3A3330, transparent: true, opacity: 0.4 });
    const createAxis = (start: [number, number, number], end: [number, number, number]) => {
      const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...start), new THREE.Vector3(...end)]);
      return new THREE.Line(geo, axisMat);
    };
    this.vectorGroup.add(createAxis([-8, 0, 0], [8, 0, 0]));
    this.vectorGroup.add(createAxis([0, -8, 0], [0, 8, 0]));
    this.vectorGroup.add(createAxis([0, 0, -8], [0, 0, 8]));

    // Nodes with warm palette
    const nodeGeo = new THREE.SphereGeometry(0.42, 24, 24);
    const nodeMap: { [key: string]: THREE.Mesh } = {};

    VECTOR_EMBEDDING_NODES.forEach(node => {
      // Remap neon colors to warm palette equivalents
      const warmColor = this.remapToWarmColor(node.color);
      const mat = new THREE.MeshPhysicalMaterial({
        color: warmColor,
        emissive: warmColor,
        emissiveIntensity: 0.15, // subtle glow, not neon
        roughness: 0.3,
        metalness: 0.5
      });
      const mesh = new THREE.Mesh(nodeGeo, mat);
      mesh.position.set(...node.position);
      this.vectorGroup.add(mesh);
      nodeMap[node.word] = mesh;
    });

    // Connecting lines — muted warm tones
    VECTOR_EMBEDDING_NODES.forEach(node => {
      node.connections.forEach(targetWord => {
        if (nodeMap[targetWord]) {
          const start = new THREE.Vector3(...node.position);
          const end = nodeMap[targetWord].position;
          const lineGeo = new THREE.BufferGeometry().setFromPoints([start, end]);
          const lineMat = new THREE.LineBasicMaterial({
            color: 0x5A5045,
            transparent: true,
            opacity: 0.35
          });
          const line = new THREE.Line(lineGeo, lineMat);
          this.vectorGroup.add(line);
        }
      });
    });

    this.vectorGroup.position.set(0, -115, 0);
    this.scene.add(this.vectorGroup);
  }

  // Maps neon colors to warm editorial equivalents
  private remapToWarmColor(originalHex: number): number {
    const colorMap: { [key: number]: number } = {
      0x00f2fe: 0x4F5D95, // neon cyan → muted indigo
      0x4facfe: 0x7888BF, // neon blue → light indigo
      0x9f55ff: 0x8B6E5A, // neon purple → warm brown
      0xff416c: 0xC65D3B, // neon pink/red → terracotta
      0xffb800: 0xC9A227, // gold (keep warm gold)
      0x10b981: 0x3A7D44, // emerald → forest green
      0xff6b6b: 0xA03030, // red → muted crimson
    };
    return colorMap[originalHex] ?? 0xA09080; // fallback warm beige
  }

  private buildTransformerNetwork(): void {
    this.transformerGroup = new THREE.Group();

    const tierCount = 3;
    const nodesPerTier = 8;
    const tierDistance = 3.5;

    for (let t = 0; t < tierCount; t++) {
      const tierGroup = new THREE.Group();
      const radius = 4.5 - t * 0.8;
      const yPos = (t - 1) * tierDistance;

      // Ring — muted indigo
      const ringGeo = new THREE.RingGeometry(radius - 0.05, radius + 0.05, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: t === 0 ? 0x4F5D95 : (t === 1 ? 0x8B6E5A : 0xC9A227),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.22
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = yPos;
      tierGroup.add(ring);

      // Nodes
      const nodeGeo = new THREE.SphereGeometry(0.28, 16, 16);
      const nodeColors = [0x4F5D95, 0x8B6E5A, 0xC9A227];
      const nodeMat = new THREE.MeshStandardMaterial({
        color: nodeColors[t],
        roughness: 0.35,
        metalness: 0.4
      });

      for (let i = 0; i < nodesPerTier; i++) {
        const angle = (i / nodesPerTier) * Math.PI * 2;
        const mesh = new THREE.Mesh(nodeGeo, nodeMat);
        mesh.position.set(Math.cos(angle) * radius, yPos, Math.sin(angle) * radius);
        tierGroup.add(mesh);
      }

      this.transformerGroup.add(tierGroup);
    }

    this.transformerGroup.position.set(0, -160, 0);
    this.scene.add(this.transformerGroup);
  }

  private buildAICore(): void {
    this.aiCoreGroup = new THREE.Group();

    // Core icosahedron — warm indigo wireframe
    const coreGeo = new THREE.IcosahedronGeometry(2.5, 3);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x4F5D95,
      roughness: 0.2,
      metalness: 0.5,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    this.aiCoreGroup.add(core);

    // Orbiting torus rings — warm gold / terracotta
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0xC9A227,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(4.2, 0.05, 16, 100), ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    this.aiCoreGroup.add(ring1);

    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xC65D3B,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(5.5, 0.05, 16, 100), ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    this.aiCoreGroup.add(ring2);

    this.aiCoreGroup.position.set(0, -200, 0);
    this.scene.add(this.aiCoreGroup);
  }

  private buildEarth(): void {
    this.earthGroup = new THREE.Group();

    // Globe — forest green wireframe
    const globeGeo = new THREE.SphereGeometry(3.5, 32, 32);
    const globeMat = new THREE.MeshStandardMaterial({
      color: 0x3A7D44,
      roughness: 0.5,
      metalness: 0.4,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    this.earthGroup.add(globe);

    // Inner soft sphere
    const innerGeo = new THREE.SphereGeometry(3.3, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x1A3820,
      transparent: true,
      opacity: 0.3
    });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    this.earthGroup.add(inner);

    this.earthGroup.position.set(0, -250, 0);
    this.scene.add(this.earthGroup);
  }

  private onWindowResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private onMouseMove(event: MouseEvent): void {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    if (Math.abs(this.camera.position.y - (-35)) < 15) {
      this.raycaster.setFromCamera(this.mouse, this.camera);
      const intersects = this.raycaster.intersectObjects(this.tokenMeshes.map(tm => tm.mesh));

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        if (this.hoveredCube !== hitMesh) {
          this.resetHoveredCube();
          this.hoveredCube = hitMesh;

          const found = this.tokenMeshes.find(tm => tm.mesh === hitMesh);
          if (found) {
            found.mesh.scale.set(1.25, 1.25, 1.25);
            // Highlight with warm gold on hover
            (found.mesh.material as THREE.MeshPhysicalMaterial).color.setHex(0xC9A227);
            document.body.style.cursor = 'pointer';
            if (this.onTokenHoverCallback) {
              this.onTokenHoverCallback(found.tokenData, event.clientX, event.clientY);
            }
          }
        }
      } else {
        if (this.hoveredCube) {
          this.resetHoveredCube();
          document.body.style.cursor = 'default';
          if (this.onTokenHoverCallback) {
            this.onTokenHoverCallback(null, 0, 0);
          }
        }
      }
    }
  }

  private onClick(event: MouseEvent): void {
    if (this.hoveredCube && this.onTokenClickCallback) {
      const found = this.tokenMeshes.find(tm => tm.mesh === this.hoveredCube);
      if (found) {
        this.onTokenClickCallback(found.tokenData);
      }
    }
  }

  private resetHoveredCube(): void {
    if (this.hoveredCube) {
      const found = this.tokenMeshes.find(tm => tm.mesh === this.hoveredCube);
      if (found) {
        found.mesh.scale.copy(found.originalScale);
        (found.mesh.material as THREE.MeshPhysicalMaterial).color.setHex(found.originalColor);
      }
      this.hoveredCube = null;
    }
  }

  public getCamera(): THREE.PerspectiveCamera { return this.camera; }
  public getScene(): THREE.Scene { return this.scene; }

  private animate(): void {
    if (!this.isRunning) return;
    requestAnimationFrame(this.animate.bind(this));

    const delta = this.clock.getDelta();
    const elapsed = this.clock.getElapsedTime();

    // Hero Particles — very slow, contemplative drift
    if (this.heroGroup) {
      this.heroGroup.rotation.y = elapsed * 0.015; // was 0.03
      this.heroGroup.rotation.x = Math.sin(elapsed * 0.025) * 0.06;
    }

    // Token Cubes — gentle slow rotation
    this.tokenMeshes.forEach((tm, idx) => {
      tm.mesh.rotation.y += delta * (0.12 + idx * 0.02); // was 0.3
      tm.mesh.rotation.x = Math.sin(elapsed * 0.5 + idx) * 0.12;
    });

    // Stemming Geometry — slower orbit
    if (this.stemGroup) {
      this.stemGroup.rotation.y = elapsed * 0.10; // was 0.2
      this.stemGroup.children.forEach((child, idx) => {
        if (idx > 0 && child.userData) {
          const u = child.userData;
          u.angle += delta * u.speed;
          const r = 3.2 + Math.sin(elapsed * 0.8 + idx) * 1.0;
          child.position.set(Math.cos(u.angle) * r, Math.sin(u.angle) * r, Math.sin(elapsed) * 0.8);
        }
      });
    }

    // Vector Space — very subtle sway
    if (this.vectorGroup) {
      this.vectorGroup.rotation.y = Math.sin(elapsed * 0.06) * 0.18;
    }

    // Transformer Network — slow stately rotation
    if (this.transformerGroup) {
      this.transformerGroup.rotation.y = elapsed * 0.07; // was 0.15
      this.transformerGroup.children.forEach((tier, idx) => {
        tier.rotation.z = Math.sin(elapsed * 0.3 + idx) * 0.07;
      });
    }

    // AI Core — slow, dignified
    if (this.aiCoreGroup) {
      this.aiCoreGroup.rotation.y = elapsed * 0.12; // was 0.25
      if (this.aiCoreGroup.children[1]) this.aiCoreGroup.children[1].rotation.z = elapsed * 0.2;
      if (this.aiCoreGroup.children[2]) this.aiCoreGroup.children[2].rotation.x = elapsed * 0.15;
    }

    // Earth — calm rotation
    if (this.earthGroup) {
      this.earthGroup.rotation.y = elapsed * 0.08; // was 0.15
      this.earthGroup.rotation.x = Math.sin(elapsed * 0.1) * 0.05;
    }

    this.renderer.render(this.scene, this.camera);
  }

  public destroy(): void {
    this.isRunning = false;
    window.removeEventListener('resize', this.onWindowResize.bind(this));
    window.removeEventListener('mousemove', this.onMouseMove.bind(this));
    window.removeEventListener('click', this.onClick.bind(this));

    this.scene.traverse((object) => {
      if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Line || object instanceof THREE.LineSegments) {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => {
              if (mat.map) mat.map.dispose();
              mat.dispose();
            });
          } else {
            if (object.material.map) object.material.map.dispose();
            object.material.dispose();
          }
        }
      }
    });

    if (this.renderer) {
      if (this.renderer.domElement && this.container.contains(this.renderer.domElement)) {
        this.container.removeChild(this.renderer.domElement);
      }
      this.renderer.dispose();
    }
  }
}

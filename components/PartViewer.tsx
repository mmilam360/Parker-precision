"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface PartViewerProps {
  scrollProgress: number;
  visible: boolean;
  isMobile?: boolean;
}

export default function PartViewer({ visible, isMobile = false }: PartViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const el = mountRef.current;
    const width = el.clientWidth;
    const height = el.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.8;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(isMobile ? 1.5 : 1.5, 1.0, isMobile ? 6 : 5.5);
    camera.lookAt(0, 0, 0);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 1.5));
    const key = new THREE.DirectionalLight(0xffffff, 5.0);
    key.position.set(4, 6, 5); key.castShadow = true;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xaabbcc, 2.5);
    fill.position.set(-5, -2, 3);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 2.5);
    rim.position.set(0, 4, -6);
    scene.add(rim);
    const bot = new THREE.DirectionalLight(0xffffff, 1.5);
    bot.position.set(0, -5, 2);
    scene.add(bot);

    // Steel PBR material — DoubleSide so inverted faces still render
    const steelMat = new THREE.MeshStandardMaterial({
      color: 0xc8cdd4,
      metalness: 0.85,
      roughness: 0.12,
      side: THREE.DoubleSide,
    });

    let part: THREE.Object3D | null = null;
    let animId = 0;

    // Random slow drift axes — changes direction smoothly over time
    const baseSpeed = isMobile ? 0.003 : 0.004;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (part) {
        const t = Date.now() * 0.0003;
        part.rotation.y += baseSpeed + Math.sin(t * 0.7) * 0.002;
        part.rotation.x += Math.sin(t * 0.4) * 0.001;
        part.rotation.z += Math.cos(t * 0.55) * 0.0008;
      }
      renderer.render(scene, camera);
    };

    (async () => {
      try {
        const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
        const { DRACOLoader } = await import("three/examples/jsm/loaders/DRACOLoader.js");

        const draco = new DRACOLoader();
        draco.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");

        const loader = new GLTFLoader();
        loader.setDRACOLoader(draco);

        loader.load(
          "/worm-gear.glb",
          (gltf) => {
            part = gltf.scene;

            part.traverse((child) => {
              if ((child as THREE.Mesh).isMesh) {
                (child as THREE.Mesh).material = steelMat;
                child.castShadow = true;
              }
            });

            // Center and scale
            const box = new THREE.Box3().setFromObject(part);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = (isMobile ? 3.5 : 4.8) / maxDim;
            part.scale.setScalar(scale);
            part.position.sub(center.multiplyScalar(scale));
            part.rotation.x = 0.2;
            part.rotation.y = 0.5;

            scene.add(part);
            animate();
            draco.dispose();
          },
          undefined,
          (err) => {
            console.error("GLB load error:", err);
            // Fallback to procedural worm gear if GLB fails
            loadProceduralGear(scene, steelMat, isMobile).then((g) => {
              part = g; animate();
            });
          }
        );
      } catch {
        const g = await loadProceduralGear(scene, steelMat, isMobile);
        part = g; animate();
      }
    })();

    const onResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{ opacity: visible ? 0.88 : 0, transition: "opacity 0.8s ease" }}
    />
  );
}

// Procedural fallback — renders if GLB fails to load
async function loadProceduralGear(
  scene: THREE.Scene,
  mat: THREE.Material,
  isMobile: boolean
): Promise<THREE.Group> {
  const boreMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, metalness: 0.2, roughness: 0.8 });
  const part = new THREE.Group();
  const gearGroup = new THREE.Group();

  gearGroup.add(Object.assign(new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.0, 0.7, 64), mat), { castShadow: true }));
  gearGroup.add(Object.assign(new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.55, 1.1, 32), mat), { castShadow: true }));
  gearGroup.add(new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 1.3, 16), boreMat));

  for (let i = 0; i < 32; i++) {
    const angle = (i / 32) * Math.PI * 2;
    const tooth = Object.assign(new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.65, 0.22), mat), { castShadow: true });
    tooth.position.set(Math.cos(angle) * 2.09, (i / 32) * 0.35 - 0.18, Math.sin(angle) * 2.09);
    tooth.rotation.y = -angle;
    gearGroup.add(tooth);
  }

  const wormGroup = new THREE.Group();
  wormGroup.add(Object.assign(new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 4.5, 24), mat), { castShadow: true }));
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= 144; i++) {
    const t = i / 144; const a = t * Math.PI * 2 * 6;
    pts.push(new THREE.Vector3(Math.cos(a) * 0.45, (t - 0.5) * 4.0, Math.sin(a) * 0.45));
  }
  wormGroup.add(Object.assign(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 144, 0.085, 8, false), mat), { castShadow: true }));
  wormGroup.rotation.z = Math.PI / 2;
  wormGroup.position.set(0, 2.35, 0);

  part.add(gearGroup, wormGroup);
  part.rotation.x = 0.2; part.rotation.y = 0.4;
  scene.add(part);
  return part;
}

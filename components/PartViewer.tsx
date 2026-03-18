"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface PartViewerProps {
  scrollProgress: number; // 0 to 1
  visible: boolean;
  isMobile?: boolean;
}

export default function PartViewer({ scrollProgress, visible, isMobile = false }: PartViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    part: THREE.Group;
    animId: number;
  } | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const el = mountRef.current;
    const width = el.clientWidth;
    const height = el.clientHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    el.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const cameraZ = isMobile ? 8 : 6;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 2.5, cameraZ);
    camera.lookAt(0, 0, 0);

    // Lighting — dramatic product render quality
    const ambient = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 4.0);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x990000, 2.0);
    fillLight.position.set(-4, -2, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x4488ff, 1.5);
    rimLight.position.set(0, 3, -5);
    scene.add(rimLight);

    const hotSpot = new THREE.PointLight(0xffffff, 2.0);
    hotSpot.position.set(0, 2, 3);
    scene.add(hotSpot);

    // ---- MATERIALS ----
    const mainMat = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      metalness: 0.85,
      roughness: 0.12,
      envMapIntensity: 1.2,
    });

    const cutoutMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.3,
      roughness: 0.8,
    });

    // ---- BUILD SLOTTED VALVE DISC / ROTARY PLATE ----
    const part = new THREE.Group();

    // 1. Main disc
    const discGeo = new THREE.CylinderGeometry(2.0, 2.0, 0.18, 64);
    const disc = new THREE.Mesh(discGeo, mainMat);
    disc.castShadow = true;
    part.add(disc);

    // 2. Hub collar (base of hub)
    const collarGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.12, 32);
    const collar = new THREE.Mesh(collarGeo, mainMat);
    collar.position.set(0, 0.15, 0);
    collar.castShadow = true;
    part.add(collar);

    // 3. Central hub
    const hubGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.38, 32);
    const hub = new THREE.Mesh(hubGeo, mainMat);
    hub.position.set(0, 0.28, 0);
    hub.castShadow = true;
    part.add(hub);

    // 4. Center bore — dark material through center
    const boreGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.5, 16);
    const bore = new THREE.Mesh(boreGeo, cutoutMat);
    bore.position.set(0, 0.25, 0);
    part.add(bore);

    // 5. Radial slots — 6 slots evenly spaced (60° apart)
    const slotCount = 6;
    for (let i = 0; i < slotCount; i++) {
      const angle = (i / slotCount) * Math.PI * 2;
      const slotGeo = new THREE.BoxGeometry(0.22, 0.25, 0.9);
      const slot = new THREE.Mesh(slotGeo, cutoutMat);
      const r = 1.2;
      slot.position.set(Math.cos(angle) * r, 0, Math.sin(angle) * r);
      slot.rotation.y = -angle;
      part.add(slot);
    }

    // 6. Outer chamfer ring
    const outerChamferGeo = new THREE.TorusGeometry(1.95, 0.04, 8, 64);
    const outerChamfer = new THREE.Mesh(outerChamferGeo, mainMat);
    outerChamfer.rotation.x = Math.PI / 2;
    outerChamfer.position.y = 0.09;
    outerChamfer.castShadow = true;
    part.add(outerChamfer);

    // 7. Inner chamfer ring (around hub base)
    const innerChamferGeo = new THREE.TorusGeometry(0.56, 0.03, 8, 64);
    const innerChamfer = new THREE.Mesh(innerChamferGeo, mainMat);
    innerChamfer.rotation.x = Math.PI / 2;
    innerChamfer.position.y = 0.09;
    part.add(innerChamfer);

    // 8. Mounting bolt holes — 6 small dark cylinders at r=1.6, alternating between slots
    const boltCount = 6;
    for (let i = 0; i < boltCount; i++) {
      const angle = ((i + 0.5) / boltCount) * Math.PI * 2; // offset by half step
      const boltGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.25, 12);
      const bolt = new THREE.Mesh(boltGeo, cutoutMat);
      const r = 1.6;
      bolt.position.set(Math.cos(angle) * r, 0, Math.sin(angle) * r);
      part.add(bolt);
    }

    scene.add(part);

    // Animate — constantly spinning, smooth and hypnotic
    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = Date.now() * 0.001;
      part.rotation.y += 0.008;
      part.rotation.x = Math.sin(t * 0.3) * 0.18;
      part.rotation.z = Math.sin(t * 0.2) * 0.08;
      renderer.render(scene, camera);
    };
    animate();

    sceneRef.current = { renderer, scene, camera, part, animId };

    const onResize = () => {
      if (!mountRef.current || !sceneRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      sceneRef.current.camera.aspect = w / h;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      sceneRef.current = null;
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{
        opacity: visible ? 0.85 : 0,
        transition: "opacity 0.8s ease",
      }}
    />
  );
}

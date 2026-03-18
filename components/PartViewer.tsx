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
  const scrollRef = useRef(scrollProgress);

  useEffect(() => {
    scrollRef.current = scrollProgress;
    if (sceneRef.current) {
      // scroll-driven Y is handled in the animation loop
    }
  }, [scrollProgress]);

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

    // Camera — pulled back on mobile so part is fully visible
    const cameraZ = isMobile ? 9 : 5;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, cameraZ);
    camera.lookAt(0, 0, 0);

    // Lighting — dramatic industrial feel
    const ambient = new THREE.AmbientLight(0xffffff, 0.25);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 4.0);
    keyLight.position.set(5, 8, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x990000, 2.0);
    fillLight.position.set(-5, -3, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xaabbff, 1.5);
    rimLight.position.set(0, 3, -6);
    scene.add(rimLight);

    // ---- MATERIALS ----
    const mat = new THREE.MeshStandardMaterial({
      color: 0xC0C0C0,
      metalness: 0.8,
      roughness: 0.15,
    });

    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.6,
      roughness: 0.3,
    });

    // ---- BUILD CENTRIFUGAL IMPELLER / TURBINE WHEEL ----
    const part = new THREE.Group();

    // Back plate (flat disc)
    const backPlateGeo = new THREE.CylinderGeometry(1.6, 1.6, 0.08, 64);
    const backPlate = new THREE.Mesh(backPlateGeo, mat);
    backPlate.castShadow = true;
    part.add(backPlate);

    // Central hub
    const hubGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 32);
    const hub = new THREE.Mesh(hubGeo, mat);
    hub.position.set(0, 0.19, 0);
    hub.castShadow = true;
    part.add(hub);

    // 7 swept blades radiating from hub
    const bladeCount = 7;
    for (let i = 0; i < bladeCount; i++) {
      const angle = (i / bladeCount) * Math.PI * 2;
      const bladeGeo = new THREE.BoxGeometry(0.15, 0.5, 0.08);
      const blade = new THREE.Mesh(bladeGeo, mat);
      blade.castShadow = true;
      // Position at mid-radius between hub and outer ring
      const r = 0.95;
      blade.position.set(
        Math.cos(angle) * r,
        0.14,
        Math.sin(angle) * r
      );
      // Rotate around Y to align with radial direction, then sweep
      blade.rotation.y = -angle + Math.PI / 2;
      // Slight forward sweep (angled blade look)
      blade.rotation.x = 0.26; // ~15 degrees
      part.add(blade);
    }

    // Outer shroud ring
    const torusGeo = new THREE.TorusGeometry(1.55, 0.06, 8, 64);
    const torus = new THREE.Mesh(torusGeo, mat);
    torus.rotation.x = Math.PI / 2;
    torus.position.y = 0.1;
    torus.castShadow = true;
    part.add(torus);

    // Center bore (mounting hole through hub)
    const boreGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.5, 16);
    const bore = new THREE.Mesh(boreGeo, darkMat);
    bore.position.set(0, 0.15, 0);
    part.add(bore);

    // Edge highlight lines on back plate
    const edgesMat = new THREE.LineBasicMaterial({ color: 0xdddddd, linewidth: 1 });
    const edgesGeo = new THREE.EdgesGeometry(backPlateGeo);
    const edges = new THREE.LineSegments(edgesGeo, edgesMat);
    part.add(edges);

    // Slight initial tilt for a nice 3/4 view
    part.rotation.x = 0.3;
    scene.add(part);

    // Animate — multi-axis rotation
    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const now = Date.now();
      const sp = scrollRef.current;
      part.rotation.y = sp * Math.PI * 4;
      part.rotation.x = 0.3 + Math.sin(now * 0.0003) * 0.25;
      part.rotation.z = Math.sin(now * 0.0002) * 0.12;
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

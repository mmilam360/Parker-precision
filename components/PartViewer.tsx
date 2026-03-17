"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface PartViewerProps {
  scrollProgress: number; // 0 to 1
  visible: boolean;
}

export default function PartViewer({ scrollProgress, visible }: PartViewerProps) {
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

    // Camera — closer for full-bleed look
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5);
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

    // Materials
    const mat = new THREE.MeshStandardMaterial({
      color: 0xb0b0b0,
      metalness: 0.75,
      roughness: 0.22,
    });

    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.6,
      roughness: 0.3,
    });

    const stepMat = new THREE.MeshStandardMaterial({
      color: 0x989898,
      metalness: 0.75,
      roughness: 0.28,
    });

    // ---- BUILD CNC MACHINED BRACKET/HOUSING ----
    const part = new THREE.Group();

    // Main body: rectangular block (2.5 × 1.2 × 3.5)
    const bodyGeo = new THREE.BoxGeometry(2.5, 1.2, 3.5);
    const body = new THREE.Mesh(bodyGeo, mat);
    body.castShadow = true;
    part.add(body);

    // Stepped section on top (inset, smaller box)
    const stepGeo = new THREE.BoxGeometry(1.8, 0.5, 2.6);
    const step = new THREE.Mesh(stepGeo, stepMat);
    step.position.set(0, 0.85, 0);
    step.castShadow = true;
    part.add(step);

    // Central bore through middle (Z axis) — dark cylinder
    const boreGeo = new THREE.CylinderGeometry(0.28, 0.28, 3.6, 32);
    const bore = new THREE.Mesh(boreGeo, darkMat);
    bore.rotation.x = Math.PI / 2;
    part.add(bore);

    // 4 mounting holes on corners (through body, Z direction)
    const cornerOffsets = [
      [-0.9, -1.35],
      [0.9, -1.35],
      [-0.9, 1.35],
      [0.9, 1.35],
    ];
    for (const [x, z] of cornerOffsets) {
      const holeGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.3, 20);
      const hole = new THREE.Mesh(holeGeo, darkMat);
      hole.rotation.x = Math.PI / 2;
      hole.position.set(x, 0, z);
      part.add(hole);
      // Counterbore ring (wider shallow cylinder on top face)
      const cbGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.15, 20);
      const cb = new THREE.Mesh(cbGeo, darkMat);
      cb.position.set(x, 0.6, z);
      part.add(cb);
    }

    // 2 side ribs (structural detail on long sides)
    for (const side of [-1.28, 1.28]) {
      const ribGeo = new THREE.BoxGeometry(0.14, 1.0, 2.8);
      const rib = new THREE.Mesh(ribGeo, mat);
      rib.position.set(side, -0.1, 0);
      rib.castShadow = true;
      part.add(rib);
    }

    // Boss features (raised circular pads) on front face
    for (const bossPos of [[-0.7, 0.2], [0.7, 0.2], [0, -0.35]]) {
      const bossGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.12, 24);
      const boss = new THREE.Mesh(bossGeo, stepMat);
      boss.rotation.x = Math.PI / 2;
      boss.position.set(bossPos[0], bossPos[1], 1.76);
      part.add(boss);
      // Boss hole
      const bHoleGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.16, 16);
      const bHole = new THREE.Mesh(bHoleGeo, darkMat);
      bHole.rotation.x = Math.PI / 2;
      bHole.position.set(bossPos[0], bossPos[1], 1.77);
      part.add(bHole);
    }

    // Chamfer simulation: thin inset face outlines (EdgesGeometry)
    const edgesGeo = new THREE.EdgesGeometry(bodyGeo);
    const edgesMat = new THREE.LineBasicMaterial({ color: 0xdddddd, linewidth: 1 });
    const edges = new THREE.LineSegments(edgesGeo, edgesMat);
    part.add(edges);

    const stepEdgesGeo = new THREE.EdgesGeometry(stepGeo);
    const stepEdges = new THREE.LineSegments(stepEdgesGeo, edgesMat);
    stepEdges.position.copy(step.position);
    part.add(stepEdges);

    // Slight initial tilt for a nice 3/4 view
    part.rotation.x = 0.25;
    scene.add(part);

    // Animate — multi-axis rotation
    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const now = Date.now();
      const sp = scrollRef.current;
      part.rotation.y = sp * Math.PI * 4;
      part.rotation.x = 0.25 + Math.sin(now * 0.0003) * 0.3;
      part.rotation.z = Math.sin(now * 0.0002) * 0.15;
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

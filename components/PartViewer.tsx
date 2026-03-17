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
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 7);
    camera.lookAt(0, 0, 0);

    // Lighting — dramatic industrial feel
    const ambient = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambient);

    // Main key light — top right white
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
    keyLight.position.set(4, 6, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    scene.add(keyLight);

    // Maroon fill light — bottom left
    const fillLight = new THREE.DirectionalLight(0x990000, 1.8);
    fillLight.position.set(-4, -3, 2);
    scene.add(fillLight);

    // Rim light — behind, cool
    const rimLight = new THREE.DirectionalLight(0xaabbff, 1.2);
    rimLight.position.set(0, 2, -5);
    scene.add(rimLight);

    // Material — industrial gray plastic
    const mat = new THREE.MeshStandardMaterial({
      color: 0x787878,
      metalness: 0.35,
      roughness: 0.38,
      envMapIntensity: 1.0,
    });

    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x3a3a3a,
      metalness: 0.5,
      roughness: 0.3,
    });

    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x880000,
      metalness: 0.6,
      roughness: 0.25,
      emissive: 0x330000,
      emissiveIntensity: 0.3,
    });

    // Build the part — a precision flanged connector/housing
    const part = new THREE.Group();

    // Main body cylinder
    const bodyGeo = new THREE.CylinderGeometry(1.0, 1.0, 2.2, 48, 1);
    const body = new THREE.Mesh(bodyGeo, mat);
    body.castShadow = true;
    part.add(body);

    // Top flange
    const topFlangeGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.22, 48);
    const topFlange = new THREE.Mesh(topFlangeGeo, mat);
    topFlange.position.y = 1.21;
    topFlange.castShadow = true;
    part.add(topFlange);

    // Bottom flange
    const botFlangeGeo = new THREE.CylinderGeometry(1.5, 1.5, 0.22, 48);
    const botFlange = new THREE.Mesh(botFlangeGeo, mat);
    botFlange.position.y = -1.21;
    botFlange.castShadow = true;
    part.add(botFlange);

    // Inner bore
    const boreGeo = new THREE.CylinderGeometry(0.55, 0.55, 2.7, 32);
    const bore = new THREE.Mesh(boreGeo, darkMat);
    bore.castShadow = false;
    part.add(bore);

    // Mounting holes on top flange (6 holes)
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const holeGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.3, 16);
      const hole = new THREE.Mesh(holeGeo, darkMat);
      hole.position.set(Math.cos(angle) * 1.25, 1.21, Math.sin(angle) * 1.25);
      hole.rotation.x = Math.PI / 2;
      part.add(hole);
    }

    // Mounting holes on bottom flange
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2 + Math.PI / 6;
      const holeGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.3, 16);
      const hole = new THREE.Mesh(holeGeo, darkMat);
      hole.position.set(Math.cos(angle) * 1.25, -1.21, Math.sin(angle) * 1.25);
      hole.rotation.x = Math.PI / 2;
      part.add(hole);
    }

    // Ribs on body (6 ribs)
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const ribGeo = new THREE.BoxGeometry(0.12, 2.0, 0.18);
      const rib = new THREE.Mesh(ribGeo, mat);
      rib.position.set(Math.cos(angle) * 1.0, 0, Math.sin(angle) * 1.0);
      rib.rotation.y = -angle;
      rib.castShadow = true;
      part.add(rib);
    }

    // Center accent ring
    const ringGeo = new THREE.TorusGeometry(1.0, 0.08, 16, 64);
    const ring = new THREE.Mesh(ringGeo, accentMat);
    ring.rotation.x = Math.PI / 2;
    part.add(ring);

    // Second accent ring
    const ring2Geo = new THREE.TorusGeometry(1.0, 0.05, 12, 64);
    const ring2 = new THREE.Mesh(ring2Geo, accentMat);
    ring2.rotation.x = Math.PI / 2;
    ring2.position.y = 0.6;
    part.add(ring2);

    const ring3 = new THREE.Mesh(ring2Geo.clone(), accentMat);
    ring3.rotation.x = Math.PI / 2;
    ring3.position.y = -0.6;
    part.add(ring3);

    // Slight tilt for 3/4 view
    part.rotation.x = 0.3;
    scene.add(part);

    // Shadow plane (subtle)
    const planeGeo = new THREE.PlaneGeometry(12, 12);
    const planeMat = new THREE.ShadowMaterial({ opacity: 0.2 });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -2.0;
    plane.receiveShadow = true;
    scene.add(plane);

    // Animate
    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    sceneRef.current = { renderer, scene, camera, part, animId };

    // Resize handler
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

  // Update rotation based on scroll
  useEffect(() => {
    if (!sceneRef.current) return;
    const { part } = sceneRef.current;
    part.rotation.y = scrollProgress * Math.PI * 3;
  }, [scrollProgress]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease",
      }}
    />
  );
}

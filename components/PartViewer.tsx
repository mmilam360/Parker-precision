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
    renderer.toneMappingExposure = 1.5;
    el.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const cameraZ = isMobile ? 7 : 9;
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(2.5, 2.0, cameraZ);
    camera.lookAt(0, 0, 0);

    // ── Lighting ───────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    const keyLight = new THREE.DirectionalLight(0xffffff, 5.0);
    keyLight.position.set(4, 6, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x8899bb, 1.5);
    fillLight.position.set(-5, -2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 2.0);
    rimLight.position.set(0, 4, -6);
    scene.add(rimLight);

    const topSpot = new THREE.PointLight(0xffffff, 3.5);
    topSpot.position.set(0, 5, 2);
    scene.add(topSpot);

    // ── Materials ──────────────────────────────────────────
    // Steel / machined metal — slightly warm silver
    const steelMat = new THREE.MeshStandardMaterial({
      color: 0xc8cdd4,
      metalness: 0.85,
      roughness: 0.12,
      envMapIntensity: 1.0,
    });

    // Slightly darker for gear teeth / recessed faces
    const teethMat = new THREE.MeshStandardMaterial({
      color: 0xa8b0b8,
      metalness: 0.90,
      roughness: 0.18,
    });

    // Dark bore / hole material
    const boreMat = new THREE.MeshStandardMaterial({
      color: 0x2a2a2a,
      metalness: 0.2,
      roughness: 0.8,
    });

    // ── Build Worm Gear ────────────────────────────────────
    const part = new THREE.Group();

    // --- WORM GEAR (large helical gear wheel) ---
    const gearGroup = new THREE.Group();

    // Gear body disc
    const gearBodyGeo = new THREE.CylinderGeometry(2.0, 2.0, 0.7, 64);
    const gearBody = new THREE.Mesh(gearBodyGeo, steelMat);
    gearBody.castShadow = true;
    gearGroup.add(gearBody);

    // Hub (center boss)
    const hubGeo = new THREE.CylinderGeometry(0.5, 0.55, 1.1, 32);
    const hub = new THREE.Mesh(hubGeo, steelMat);
    hub.castShadow = true;
    gearGroup.add(hub);

    // Keyway bore (center hole)
    const boreGeo = new THREE.CylinderGeometry(0.22, 0.22, 1.3, 16);
    const bore = new THREE.Mesh(boreGeo, boreMat);
    gearGroup.add(bore);

    // Spoke web (flat disc between hub and rim, slightly recessed)
    const webGeo = new THREE.CylinderGeometry(2.0, 2.0, 0.28, 64);
    const web = new THREE.Mesh(webGeo, steelMat);
    gearGroup.add(web);

    // Lightening holes (4 holes in the web)
    const numHoles = 4;
    for (let i = 0; i < numHoles; i++) {
      const angle = (i / numHoles) * Math.PI * 2 + Math.PI / numHoles;
      const holeGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.35, 24);
      const hole = new THREE.Mesh(holeGeo, boreMat);
      hole.position.set(Math.cos(angle) * 1.2, 0, Math.sin(angle) * 1.2);
      gearGroup.add(hole);
    }

    // Gear teeth — helical tooth profile around the outer rim
    // Using thin rectangular prisms arranged radially, rotated slightly for helix effect
    const toothCount = 32;
    const toothW = 0.18;
    const toothH = 0.22;
    const toothD = 0.65;
    const gearR = 2.0;

    for (let i = 0; i < toothCount; i++) {
      const angle = (i / toothCount) * Math.PI * 2;
      // Helical twist offset — each tooth rotated slightly around Y based on its position
      const helixTwist = (i / toothCount) * 0.35;

      const toothGeo = new THREE.BoxGeometry(toothW, toothD, toothH);
      const tooth = new THREE.Mesh(toothGeo, teethMat);

      // Position at rim
      tooth.position.set(
        Math.cos(angle) * (gearR + toothH / 2 - 0.02),
        helixTwist - 0.18, // helix offset in Y
        Math.sin(angle) * (gearR + toothH / 2 - 0.02)
      );
      // Rotate to face outward
      tooth.rotation.y = -angle;
      tooth.castShadow = true;
      gearGroup.add(tooth);
    }

    // Chamfer rings on gear edges (decorative machined edge)
    const chamfer1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.98, 0.05, 8, 64),
      steelMat
    );
    chamfer1.rotation.x = Math.PI / 2;
    chamfer1.position.y = 0.35;
    gearGroup.add(chamfer1);

    const chamfer2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.98, 0.05, 8, 64),
      steelMat
    );
    chamfer2.rotation.x = Math.PI / 2;
    chamfer2.position.y = -0.35;
    gearGroup.add(chamfer2);

    // Hub chamfer rings
    const hubChamfer1 = new THREE.Mesh(
      new THREE.TorusGeometry(0.52, 0.03, 8, 32),
      steelMat
    );
    hubChamfer1.rotation.x = Math.PI / 2;
    hubChamfer1.position.y = 0.55;
    gearGroup.add(hubChamfer1);

    const hubChamfer2 = new THREE.Mesh(
      new THREE.TorusGeometry(0.52, 0.03, 8, 32),
      steelMat
    );
    hubChamfer2.rotation.x = Math.PI / 2;
    hubChamfer2.position.y = -0.55;
    gearGroup.add(hubChamfer2);

    // --- WORM SHAFT (the driving worm screw) ---
    const wormGroup = new THREE.Group();

    // Shaft body
    const shaftGeo = new THREE.CylinderGeometry(0.22, 0.22, 4.5, 24);
    const shaft = new THREE.Mesh(shaftGeo, steelMat);
    shaft.castShadow = true;
    wormGroup.add(shaft);

    // Worm thread (helical coil around the shaft)
    const threadTurns = 6;
    const threadSegs = threadTurns * 24;
    const threadCurvePoints: THREE.Vector3[] = [];

    for (let i = 0; i <= threadSegs; i++) {
      const t = i / threadSegs;
      const angle = t * Math.PI * 2 * threadTurns;
      const y = (t - 0.5) * 4.0;
      threadCurvePoints.push(
        new THREE.Vector3(
          Math.cos(angle) * 0.45,
          y,
          Math.sin(angle) * 0.45
        )
      );
    }

    const threadCurve = new THREE.CatmullRomCurve3(threadCurvePoints);
    const threadGeo = new THREE.TubeGeometry(threadCurve, threadSegs, 0.085, 8, false);
    const thread = new THREE.Mesh(threadGeo, teethMat);
    thread.castShadow = true;
    wormGroup.add(thread);

    // Shaft collars / shoulders
    for (const yPos of [-1.8, 1.8]) {
      const collarGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.15, 24);
      const collar = new THREE.Mesh(collarGeo, steelMat);
      collar.position.y = yPos;
      wormGroup.add(collar);
    }

    // Shaft ends (turned down diameter)
    for (const yPos of [-2.1, 2.1]) {
      const endGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.5, 16);
      const end = new THREE.Mesh(endGeo, steelMat);
      end.position.y = yPos;
      wormGroup.add(end);
    }

    // Position worm shaft perpendicular to gear, meshing at the rim
    wormGroup.rotation.z = Math.PI / 2; // lay horizontal
    wormGroup.position.set(0, 2.35, 0);  // sit on top of gear rim

    // Assemble
    part.add(gearGroup);
    part.add(wormGroup);

    // Tilt whole assembly for dramatic presentation angle
    part.rotation.x = 0.2;
    part.rotation.y = 0.4;

    scene.add(part);

    // ── Animation ──────────────────────────────────────────
    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const speed = isMobile ? 0.004 : 0.005;
      // Gear rotates around Y axis
      gearGroup.rotation.y += speed;
      // Worm shaft rotates around its own (now horizontal) axis in sync
      // 1 tooth advance per gear tooth = shaft turns toothCount times per gear revolution
      // visual approximation: worm turns faster
      wormGroup.rotation.x += speed * toothCount * 0.08;
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
        opacity: visible ? 0.88 : 0,
        transition: "opacity 0.8s ease",
      }}
    />
  );
}

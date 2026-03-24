"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface PartViewerProps {
  scrollProgress: number;
  visible: boolean;
  isMobile?: boolean;
}

export default function PartViewer({ scrollProgress, visible, isMobile = false }: PartViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
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

    // Scene + Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 200);
    camera.position.set(0, 40, 120);
    camera.lookAt(0, 0, 0);

    // Lighting — dramatic product-render quality
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const keyLight = new THREE.DirectionalLight(0xffffff, 5.0);
    keyLight.position.set(60, 100, 80);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x8899bb, 1.8);
    fillLight.position.set(-80, -30, 50);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 2.2);
    rimLight.position.set(0, 60, -100);
    scene.add(rimLight);

    const topSpot = new THREE.PointLight(0xffffff, 4.0);
    topSpot.position.set(0, 80, 40);
    scene.add(topSpot);

    // Steel PBR material — applied to all loaded meshes
    const steelMat = new THREE.MeshStandardMaterial({
      color: 0xc8cdd4,
      metalness: 0.88,
      roughness: 0.12,
      envMapIntensity: 1.2,
    });

    // Load GLB
    const loader = new GLTFLoader();
    let part: THREE.Group | null = null;
    let animId = 0;

    loader.load(
      "/models/worm-gear.glb",
      (gltf) => {
        part = gltf.scene;

        // Override materials with steel
        part.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            (child as THREE.Mesh).material = steelMat;
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        // Center + scale the model
        const box = new THREE.Box3().setFromObject(part);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 80 / maxDim; // normalize to ~80 units
        part.scale.setScalar(scale);
        part.position.sub(center.multiplyScalar(scale));

        // Tilt for dramatic angle
        part.rotation.x = 0.3;
        part.rotation.y = 0.5;

        scene.add(part);

        // Animate — slow rotation
        const animate = () => {
          animId = requestAnimationFrame(animate);
          if (part) {
            part.rotation.y += isMobile ? 0.004 : 0.005;
          }
          renderer.render(scene, camera);
        };
        animate();
      },
      undefined,
      (error) => {
        console.error("GLB load error:", error);
        // Fallback: simple placeholder box so page doesn't break
        const fallback = new THREE.Mesh(
          new THREE.BoxGeometry(20, 20, 20),
          steelMat
        );
        scene.add(fallback);
        const animate = () => {
          animId = requestAnimationFrame(animate);
          fallback.rotation.y += 0.005;
          renderer.render(scene, camera);
        };
        animate();
      }
    );

    sceneRef.current = { renderer, animId };

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

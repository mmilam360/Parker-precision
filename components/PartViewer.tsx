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

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const cameraZ = isMobile ? 7 : 9;
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(2.5, 2.0, cameraZ);
    camera.lookAt(0, 0, 0);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const key = new THREE.DirectionalLight(0xffffff, 5.0);
    key.position.set(4, 6, 5);
    key.castShadow = true;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x8899bb, 1.5);
    fill.position.set(-5, -2, 3);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xffffff, 2.0);
    rim.position.set(0, 4, -6);
    scene.add(rim);
    const top = new THREE.PointLight(0xffffff, 3.5);
    top.position.set(0, 5, 2);
    scene.add(top);

    // Steel material applied after load
    const steelMat = new THREE.MeshStandardMaterial({
      color: 0xc8cdd4,
      metalness: 0.88,
      roughness: 0.10,
    });

    let part: THREE.Object3D | null = null;
    let animId = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (part) part.rotation.y += isMobile ? 0.004 : 0.005;
      renderer.render(scene, camera);
    };

    // Load the GLB
    import("three/examples/jsm/loaders/GLTFLoader.js").then(({ GLTFLoader }) => {
      const loader = new GLTFLoader();
      loader.load(
        "/worm-gear.glb",
        (gltf) => {
          part = gltf.scene;

          // Apply steel material to every mesh
          part.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              (child as THREE.Mesh).material = steelMat;
              child.castShadow = true;
            }
          });

          // Center and scale to fit nicely
          const box = new THREE.Box3().setFromObject(part);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 4.0 / maxDim;
          part.scale.setScalar(scale);
          part.position.sub(center.multiplyScalar(scale));

          // Tilt for a nice presentation angle
          part.rotation.x = 0.25;
          part.rotation.y = 0.4;

          scene.add(part);
          animate();
        },
        undefined,
        (err) => {
          console.error("GLB load failed:", err);
          // Fallback: simple placeholder cube so scene isn't blank
          const fallback = new THREE.Mesh(
            new THREE.BoxGeometry(2, 2, 2),
            steelMat
          );
          part = fallback;
          scene.add(fallback);
          animate();
        }
      );
    });

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

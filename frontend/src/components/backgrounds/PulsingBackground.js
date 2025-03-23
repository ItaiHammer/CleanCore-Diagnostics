import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import './Background.css';

function PulsingPlane() {
  const meshRef = useRef();
  const plane = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(300, 300, 64, 64); // Further increase the size of the plane
    const material = new THREE.MeshBasicMaterial({ color: 0x3a3b3f, wireframe: true });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(-20, 0, 0); // Adjust the plane position slightly more to the left
    return mesh;
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const position = plane.geometry.attributes.position;
    const amplitude = 2;
    const frequency = 0.5; // Make the pulses less frequent
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i);
      const y = position.getY(i);
      const distance = Math.sqrt(x * x + y * y);
      const z = amplitude * Math.sin(distance * frequency - time);
      position.setZ(i, z);
    }
    position.needsUpdate = true;
  });

  return <primitive ref={meshRef} object={plane} />;
}

function PulsingBackground() {
  const [antialias, setAntialias] = useState(false);
  const [powerPreference, setPowerPreference] = useState("high-performance");

  useEffect(() => {
    const fetchSettings = async () => {
      const antialias = await window.pywebview.api.App.get_config_value("antialias");
      const powerPreference = await window.pywebview.api.App.get_config_value("powerPreference");
      setAntialias(antialias);
      setPowerPreference(powerPreference);
    };

    fetchSettings();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3, ease: 'easeInOut' }}
      className="background-container">
      <Canvas camera={{ position: [0, 0, 100], fov: 75 }} gl={{ alpha: true, powerPreference, antialias }}>
        <ambientLight intensity={0.5} />
        <PulsingPlane />
      </Canvas>
    </motion.div>
  );
}

export default PulsingBackground;

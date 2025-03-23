import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import './Background.css';

function StructuredSquares() {
  const meshRef = useRef();
  const squares = useMemo(() => {
    const geometries = [];
    const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x3a3b3f, wireframe: true });
    const solidMaterial = new THREE.MeshBasicMaterial({ color: 0x3a3b3f });

    for (let x = -100; x <= 100; x += 5) {
      for (let y = -100; y <= 100; y += 5) {
        const geometry = new THREE.BoxGeometry(4, 4, 4);
        const mesh = new THREE.Mesh(geometry, wireframeMaterial);
        mesh.position.set(x, y, 0);
        geometries.push(mesh);
      }
    }

    return geometries;
  }, []);

  useFrame(() => {
    squares.forEach((square) => {
      if (Math.random() < 0.0001) {
        square.material = square.material.wireframe ? new THREE.MeshBasicMaterial({ color: 0x3a3b3f }) : new THREE.MeshBasicMaterial({ color: 0x3a3b3f, wireframe: true });
      }
      square.position.z += Math.sin(Date.now() * 0.001) * 0.01;
    });
  });

  return (
    <group ref={meshRef}>
      {squares.map((square, index) => (
        <primitive key={index} object={square} />
      ))}
    </group>
  );
}

function StructuredSquaresBackground() {
  const [antialias, setAntialias] = useState(false);
  const [powerPreference, setPowerPreference] = useState("high-performance");

  useEffect(() => {
    const fetchSettings = async () => {
      const antialias = await window.pywebview.api.App.ConfigManager.get_config_value("antialias");
      const powerPreference = await window.pywebview.api.App.ConfigManager.get_config_value("powerPreference");
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
      <Canvas camera={{ position: [0, 0, 50], fov: 75 }} gl={{ alpha: true, powerPreference, antialias }}>
        <ambientLight intensity={0.5} />
        <StructuredSquares />
      </Canvas>
    </motion.div>
  );
}

export default StructuredSquaresBackground;

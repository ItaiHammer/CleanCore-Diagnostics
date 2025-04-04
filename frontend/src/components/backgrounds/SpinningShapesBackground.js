import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import './Background.css';

function WireframeShapes() {
  const meshRef = useRef();
  const shapes = useMemo(() => {
    const geometries = [];
    const material = new THREE.MeshBasicMaterial({ color: 0x3a3b3f, wireframe: true });

    for (let i = 0; i < 50; i++) {
      let geometry;
      const shapeType = Math.floor(Math.random() * 3);
      switch (shapeType) {
        case 0:
          geometry = new THREE.BoxGeometry(10, 10, 10);
          break;
        case 1:
          geometry = new THREE.ConeGeometry(5, 20, 32);
          break;
        case 2:
          geometry = new THREE.TetrahedronGeometry(10);
          break;
        default:
          geometry = new THREE.BoxGeometry(10, 10, 10);
      }
      const mesh = new THREE.Mesh(geometry, material);
      let x, y, z;
      do {
        x = (Math.random() - 0.5) * 200;
        y = (Math.random() - 0.5) * 200;
        z = (Math.random() - 0.5) * 200;
      } while (Math.abs(x) < 50 && y > 0 && y < 50 && Math.abs(z) < 50);

      mesh.position.set(x, y, z);
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      geometries.push(mesh);
    }

    return geometries;
  }, []);

  useFrame(() => {
    shapes.forEach((shape) => {
      shape.rotation.x += 0.01;
      shape.rotation.y += 0.01;
    });
  });

  return (
    <group ref={meshRef}>
      {shapes.map((shape, index) => (
        <primitive key={index} object={shape} />
      ))}
    </group>
  );
}

function NewBackground() {
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
      <Canvas camera={{ position: [0, 0, 100], fov: 75 }} gl={{ alpha: true, powerPreference, antialias }}>
        <ambientLight intensity={0.5} />
        <WireframeShapes />
      </Canvas>
    </motion.div>
  );
}

export default NewBackground;

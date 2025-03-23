import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import './Background.css';

function createGearGeometry(radius, teeth, toothDepth) {
  const shape = new THREE.Shape();
  const angle = Math.PI / teeth;

  for (let i = 0; i < 2 * teeth; i++) {
    const r = i % 2 === 0 ? radius : radius - toothDepth;
    const a = i * angle;
    shape.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }

  const extrudeSettings = {
    steps: 2,
    depth: 2,
    bevelEnabled: true,
    bevelThickness: 1,
    bevelSize: 1,
    bevelSegments: 2
  };

  return new THREE.ExtrudeGeometry(shape, extrudeSettings);
}

function SpinningGears() {
  const meshRef = useRef();
  const gears = useMemo(() => {
    const geometries = [];
    const material = new THREE.MeshBasicMaterial({ color: 0x3a3b3f, wireframe: true });

    const createGearGroup = (x, y, z, count) => {
      for (let i = 0; i < count; i++) {
        const radius = Math.random() * 5 + 5; // Varying sizes
        const teeth = Math.floor(Math.random() * 10) + 10;
        const geometry = createGearGeometry(radius, teeth, 2);
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(x, y, z);
        mesh.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );

        // Ensure most gears face the camera
        if (Math.random() > 0.5) {
          mesh.rotation.x = Math.PI / 2;
        }

        geometries.push(mesh);

        // Calculate the next gear position to touch the current gear
        const angle = Math.random() * Math.PI * 2;
        x += (radius + 10) * Math.cos(angle); // Consistently spaced out
        y += (radius + 10) * Math.sin(angle); // Consistently spaced out
      }
    };

    // Create multiple groups of gears
    for (let i = 0; i < 10; i++) { // Increase the number of groups
      createGearGroup(
        (Math.random() - 0.5) * 200, // More consistently spread out across the scene
        (Math.random() - 0.5) * 200, // More consistently spread out across the scene
        -50 + Math.random() * 100, // Ensure gears spawn in front of the camera
        Math.floor(Math.random() * 5) + 5 // Increase the number of gears per group
      );
    }

    return geometries;
  }, []);

  useFrame(() => {
    gears.forEach((gear) => {
      gear.rotation.z += 0.01; // Spin around the axis of rotation
    });
  });

  return (
    <group ref={meshRef}>
      {gears.map((gear, index) => (
        <primitive key={index} object={gear} />
      ))}
    </group>
  );
}

function SpinningGearsBackground() {
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
        <SpinningGears />
      </Canvas>
    </motion.div>
  );
}

export default SpinningGearsBackground;

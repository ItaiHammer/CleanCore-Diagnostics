import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import './Background.css';
import { motion } from 'framer-motion';

function WavyGrid() {
  const meshRef = useRef();
  const planeGeometry = React.useMemo(() => 
    new THREE.PlaneGeometry(80, 80, 80, 80), 
  []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const position = planeGeometry.attributes.position;
    const arr = position.array;
    
    if (performance.now() % 2 === 0) return;
    
    for (let i = 0; i < arr.length; i += 3) {
      arr[i + 2] = Math.sin(arr[i] * 0.4 + time) * 0.3;
    }
    
    position.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 1.4, 0, 0]}>
      <bufferGeometry attach="geometry" {...planeGeometry} />
      <meshBasicMaterial attach="material" color="#3b3e43" wireframe />
    </mesh>
  );
}

function VaporwaveBackground() {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 3, ease: 'easeInOut'  }}
    className="background-container">
      <Canvas camera={{ position: [0, 15, 15], fov: 75 }} gl={{ alpha: true, powerPreference: "high-performance", antialias: false}}>
        <WavyGrid />
      </Canvas>
    </motion.div>
  );
}

export default VaporwaveBackground;
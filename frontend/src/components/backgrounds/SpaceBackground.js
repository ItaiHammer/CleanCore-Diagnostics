import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import "./SpaceBackground.css";

function Stars() {
  const groupRef = useRef();

  useEffect(() => {
    const stars = new Array(200).fill().map(() => ({
      position: [
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400,
      ],
      size: Math.random() * 0.8 + 0.4,
      glow: Math.random() * 0.2 + 0.1,
    }));

    groupRef.current.children.forEach((star, index) => {
      const { position, size, glow } = stars[index];
      star.position.set(...position);
      star.scale.set(size, size, size);
      star.material.emissiveIntensity = glow;
    });
  }, []);

  useFrame(() => {
    groupRef.current.children.forEach((star) => {
      star.position.x += Math.sin(star.position.y * 0.01) * 0.02;
      star.position.y += Math.cos(star.position.x * 0.01) * 0.02;

      if (Math.abs(star.position.x) > 250 || Math.abs(star.position.y) > 250) {
        star.position.set(
          (Math.random() - 0.5) * 400,
          (Math.random() - 0.5) * 400,
          (Math.random() - 0.5) * 400
        );
      }
    });
  });

  return (
    <group ref={groupRef}>
      {new Array(200).fill().map((_, index) => (
        <mesh key={index}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" />
        </mesh>
      ))}
    </group>
  );
}

function ShootingStars() {
  const groupRef = useRef();

  useFrame(() => {
    groupRef.current.children.forEach((star) => {
      star.position.x -= 1;
      star.position.y -= 1;

      const distance = Math.sqrt(star.position.x ** 2 + star.position.y ** 2);
      star.material.opacity = Math.max(0, 1 - distance / 800);
      star.material.transparent = true;

      if (star.position.x < -800 || star.position.y < -800) {
        star.position.set(
          Math.random() * 800 + 800,
          Math.random() * 800 + 800,
          Math.random() * 200 - 200
        );
        star.material.opacity = 0;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {new Array(10).fill().map((_, index) => (
        <mesh key={index}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.2}
            opacity={0}
            transparent={true}
          />
        </mesh>
      ))}
    </group>
  );
}

function SpaceBackground() {
  return (
    <div className="space-background">
      <Canvas
        camera={{ position: [0, 0, 200], fov: 75 }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <Stars />
        <ShootingStars />
        <EffectComposer>
          <Bloom intensity={1.0} luminanceThreshold={0.3} luminanceSmoothing={0.8} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

export default SpaceBackground;

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, Sphere } from '@react-three/drei';
import * as THREE from 'three';

/**
 * 3D Cosmic Scene containing a glowing digital Earth, a rotating spiral galaxy,
 * and mouse-tracking parallax interactions.
 */
export const CosmicScene = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Generate spiral galaxy particles mathematically
  const particleCount = 2000;
  const { positions, colors } = useMemo(() => {
    const posArray = new Float32Array(particleCount * 3);
    const colArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Spiral math parameters
      const angle = (i / particleCount) * Math.PI * 8; // Spiral arms
      const radius = (i / particleCount) * 8 + Math.random() * 0.5;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 1.5; // Thickness of the disk

      posArray[i * 3] = x;
      posArray[i * 3 + 1] = y;
      posArray[i * 3 + 2] = z;

      // Color transition from vibrant cyan to deep purple
      const ratio = i / particleCount;
      colArray[i * 3] = 0.1 + ratio * 0.4; // Red
      colArray[i * 3 + 1] = 0.8 - ratio * 0.6; // Green
      colArray[i * 3 + 2] = 1.0; // Blue (Cyan rich)
    }

    return { positions: posArray, colors: colArray };
  }, []);

  useFrame((state) => {
    const { clock, pointer } = state;
    const elapsedTime = clock.getElapsedTime();

    // Constant rotation for digital planet
    if (earthRef.current) {
      earthRef.current.rotation.y = elapsedTime * 0.08;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = -elapsedTime * 0.04;
    }

    // Slow orbit for the spiral galaxy
    if (particlesRef.current) {
      particlesRef.current.rotation.y = elapsedTime * 0.02;
    }

    // Interactive mouse parallax (smooth lerp)
    if (groupRef.current) {
      const targetX = pointer.x * 0.5;
      const targetY = pointer.y * 0.3;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Dynamic Starfield from Drei */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0.5} fade speed={1} />

      {/* Cyberpunk Holographic Celestial Node */}
      <group position={[0, 0, 0]}>
        {/* Core Digital Sphere */}
        <Sphere ref={earthRef} args={[1.5, 64, 64]}>
          <meshBasicMaterial
            color="#083344"
            wireframe
            transparent
            opacity={0.25}
          />
        </Sphere>

        {/* Outer Tech Shell with higher wireframe density */}
        <Sphere ref={atmosphereRef} args={[1.55, 32, 32]}>
          <meshBasicMaterial
            color="#06b6d4"
            wireframe
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
          />
        </Sphere>

        {/* Soft Point Lights */}
        <pointLight position={[5, 3, 5]} intensity={2} color="#22d3ee" />
        <pointLight position={[-5, -3, -5]} intensity={1.5} color="#a855f7" />
      </group>

      {/* Galaxy Spiral Particle System */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

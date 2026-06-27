import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';

/**
 * 3D Space Scene with ambient cosmic particles, wireframe telemetry corridors,
 * and a centralized holographic data core at [0, 0, -15].
 */
export const SpaceScene = () => {
  const portalGroupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const outerCoreRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Generate 1500 ambient space particles floating in the depth
  const particleCount = 1500;
  const { positions, colors } = useMemo(() => {
    const posArray = new Float32Array(particleCount * 3);
    const colArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Create a cylindrical nebula-like spread extending along the Z-axis
      const theta = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 12; // Avoid camera path center
      const z = (Math.random() - 0.5) * 60 - 10; // Spread from z=20 to z=-40

      posArray[i * 3] = Math.cos(theta) * radius;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 8; // Y spread
      posArray[i * 3 + 2] = z;

      // Color scheme: electric cyan/blue and neon purple
      const isPurple = Math.random() > 0.4;
      if (isPurple) {
        colArray[i * 3] = 0.65;     // R
        colArray[i * 3 + 1] = 0.33; // G
        colArray[i * 3 + 2] = 0.97; // B
      } else {
        colArray[i * 3] = 0.06;     // R
        colArray[i * 3 + 1] = 0.71; // G
        colArray[i * 3 + 2] = 0.83; // B
      }
    }

    return { positions: posArray, colors: colArray };
  }, []);

  // Generate a set of wireframe gateway rings to simulate a data corridor
  const ringCount = 10;
  const ringData = useMemo(() => {
    const rings = [];
    for (let i = 0; i < ringCount; i++) {
      // Place rings along the path towards the core (from z=5 to z=-25)
      const zPos = 5 - (i * 3.5);
      const scale = 2 + (i * 0.15); // Slightly larger as they get deeper
      rings.push({ zPos, scale, id: i });
    }
    return rings;
  }, []);

  useFrame((state) => {
    const { clock, pointer } = state;
    const elapsedTime = clock.getElapsedTime();

    // Rotate core meshes
    if (coreRef.current) {
      coreRef.current.rotation.y = elapsedTime * 0.4;
      coreRef.current.rotation.x = elapsedTime * 0.2;
    }
    if (outerCoreRef.current) {
      outerCoreRef.current.rotation.y = -elapsedTime * 0.2;
      outerCoreRef.current.rotation.z = elapsedTime * 0.1;
    }

    // Gentle floating motion for the telemetry ring portal group
    if (portalGroupRef.current) {
      portalGroupRef.current.position.y = Math.sin(elapsedTime * 0.5) * 0.15;
    }

    // Subtly rotate particles
    if (particlesRef.current) {
      particlesRef.current.rotation.z = elapsedTime * 0.01;
    }
  });

  return (
    <>
      {/* Camera Pivot Group to decouple continuous mouse tracking from linear GSAP timelines */}
      <group name="camera-pivot">
        {/* Cinematic Default Camera positioned at [0, 0, 10] initially */}
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 10]}
          fov={60}
          near={0.1}
          far={100}
        />
      </group>

      {/* Starfield background */}
      <Stars radius={80} depth={40} count={3000} factor={6} saturation={0.8} fade speed={1.5} />

      {/* Main light sources */}
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 5, 10]} intensity={1.5} color="#06b6d4" />
      <pointLight position={[0, -5, -15]} intensity={2.5} color="#a855f7" />
      <directionalLight position={[5, 10, 0]} intensity={1} color="#ffffff" />

      {/* Cyberpunk Gateway Rings Group */}
      <group ref={portalGroupRef}>
        {ringData.map((ring) => (
          <group key={ring.id} position={[0, 0, ring.zPos]} scale={[ring.scale, ring.scale, 1]}>
            {/* Inner Ring */}
            <mesh>
              <ringGeometry args={[1.4, 1.43, 32]} />
              <meshBasicMaterial
                color={ring.id % 2 === 0 ? "#06b6d4" : "#a855f7"}
                transparent
                opacity={0.35 + (ring.id * 0.04)}
                side={THREE.DoubleSide}
              />
            </mesh>
            {/* Outer Octagonal Wireframe frame */}
            <mesh rotation={[0, 0, Math.PI / 4]}>
              <ringGeometry args={[1.5, 1.51, 8]} />
              <meshBasicMaterial
                color="#ffffff"
                transparent
                opacity={0.1}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Holographic Central Core at [0, 0, -18] (Camera will fly right in front of this) */}
      <group position={[0, 0, -18]}>
        {/* Glowing Data Sphere */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.2, 2]} />
          <meshBasicMaterial
            color="#06b6d4"
            wireframe
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Outer Tech Shell */}
        <mesh ref={outerCoreRef}>
          <sphereGeometry args={[1.8, 16, 16]} />
          <meshBasicMaterial
            color="#a855f7"
            wireframe
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Core Omni Light Glow */}
        <pointLight intensity={4} distance={15} color="#06b6d4" />
      </group>

      {/* Cylindrical Star / Data particles stream */}
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
          size={0.05}
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </>
  );
};

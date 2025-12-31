'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedStars() {
  const ref = useRef();
  const sphere = useMemo(() => {
    // Reduced from 8000 to 3000 for better performance
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      
      const color = new THREE.Color();
      const hue = Math.random() * 0.2 + 0.7;
      color.setHSL(hue, 0.8, 0.6 + Math.random() * 0.4);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return { positions, colors };
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 12;
      ref.current.rotation.y -= delta / 18;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere.positions} colors={sphere.colors} stride={3} frustumCulled={true}>
        <PointMaterial
          transparent
          vertexColors
          size={0.2}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function FloatingOrbs() {
  const orbs = useRef([]);
  const orbPositions = useMemo(() => {
    // Reduced from 6 to 3 orbs for better performance
    return Array.from({ length: 3 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
      ],
      size: 0.5 + Math.random() * 0.5,
      color: new THREE.Color().setHSL(0.7 + Math.random() * 0.2, 0.8, 0.5),
      emissive: new THREE.Color().setHSL(0.7 + Math.random() * 0.2, 0.8, 0.3),
    }));
  }, []);
  
  useFrame((state, delta) => {
    orbs.current.forEach((orb, i) => {
      if (orb) {
        orb.position.y += Math.sin(state.clock.elapsedTime + i) * 0.01;
        orb.position.x += Math.cos(state.clock.elapsedTime + i * 0.5) * 0.01;
        orb.rotation.x += delta * 0.5;
        orb.rotation.y += delta * 0.3;
      }
    });
  });

  return (
    <>
      {orbPositions.map((orbData, i) => (
        <Sphere
          key={i}
          ref={(el) => (orbs.current[i] = el)}
          args={[orbData.size, 16, 16]} // Reduced segments from 32 to 16
          position={orbData.position}
        >
          <meshStandardMaterial
            color={orbData.color}
            transparent
            opacity={0.15}
            emissive={orbData.emissive}
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.8}
          />
        </Sphere>
      ))}
    </>
  );
}

function GlossyParticles() {
  const particles = useRef();
  const count = 1000; // Reduced from 3000 to 1000 for better performance
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.x = state.clock.elapsedTime * 0.1;
      particles.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Points ref={particles} positions={positions} stride={3} frustumCulled={true}>
      <PointMaterial
        transparent
        color="#A78BFA"
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
}

export default function HeroBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Three.js Canvas Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      >
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 75 }}
          dpr={[1, 2]} // Limit pixel ratio for performance
          performance={{ min: 0.5 }} // Reduce quality if FPS drops
          gl={{ antialias: false }} // Disable antialiasing for better performance
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#8B5CF6" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#A78BFA" />
          <AnimatedStars />
          <FloatingOrbs />
          <GlossyParticles />
        </Canvas>
      </div>

      {/* Glossy Gradient Overlays */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          background: `
            radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(167, 139, 250, 0.25) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(107, 70, 193, 0.2) 0%, transparent 70%)
          `,
          backdropFilter: 'blur(1px)',
          WebkitBackdropFilter: 'blur(1px)',
        }}
      />

      {/* Animated Glossy Shapes */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0.1) 50%, transparent 100%)',
          filter: 'blur(60px)',
          zIndex: 0,
          animation: 'float 8s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '15%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.35) 0%, rgba(107, 70, 193, 0.15) 50%, transparent 100%)',
          filter: 'blur(70px)',
          zIndex: 0,
          animation: 'float 10s ease-in-out infinite reverse',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)',
          filter: 'blur(80px)',
          zIndex: 0,
          animation: 'pulse 6s ease-in-out infinite',
        }}
      />

      {/* Glassmorphism Layer */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      />
    </>
  );
}


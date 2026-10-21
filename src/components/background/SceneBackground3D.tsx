'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GraphicsMode } from '../../types/portfolio';

interface ParticlesProps {
  mode: GraphicsMode;
}

function ConstellationParticles({ mode }: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const mousePosition = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollOffset = useRef({ current: 0, target: 0 });

  const particleCount = mode === '3d-high' ? 140 : 70;
  const maxDistance = 4.2;
  const maxLines = Math.floor((particleCount * (particleCount - 1)) / 2);

  // Initialize line geometry with typed buffer attributes
  const lineGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const pos = new Float32Array(maxLines * 6);
    const col = new Float32Array(maxLines * 6);
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(col, 3));
    return geom;
  }, [maxLines]);

  // Track window pointer and scroll
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      mousePosition.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollOffset.current.target = window.scrollY / maxScroll;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Initialize random particle positions and velocities
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 28;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;

      vel[i * 3] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }

    return [pos, vel];
  }, [particleCount]);

  useFrame((state) => {
    // Smooth pointer parallax damping
    mousePosition.current.x += (mousePosition.current.targetX - mousePosition.current.x) * 0.04;
    mousePosition.current.y += (mousePosition.current.targetY - mousePosition.current.y) * 0.04;

    // Smooth scroll damping
    scrollOffset.current.current +=
      (scrollOffset.current.target - scrollOffset.current.current) * 0.05;

    // Camera responds smoothly to pointer and scroll
    state.camera.position.x = mousePosition.current.x * 1.5;
    state.camera.position.y = mousePosition.current.y * 1.2 - scrollOffset.current.current * 4.0;
    state.camera.lookAt(0, -scrollOffset.current.current * 3.5, 0);

    const positionsAttr = pointsRef.current?.geometry.attributes.position;
    if (!positionsAttr) return;

    const currentPositions = positionsAttr.array as Float32Array;

    // Update particle positions
    for (let i = 0; i < particleCount; i++) {
      currentPositions[i * 3] += velocities[i * 3];
      currentPositions[i * 3 + 1] += velocities[i * 3 + 1];
      currentPositions[i * 3 + 2] += velocities[i * 3 + 2];

      // Boundary rebound
      if (Math.abs(currentPositions[i * 3]) > 14) velocities[i * 3] *= -1;
      if (Math.abs(currentPositions[i * 3 + 1]) > 10) velocities[i * 3 + 1] *= -1;
      if (Math.abs(currentPositions[i * 3 + 2]) > 8) velocities[i * 3 + 2] *= -1;
    }

    positionsAttr.needsUpdate = true;

    // Connect particles with line segments
    const linePosAttr = lineGeometry.attributes.position as THREE.BufferAttribute | undefined;
    const lineColorAttr = lineGeometry.attributes.color as THREE.BufferAttribute | undefined;

    if (linesRef.current && linePosAttr && lineColorAttr) {
      const linePositions = linePosAttr.array as Float32Array;
      const lineColors = lineColorAttr.array as Float32Array;
      let lineIndex = 0;
      let colorIndex = 0;

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = currentPositions[i * 3] - currentPositions[j * 3];
          const dy = currentPositions[i * 3 + 1] - currentPositions[j * 3 + 1];
          const dz = currentPositions[i * 3 + 2] - currentPositions[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistance * maxDistance) {
            // First vertex
            linePositions[lineIndex++] = currentPositions[i * 3];
            linePositions[lineIndex++] = currentPositions[i * 3 + 1];
            linePositions[lineIndex++] = currentPositions[i * 3 + 2];

            // Second vertex
            linePositions[lineIndex++] = currentPositions[j * 3];
            linePositions[lineIndex++] = currentPositions[j * 3 + 1];
            linePositions[lineIndex++] = currentPositions[j * 3 + 2];

            // Opacity based on distance
            const alpha = 1.0 - Math.sqrt(distSq) / maxDistance;
            const isViolet = (i + j) % 3 === 0;
            const r = isViolet ? 0.65 * alpha : 0.13 * alpha;
            const g = isViolet ? 0.54 * alpha : 0.74 * alpha;
            const b = isViolet ? 0.98 * alpha : 0.96 * alpha;

            lineColors[colorIndex++] = r;
            lineColors[colorIndex++] = g;
            lineColors[colorIndex++] = b;

            lineColors[colorIndex++] = r;
            lineColors[colorIndex++] = g;
            lineColors[colorIndex++] = b;
          }
        }
      }

      linePosAttr.needsUpdate = true;
      lineColorAttr.needsUpdate = true;
      linesRef.current.geometry.setDrawRange(0, lineIndex / 3);
    }
  });

  return (
    <group>
      {/* Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          color="#38bdf8"
          transparent
          opacity={0.85}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Dynamic connections */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

export default function SceneBackground3D({ mode }: { mode: GraphicsMode }) {
  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 w-full h-full overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 14], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'low-power',
        }}
        frameloop="always"
        style={{ pointerEvents: 'none' }}
      >
        <ConstellationParticles mode={mode} />
      </Canvas>
    </div>
  );
}

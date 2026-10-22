'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GraphicsMode } from '../../types/portfolio';
import { usePortfolio } from '../../context/PortfolioContext';

interface UniverseProps {
  mode: GraphicsMode;
  activeProjectId: string | null;
}

// Helper to create an elliptical orbit curve geometry
function createOrbitGeometry(xRadius: number, yRadius: number, pointsCount = 120): THREE.BufferGeometry {
  const curve = new THREE.EllipseCurve(
    0, 0,
    xRadius, yRadius,
    0, 2 * Math.PI,
    false,
    0
  );
  const points = curve.getPoints(pointsCount);
  const positions = new Float32Array(points.length * 3);
  for (let i = 0; i < points.length; i++) {
    positions[i * 3] = points[i].x;
    positions[i * 3 + 1] = points[i].y;
    positions[i * 3 + 2] = 0;
  }
  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return geom;
}

// Helical journey progression trajectory
function createJourneyTrajectoryGeometry(): THREE.BufferGeometry {
  const points: THREE.Vector3[] = [];
  const totalPoints = 90;
  for (let i = 0; i < totalPoints; i++) {
    const t = i / (totalPoints - 1);
    const angle = t * Math.PI * 3.5;
    const x = Math.sin(angle) * 3.2 - (t - 0.5) * 4.0;
    const y = (0.5 - t) * 16.0;
    const z = Math.cos(angle) * 2.5 - 3.0;
    points.push(new THREE.Vector3(x, y, z));
  }
  const curve = new THREE.CatmullRomCurve3(points);
  const samplePoints = curve.getPoints(140);
  const positions = new Float32Array(samplePoints.length * 3);
  for (let i = 0; i < samplePoints.length; i++) {
    positions[i * 3] = samplePoints[i].x;
    positions[i * 3 + 1] = samplePoints[i].y;
    positions[i * 3 + 2] = samplePoints[i].z;
  }
  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return geom;
}

function PersistentUniverseScene({ mode, activeProjectId }: UniverseProps) {
  // References
  const starfieldPointsRef = useRef<THREE.Points>(null!);
  const constellationPointsRef = useRef<THREE.Points>(null!);
  const constellationLinesRef = useRef<THREE.LineSegments>(null!);
  const centralStructureGroupRef = useRef<THREE.Group>(null!);
  const outerCoreWireframeRef = useRef<THREE.LineSegments>(null!);
  const innerCoreWireframeRef = useRef<THREE.LineSegments>(null!);
  const journeyTrajectoryRef = useRef<THREE.Line>(null!);

  // Orbital ring refs
  const orbitGroupRef = useRef<THREE.Group>(null!);
  const orbitLeadRef = useRef<THREE.LineLoop>(null!);
  const orbitKeyRef = useRef<THREE.LineLoop>(null!);
  const orbitBioRef = useRef<THREE.LineLoop>(null!);

  // Beacon tracer nodes
  const beaconLeadRef = useRef<THREE.Mesh>(null!);
  const beaconKeyRef = useRef<THREE.Mesh>(null!);
  const beaconBioRef = useRef<THREE.Mesh>(null!);

  // Tracking refs (avoiding React state re-renders in the 60fps frame loop)
  const mousePosition = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollOffset = useRef({ current: 0, target: 0 });

  const [isMobile, setIsMobile] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkViewport();

    const handleVis = () => setIsVisible(document.visibilityState === 'visible');

    window.addEventListener('resize', checkViewport);
    document.addEventListener('visibilitychange', handleVis);

    return () => {
      window.removeEventListener('resize', checkViewport);
      document.removeEventListener('visibilitychange', handleVis);
    };
  }, []);

  // Conservative, optimized particle counts
  const { starfieldCount, constellationCount } = useMemo(() => {
    if (isMobile) {
      return {
        starfieldCount: mode === '3d-high' ? 70 : 40,
        constellationCount: mode === '3d-high' ? 45 : 25,
      };
    }
    return {
      starfieldCount: mode === '3d-high' ? 180 : 90,
      constellationCount: mode === '3d-high' ? 120 : 60,
    };
  }, [isMobile, mode]);

  const maxDistance = isMobile ? 3.4 : 4.0;
  const maxLines = Math.floor((constellationCount * (constellationCount - 1)) / 2);

  // Initialize constellation dynamic line geometry
  const lineGeometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const pos = new Float32Array(maxLines * 6);
    const col = new Float32Array(maxLines * 6);
    geom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geom.setAttribute('color', new THREE.BufferAttribute(col, 3));
    return geom;
  }, [maxLines]);

  // Deep background starfield positions
  const [starPositions] = useMemo(() => {
    const pos = new Float32Array(starfieldCount * 3);
    for (let i = 0; i < starfieldCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 44;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 34;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 4;
    }
    return [pos];
  }, [starfieldCount]);

  // Constellation particles positions and velocities
  const [constellationPositions, constellationVelocities] = useMemo(() => {
    const pos = new Float32Array(constellationCount * 3);
    const vel = new Float32Array(constellationCount * 3);

    for (let i = 0; i < constellationCount; i++) {
      const x = (Math.random() - 0.5) * 26;
      const y = (Math.random() - 0.5) * 18;
      const z = (Math.random() - 0.5) * 12;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      vel[i * 3] = (Math.random() - 0.5) * 0.006;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.006;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }

    return [pos, vel];
  }, [constellationCount]);

  // Orbital curves geometries
  const orbitGeometries = useMemo(() => {
    return {
      lead: createOrbitGeometry(5.4, 3.8, 100),
      key: createOrbitGeometry(7.0, 4.8, 110),
      bio: createOrbitGeometry(8.4, 5.8, 120),
      journey: createJourneyTrajectoryGeometry(),
    };
  }, []);

  // Central structure wireframe geometries
  const { outerWireframeGeom, innerWireframeGeom } = useMemo(() => {
    const icosaGeom = new THREE.IcosahedronGeometry(2.3, 1);
    const octaGeom = new THREE.OctahedronGeometry(1.2, 0);

    const outerWire = new THREE.WireframeGeometry(icosaGeom);
    const innerWire = new THREE.WireframeGeometry(octaGeom);

    icosaGeom.dispose();
    octaGeom.dispose();

    return {
      outerWireframeGeom: outerWire,
      innerWireframeGeom: innerWire,
    };
  }, []);

  // Journey line instance using primitive to avoid SVG line conflict
  const journeyLine = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({
      color: '#67e8f9',
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    return new THREE.Line(orbitGeometries.journey, mat);
  }, [orbitGeometries.journey]);

  // Clean up all allocated geometries on unmount
  useEffect(() => {
    return () => {
      lineGeometry.dispose();
      orbitGeometries.lead.dispose();
      orbitGeometries.key.dispose();
      orbitGeometries.bio.dispose();
      orbitGeometries.journey.dispose();
      outerWireframeGeom.dispose();
      innerWireframeGeom.dispose();
      (journeyLine.material as THREE.Material).dispose();
    };
  }, [lineGeometry, orbitGeometries, outerWireframeGeom, innerWireframeGeom, journeyLine]);

  // Track pointer and native scroll
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (isTouchDevice) return;
      mousePosition.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollOffset.current.target = window.scrollY / maxScroll;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isTouchDevice]);

  // Animation frame loop
  useFrame((state, delta) => {
    if (!isVisible) return;

    const time = state.clock.elapsedTime;

    // 1. Damped pointer parallax & touch ambient drift
    if (isTouchDevice) {
      // Gentle ambient lissajous motion on touch devices rather than erratic touch jumps
      mousePosition.current.targetX = Math.sin(time * 0.28) * 0.35;
      mousePosition.current.targetY = Math.cos(time * 0.22) * 0.28;
    }

    mousePosition.current.x += (mousePosition.current.targetX - mousePosition.current.x) * 0.04;
    mousePosition.current.y += (mousePosition.current.targetY - mousePosition.current.y) * 0.04;

    // 2. Smooth scroll interpolation
    scrollOffset.current.current +=
      (scrollOffset.current.target - scrollOffset.current.current) * 0.055;
    const scrollT = Math.min(Math.max(scrollOffset.current.current, 0), 1);

    // 3. Camera position responding to scroll progress and cursor
    state.camera.position.x = mousePosition.current.x * 1.5;
    state.camera.position.y = mousePosition.current.y * 1.1 - scrollT * 3.6;
    state.camera.lookAt(0, -scrollT * 3.0, 0);

    // 4. Central Geometric Structure Scroll-Driven Morphing
    // Sections map to scroll ranges:
    // Hero: 0.00 - 0.15 | About: 0.15 - 0.35 | Projects: 0.35 - 0.55
    // Skills: 0.55 - 0.75 | Journey: 0.75 - 0.90 | Contact: 0.90 - 1.00
    if (centralStructureGroupRef.current) {
      const group = centralStructureGroupRef.current;

      let targetPosX = 0;
      let targetPosY = 0;
      let targetPosZ = -1;
      let targetScale = 1.0;

      if (scrollT < 0.15) {
        // Hero: Stately center
        targetPosX = 0;
        targetPosY = 0.2;
        targetPosZ = 0;
        targetScale = isMobile ? 0.8 : 1.05;
      } else if (scrollT < 0.35) {
        // About: Shifts to right to open negative space for left-aligned narrative
        const t = (scrollT - 0.15) / 0.2;
        targetPosX = THREE.MathUtils.lerp(0, isMobile ? 2.0 : 4.6, t);
        targetPosY = THREE.MathUtils.lerp(0.2, 0.4, t);
        targetPosZ = THREE.MathUtils.lerp(0, -2.0, t);
        targetScale = isMobile ? 0.7 : 0.88;
      } else if (scrollT < 0.55) {
        // Projects: Shifts to left and tilts into orbital plane
        const t = (scrollT - 0.35) / 0.2;
        targetPosX = THREE.MathUtils.lerp(isMobile ? 2.0 : 4.6, isMobile ? -1.8 : -3.8, t);
        targetPosY = THREE.MathUtils.lerp(0.4, -0.6, t);
        targetPosZ = THREE.MathUtils.lerp(-2.0, -1.2, t);
        targetScale = isMobile ? 0.75 : 0.92;
      } else if (scrollT < 0.75) {
        // Skills: Floats upper right as celestial anchor
        const t = (scrollT - 0.55) / 0.2;
        targetPosX = THREE.MathUtils.lerp(isMobile ? -1.8 : -3.8, isMobile ? 1.8 : 3.8, t);
        targetPosY = THREE.MathUtils.lerp(-0.6, 1.2, t);
        targetPosZ = THREE.MathUtils.lerp(-1.2, -2.8, t);
        targetScale = isMobile ? 0.65 : 0.78;
      } else if (scrollT < 0.90) {
        // Journey: Aligns with progression path
        const t = (scrollT - 0.75) / 0.15;
        targetPosX = THREE.MathUtils.lerp(isMobile ? 1.8 : 3.8, 0, t);
        targetPosY = THREE.MathUtils.lerp(1.2, -1.2, t);
        targetPosZ = THREE.MathUtils.lerp(-2.8, -2.0, t);
        targetScale = 0.82;
      } else {
        // Contact: Converges into calm, centered horizon
        const t = (scrollT - 0.90) / 0.1;
        targetPosX = 0;
        targetPosY = THREE.MathUtils.lerp(-1.2, -0.2, t);
        targetPosZ = THREE.MathUtils.lerp(-2.0, -1.0, t);
        targetScale = 0.95;
      }

      // Smooth lerp transform
      group.position.x += (targetPosX - group.position.x) * 0.06;
      group.position.y += (targetPosY - group.position.y) * 0.06;
      group.position.z += (targetPosZ - group.position.z) * 0.06;

      const currentScale = group.scale.x;
      const nextScale = currentScale + (targetScale - currentScale) * 0.06;
      group.scale.set(nextScale, nextScale, nextScale);

      // Continuous serene rotation
      group.rotation.x += delta * 0.12;
      group.rotation.y += delta * 0.18;
      group.rotation.z += delta * 0.08;

      if (innerCoreWireframeRef.current) {
        innerCoreWireframeRef.current.rotation.x -= delta * 0.28;
        innerCoreWireframeRef.current.rotation.y -= delta * 0.22;
      }
    }

    // 5. Orbital Rings & Project Interaction
    if (orbitGroupRef.current) {
      orbitGroupRef.current.rotation.z = time * 0.03;

      // Project card focus connection:
      // leadmachine -> orbitLeadRef
      // keyabroad -> orbitKeyRef
      // biometric-attendance -> orbitBioRef
      const isLeadActive = activeProjectId === 'leadmachine';
      const isKeyActive = activeProjectId === 'keyabroad';
      const isBioActive = activeProjectId === 'biometric-attendance';
      const hasAnyActive = isLeadActive || isKeyActive || isBioActive;

      // Update materials opacity & pulse smoothly
      const updateOrbitMaterial = (lineRef: React.RefObject<THREE.LineLoop | null>, isActive: boolean, baseOpacity: number) => {
        if (!lineRef.current) return;
        const mat = lineRef.current.material as THREE.LineBasicMaterial;
        let targetOpacity = baseOpacity;
        if (hasAnyActive) {
          targetOpacity = isActive ? 0.9 : 0.12;
        }
        mat.opacity += (targetOpacity - mat.opacity) * 0.08;

        // Subtle scale pulse on active
        if (isActive) {
          const pulse = 1.0 + Math.sin(time * 4) * 0.025;
          lineRef.current.scale.set(pulse, pulse, pulse);
        } else {
          lineRef.current.scale.set(1, 1, 1);
        }
      };

      updateOrbitMaterial(orbitLeadRef, isLeadActive, 0.32);
      updateOrbitMaterial(orbitKeyRef, isKeyActive, 0.26);
      updateOrbitMaterial(orbitBioRef, isBioActive, 0.24);

      // Update satellite tracer beacon positions
      const leadAngle = time * (isLeadActive ? 0.7 : 0.35);
      const keyAngle = -time * (isKeyActive ? 0.6 : 0.28) + 1.2;
      const bioAngle = time * (isBioActive ? 0.55 : 0.22) + 2.5;

      if (beaconLeadRef.current) {
        beaconLeadRef.current.position.set(Math.cos(leadAngle) * 5.4, Math.sin(leadAngle) * 3.8, 0);
      }
      if (beaconKeyRef.current) {
        beaconKeyRef.current.position.set(Math.cos(keyAngle) * 7.0, Math.sin(keyAngle) * 4.8, 0);
      }
      if (beaconBioRef.current) {
        beaconBioRef.current.position.set(Math.cos(bioAngle) * 8.4, Math.sin(bioAngle) * 5.8, 0);
      }
    }

    // 6. Journey Trajectory Filament Visibility
    if (journeyTrajectoryRef.current) {
      const mat = journeyTrajectoryRef.current.material as THREE.LineBasicMaterial;
      // Fades in around scroll 0.68 - 0.90 (Journey section)
      const journeyTargetOpacity =
        scrollT > 0.65 && scrollT < 0.92
          ? Math.sin(((scrollT - 0.65) / 0.27) * Math.PI) * 0.42
          : 0.0;
      mat.opacity += (journeyTargetOpacity - mat.opacity) * 0.06;
      journeyTrajectoryRef.current.rotation.y = time * 0.05;
    }

    // 7. Background Starfield Parallax Drift
    if (starfieldPointsRef.current) {
      starfieldPointsRef.current.rotation.y = time * 0.015;
      starfieldPointsRef.current.rotation.x = -scrollT * 0.3;
    }

    // 8. Constellation Particle Dynamics & Line Filaments
    const posAttr = constellationPointsRef.current?.geometry.attributes.position;
    if (!posAttr) return;

    const currentPositions = posAttr.array as Float32Array;

    // Cluster centers for Skills section (scroll ~0.55 - 0.75)
    const isSkillsRange = scrollT > 0.52 && scrollT < 0.78;
    const clusterBias = isSkillsRange ? Math.sin(((scrollT - 0.52) / 0.26) * Math.PI) * 0.35 : 0;

    const clusterAnchors = [
      [-6, 3, 0],
      [6, 3, 0],
      [-5, -4, 0],
      [5, -4, 0],
    ];

    for (let i = 0; i < constellationCount; i++) {
      currentPositions[i * 3] += constellationVelocities[i * 3];
      currentPositions[i * 3 + 1] += constellationVelocities[i * 3 + 1];
      currentPositions[i * 3 + 2] += constellationVelocities[i * 3 + 2];

      // Subtle clustering pull during Skills section
      if (clusterBias > 0) {
        const cluster = clusterAnchors[i % 4];
        currentPositions[i * 3] += (cluster[0] - currentPositions[i * 3]) * clusterBias * 0.008;
        currentPositions[i * 3 + 1] += (cluster[1] - currentPositions[i * 3 + 1]) * clusterBias * 0.008;
      }

      // Restrained pointer reaction (desktop only)
      if (!isTouchDevice) {
        const px = currentPositions[i * 3];
        const py = currentPositions[i * 3 + 1];
        const worldMouseX = mousePosition.current.x * 10;
        const worldMouseY = mousePosition.current.y * 7;
        const dx = px - worldMouseX;
        const dy = py - worldMouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 3.2 && dist > 0.01) {
          const repelForce = (3.2 - dist) / 3.2;
          currentPositions[i * 3] += (dx / dist) * repelForce * 0.04;
          currentPositions[i * 3 + 1] += (dy / dist) * repelForce * 0.04;
        }
      }

      // Soft boundary rebound
      if (Math.abs(currentPositions[i * 3]) > 13) constellationVelocities[i * 3] *= -1;
      if (Math.abs(currentPositions[i * 3 + 1]) > 9) constellationVelocities[i * 3 + 1] *= -1;
      if (Math.abs(currentPositions[i * 3 + 2]) > 6) constellationVelocities[i * 3 + 2] *= -1;
    }

    posAttr.needsUpdate = true;

    // Connect nearby particles with lines
    const linePosAttr = lineGeometry.attributes.position as THREE.BufferAttribute | undefined;
    const lineColorAttr = lineGeometry.attributes.color as THREE.BufferAttribute | undefined;

    if (constellationLinesRef.current && linePosAttr && lineColorAttr) {
      const linePositions = linePosAttr.array as Float32Array;
      const lineColors = lineColorAttr.array as Float32Array;
      let lineIndex = 0;
      let colorIndex = 0;

      for (let i = 0; i < constellationCount; i++) {
        for (let j = i + 1; j < constellationCount; j++) {
          const dx = currentPositions[i * 3] - currentPositions[j * 3];
          const dy = currentPositions[i * 3 + 1] - currentPositions[j * 3 + 1];
          const dz = currentPositions[i * 3 + 2] - currentPositions[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistance * maxDistance) {
            // Vertex A
            linePositions[lineIndex++] = currentPositions[i * 3];
            linePositions[lineIndex++] = currentPositions[i * 3 + 1];
            linePositions[lineIndex++] = currentPositions[i * 3 + 2];

            // Vertex B
            linePositions[lineIndex++] = currentPositions[j * 3];
            linePositions[lineIndex++] = currentPositions[j * 3 + 1];
            linePositions[lineIndex++] = currentPositions[j * 3 + 2];

            // Smooth alpha gradient based on distance
            const alpha = 1.0 - Math.sqrt(distSq) / maxDistance;
            const isViolet = (i + j) % 3 === 0;
            const r = isViolet ? 0.65 * alpha : 0.15 * alpha;
            const g = isViolet ? 0.54 * alpha : 0.78 * alpha;
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
      constellationLinesRef.current.geometry.setDrawRange(0, lineIndex / 3);
    }
  });

  return (
    <group>
      {/* Layer 1: Distant Background Starfield */}
      <points ref={starfieldPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[starPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.08 : 0.1}
          color="#94a3b8"
          transparent
          opacity={0.5}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Layer 2: Midground Constellation Network */}
      <points ref={constellationPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[constellationPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.14 : 0.18}
          color="#67e8f9"
          transparent
          opacity={0.88}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Constellation Connection Filaments */}
      <lineSegments ref={constellationLinesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.42}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      {/* Layer 3: Central Wireframe Geometric Structure */}
      <group ref={centralStructureGroupRef}>
        {/* Outer Wireframe Icosahedron */}
        <lineSegments ref={outerCoreWireframeRef} geometry={outerWireframeGeom}>
          <lineBasicMaterial
            color="#67e8f9"
            transparent
            opacity={0.48}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>

        {/* Inner Wireframe Octahedron Core */}
        <lineSegments ref={innerCoreWireframeRef} geometry={innerWireframeGeom}>
          <lineBasicMaterial
            color="#a78bfa"
            transparent
            opacity={0.65}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>

        {/* Luminous Central Node */}
        <mesh>
          <sphereGeometry args={[0.2, 12, 12]} />
          <meshBasicMaterial
            color="#67e8f9"
            transparent
            opacity={0.85}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* Layer 4: Orbital Paths */}
      <group ref={orbitGroupRef}>
        {/* Orbit 1: LeadMachine (Cyan) */}
        <group rotation={[0.42, 0.3, 0.2]}>
          <lineLoop ref={orbitLeadRef} geometry={orbitGeometries.lead}>
            <lineBasicMaterial
              color="#67e8f9"
              transparent
              opacity={0.32}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </lineLoop>
          <mesh ref={beaconLeadRef}>
            <sphereGeometry args={[0.14, 8, 8]} />
            <meshBasicMaterial
              color="#67e8f9"
              transparent
              opacity={0.9}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>

        {/* Orbit 2: KeyAbroad (Violet) */}
        <group rotation={[-0.45, 0.6, -0.3]}>
          <lineLoop ref={orbitKeyRef} geometry={orbitGeometries.key}>
            <lineBasicMaterial
              color="#a78bfa"
              transparent
              opacity={0.26}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </lineLoop>
          <mesh ref={beaconKeyRef}>
            <sphereGeometry args={[0.13, 8, 8]} />
            <meshBasicMaterial
              color="#a78bfa"
              transparent
              opacity={0.9}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>

        {/* Orbit 3: Biometric Attendance (Emerald/Teal) */}
        <group rotation={[0.55, -0.4, 0.7]}>
          <lineLoop ref={orbitBioRef} geometry={orbitGeometries.bio}>
            <lineBasicMaterial
              color="#34d399"
              transparent
              opacity={0.24}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </lineLoop>
          <mesh ref={beaconBioRef}>
            <sphereGeometry args={[0.13, 8, 8]} />
            <meshBasicMaterial
              color="#34d399"
              transparent
              opacity={0.9}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      </group>

      {/* Layer 5: Journey Progression Filament */}
      <primitive object={journeyLine} ref={journeyTrajectoryRef} />
    </group>
  );
}

export default function SceneBackground3D({ mode }: { mode: GraphicsMode }) {
  const { activeProjectId } = usePortfolio();

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 w-full h-full overflow-hidden"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 13], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'low-power',
        }}
        frameloop="always"
        style={{ pointerEvents: 'none' }}
      >
        <PersistentUniverseScene mode={mode} activeProjectId={activeProjectId} />
      </Canvas>
    </div>
  );
}

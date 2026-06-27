import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useAuthTransitionStore } from '@/store/authTransitionStore';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GreenSock ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/**
 * CameraDirector handles cinematic camera path fly-throughs using GSAP timelines,
 * interactive scroll triggers, and mouse cursor parallax movements.
 */
export const CameraDirector = () => {
  const { camera } = useThree();
  const view = useAuthTransitionStore((state) => state.view);
  const setView = useAuthTransitionStore((state) => state.setView);
  
  // Track scroll progress securely to map to Z-position depth panning
  const scrollProgress = useRef(0);

  // Initialize ScrollTrigger to link page scroll depth with depth camera movements
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  // Monitor AuthTransition view changes and trigger high-end GSAP flight timelines
  useEffect(() => {
    if (view === 'TRANSITIONING') {
      // Create master GSAP timeline with complex bezier-like curves
      const tl = gsap.timeline({
        onComplete: () => {
          setView('DASHBOARD');
        },
      });

      // Step 1: Fly-Through the space corridors
      tl.to(camera.position, {
        x: 1.8,
        y: 0.8,
        z: 3,
        duration: 1.5,
        ease: 'power3.inOut',
      })
      .to(camera.position, {
        x: -1.5,
        y: -0.6,
        z: -5,
        duration: 1.5,
        ease: 'power2.inOut',
      })
      // Step 2: Smooth Zoom & Focus Framing on the Central Holographic Data Core (at [0, 0, -18])
      .to(camera.position, {
        x: 0,
        y: 0,
        z: -12.5, // Positions camera perfectly right in front of the core at -18
        duration: 1.8,
        ease: 'power4.out',
        onUpdate: () => {
          camera.updateProjectionMatrix();
        },
      }, '-=0.3')
      // Step 3: Zoom Lens (FOV compression) for heavy cinematic impact
      .to(camera, {
        fov: 38,
        duration: 2.5,
        ease: 'power4.out',
        onUpdate: () => {
          camera.updateProjectionMatrix();
        },
      }, '<'); // Play concurrently with the final positioning zoom
    } else if (view === 'LANDING') {
      // Smoothly reset camera back to initial cinematic state
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 10,
        duration: 1.8,
        ease: 'power3.out',
        onUpdate: () => {
          camera.updateProjectionMatrix();
        },
      });
      gsap.to(camera, {
        fov: 60,
        duration: 1.8,
        ease: 'power3.out',
        onUpdate: () => {
          camera.updateProjectionMatrix();
        },
      });
    }
  }, [view, camera, setView]);

  // Execute continuous frame-by-frame mouse tracking and scroll panning
  useFrame((state) => {
    const { pointer } = state;
    const parent = camera.parent;

    if (parent) {
      // 1. Mouse Follow Parallax - Subtly rotate camera's outer pivot group
      const targetRotY = pointer.x * 0.15;
      const targetRotX = -pointer.y * 0.1;

      parent.rotation.y = THREE.MathUtils.lerp(parent.rotation.y, targetRotY, 0.05);
      parent.rotation.x = THREE.MathUtils.lerp(parent.rotation.x, targetRotX, 0.05);

      // 2. Scroll Lerp - Guide the camera forward/backward as the user explores down the page
      if (view === 'LANDING' || view === 'TRANSITIONING') {
        // Shift pivot group up to 8 units forward down the Z corridor on scroll
        const targetZShift = -scrollProgress.current * 8;
        parent.position.z = THREE.MathUtils.lerp(parent.position.z, targetZShift, 0.05);
      } else {
        // In DASHBOARD view, lock pivot at origin [0,0,0] to keep telemetry console stable
        parent.position.z = THREE.MathUtils.lerp(parent.position.z, 0, 0.05);
      }
    }
  });

  return null;
};

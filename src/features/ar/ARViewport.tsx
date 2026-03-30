import { Canvas } from '@react-three/fiber';
import type { ReactNode } from 'react';
import { XR, XRDomOverlay } from '@react-three/xr';
import { arXRStore } from './xrStore';
import { ARSceneContent } from './ARSceneContent';

type ARViewportProps = {
  /** Shown in the WebXR DOM overlay while immersive-ar is active (and mirrored below when not). */
  overlayChildren: ReactNode;
};

export function ARViewport({ overlayChildren }: ARViewportProps) {
  return (
    <Canvas
      className="ar-viewport__canvas"
      camera={{ fov: 50, near: 0.01, far: 200 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      dpr={[1, 2]}
    >
      <XR store={arXRStore}>
        <ARSceneContent />
        <XRDomOverlay className="xr-dom-overlay-root">{overlayChildren}</XRDomOverlay>
      </XR>
    </Canvas>
  );
}

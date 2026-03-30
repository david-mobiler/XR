import type { ReactNode } from 'react';
import { ARViewport } from './ARViewport';

type ARSceneProps = {
  overlayChildren?: ReactNode;
};

/** Full-screen R3F canvas + WebXR root; 3D content lives in ARSceneContent. */
export function ARScene({ overlayChildren }: ARSceneProps) {
  return <ARViewport overlayChildren={overlayChildren} />;
}

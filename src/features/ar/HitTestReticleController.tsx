import { useFrame } from '@react-three/fiber';
import { type RefObject, useMemo, useRef } from 'react';
import { Matrix4 } from 'three';
import { useXRHitTest } from '@react-three/xr';
import { usePlacementStore } from './placementStore';

type HitTestReticleControllerProps = {
  reticleRef: RefObject<import('three').Group | null>;
};

/**
 * Drives the reticle from continuous viewer hit tests against planes/meshes.
 * Reticle is hidden when there is no hit or after the user has placed furniture.
 */
export function HitTestReticleController({ reticleRef }: HitTestReticleControllerProps) {
  const worldMatrix = useMemo(() => new Matrix4(), []);
  const hasHitRef = useRef(false);
  useXRHitTest(
    (results, getWorldMatrix) => {
      if (results.length === 0) {
        hasHitRef.current = false;
        return;
      }
      getWorldMatrix(worldMatrix, results[0]);
      hasHitRef.current = true;
    },
    'viewer',
    ['plane', 'mesh'],
  );

  useFrame(() => {
    const group = reticleRef.current;
    if (!group) return;
    const isPlaced = usePlacementStore.getState().isPlaced;
    if (isPlaced || !hasHitRef.current) {
      group.visible = false;
      return;
    }
    group.visible = true;
    group.matrix.copy(worldMatrix);
    group.matrixAutoUpdate = false;
    group.updateMatrixWorld(true);
  });

  return null;
}

import { useLayoutEffect, useRef } from 'react';
import type { Group } from 'three';
import { FurnitureVisual } from './FurnitureVisual';
import { usePlacementStore } from './placementStore';

/**
 * Hit-test root matrix + local Y rotation. `FurnitureVisual` is bottom-aligned at y=0 in the inner group.
 */
export function PlacedFurniture() {
  const isPlaced = usePlacementStore((s) => s.isPlaced);
  const placedMatrix = usePlacementStore((s) => s.placedMatrix);
  const rotationY = usePlacementStore((s) => s.rotationY);
  const groupRef = useRef<Group>(null);

  useLayoutEffect(() => {
    const g = groupRef.current;
    if (!g || !isPlaced) return;
    g.matrix.copy(placedMatrix);
    g.matrixAutoUpdate = false;
    g.updateMatrixWorld(true);
  }, [isPlaced, placedMatrix]);

  if (!isPlaced) return null;

  return (
    <group ref={groupRef} name="placed-furniture">
      <group rotation={[0, rotationY, 0]}>
        <FurnitureVisual />
      </group>
    </group>
  );
}

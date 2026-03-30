import { DoubleSide, type Group } from 'three';
import { forwardRef } from 'react';

export const PlacementReticle = forwardRef<Group>(function PlacementReticle(_, ref) {
  return (
    <group ref={ref} name="placement-reticle">
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.09, 0.14, 48]} />
        <meshBasicMaterial
          color="#4db8ff"
          transparent
          opacity={0.92}
          depthWrite={false}
          side={DoubleSide}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <circleGeometry args={[0.025, 24]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.85} depthWrite={false} />
      </mesh>
    </group>
  );
});

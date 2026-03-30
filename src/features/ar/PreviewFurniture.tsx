import { usePlacementStore } from './placementStore';
import { FurnitureVisual } from './FurnitureVisual';

/** Non-immersive preview: fixed pose + shared Y rotation from controls. */
export function PreviewFurniture() {
  const rotationY = usePlacementStore((s) => s.rotationY);

  return (
    <group position={[0, 0, -0.65]} rotation={[0, rotationY, 0]}>
      <FurnitureVisual />
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.45, 48]} />
        <meshStandardMaterial color="#1a222d" metalness={0} roughness={0.92} />
      </mesh>
    </group>
  );
}

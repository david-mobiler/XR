import { useLayoutEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Box3, PerspectiveCamera, Vector3 } from 'three';
import { usePlacementStore } from './placementStore';
import { FurnitureVisual } from './FurnitureVisual';

/** Non-immersive preview: fixed pose + shared Y rotation from controls. */
export function PreviewFurniture() {
  const rotationY = usePlacementStore((s) => s.rotationY);
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  const modelRef = useRef<import('three').Group>(null);

  useLayoutEffect(() => {
    if (!(camera instanceof PerspectiveCamera)) return;
    const model = modelRef.current;
    if (!model) return;

    const box = new Box3().setFromObject(model);
    if (box.isEmpty()) return;

    const center = box.getCenter(new Vector3());
    const bounds = box.getSize(new Vector3());

    const vFov = (camera.fov * Math.PI) / 180;
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
    const fitHeightDistance = bounds.y / (2 * Math.tan(vFov / 2));
    const fitWidthDistance = bounds.x / (2 * Math.tan(hFov / 2));
    const distance = Math.max(fitHeightDistance, fitWidthDistance) * 1.2;

    const targetY = center.y + bounds.y * 0.08;
    camera.position.set(center.x, targetY, center.z + distance);
    camera.lookAt(center.x, targetY, center.z);
    camera.updateProjectionMatrix();
  }, [camera, rotationY, size.width, size.height]);

  return (
    <group position={[0, 0, -0.65]} rotation={[0, rotationY, 0]}>
      <group ref={modelRef}>
        <FurnitureVisual />
      </group>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.45, 48]} />
        <meshStandardMaterial color="#1a222d" metalness={0} roughness={0.92} />
      </mesh>
    </group>
  );
}

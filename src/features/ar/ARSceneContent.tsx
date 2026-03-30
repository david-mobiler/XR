import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import type { Group } from 'three';
import { IfInSessionMode, XROrigin, useXR } from '@react-three/xr';
import { HitTestReticleController } from './HitTestReticleController';
import { PlacementReticle } from './PlacementReticle';
import { PlacedFurniture } from './PlacedFurniture';
import { PreviewFurniture } from './PreviewFurniture';

export function ARSceneContent() {
  const reticleRef = useRef<Group>(null);
  const mode = useXR((s) => s.mode);
  const session = useXR((s) => s.session);
  const camera = useThree((s) => s.camera);

  const showStaticPreview = !session || mode !== 'immersive-ar';

  useEffect(() => {
    if (!showStaticPreview) return;
    camera.position.set(0, 0.9, 1.9);
    camera.lookAt(0, 0.45, -0.65);
    camera.updateProjectionMatrix();
  }, [camera, showStaticPreview]);

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 6, 4]} intensity={1.1} />

      <XROrigin position={[0, 0, 0]}>{showStaticPreview ? <PreviewFurniture /> : null}</XROrigin>

      <IfInSessionMode allow="immersive-ar">
        <PlacementReticle ref={reticleRef} />
        <HitTestReticleController reticleRef={reticleRef} />
        <PlacedFurniture />
      </IfInSessionMode>
    </>
  );
}

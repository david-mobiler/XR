import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import {
  Component,
  type ErrorInfo,
  type ReactNode,
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import type { Group } from 'three';
import { Box3, MathUtils, MeshBasicMaterial, Vector3 } from 'three';
import { FURNITURE_MODEL_URL, PLACEHOLDER_FURNITURE } from './furnitureConstants';
import { useFurnitureLoadStore } from './furnitureLoadStore';

type ErrorBoundaryProps = { children: ReactNode; fallback: ReactNode };
type ErrorBoundaryState = { hasError: boolean };

class FurnitureLoadErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('[AR Space Planner] Furniture GLB failed to load:', error.message, info.componentStack);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function FurniturePlaceholderBox() {
  const h = PLACEHOLDER_FURNITURE.heightM;
  return (
    <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
      <boxGeometry args={[PLACEHOLDER_FURNITURE.widthM, h, PLACEHOLDER_FURNITURE.depthM]} />
      <meshStandardMaterial color="#3d9cf5" metalness={0.12} roughness={0.5} />
    </mesh>
  );
}

/** Shown while Suspense waits on `useGLTF`; pairs with `furnitureLoadStore` for shell UI. */
function GlbSuspenseFallback() {
  const beginGlbLoad = useFurnitureLoadStore((s) => s.beginGlbLoad);
  const endGlbLoad = useFurnitureLoadStore((s) => s.endGlbLoad);

  useEffect(() => {
    beginGlbLoad();
    return () => endGlbLoad();
  }, [beginGlbLoad, endGlbLoad]);

  return <FurnitureLoadingShimmer />;
}

function FurnitureLoadingShimmer() {
  const h = PLACEHOLDER_FURNITURE.heightM;
  const matRef = useRef<MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    const m = matRef.current;
    if (m) {
      m.opacity = MathUtils.lerp(0.28, 0.55, (Math.sin(clock.elapsedTime * 2.4) + 1) / 2);
    }
  });

  return (
    <mesh position={[0, h / 2, 0]}>
      <boxGeometry args={[PLACEHOLDER_FURNITURE.widthM, h, PLACEHOLDER_FURNITURE.depthM]} />
      <meshBasicMaterial ref={matRef} color="#4db8ff" transparent opacity={0.4} wireframe />
    </mesh>
  );
}

function FurnitureGLTFScaled({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const rootRef = useRef<Group>(null);
  const clone = useMemo(() => scene.clone(true), [scene]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const box = new Box3().setFromObject(root);
    const size = box.getSize(new Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const t = PLACEHOLDER_FURNITURE;
    const maxTarget = Math.max(t.widthM, t.heightM, t.depthM);
    const s = maxTarget / maxDim;
    root.scale.setScalar(s);
    box.setFromObject(root);
    root.position.y = -box.min.y;
  }, [clone, url]);

  return (
    <group ref={rootRef}>
      <primitive object={clone} castShadow receiveShadow />
    </group>
  );
}

/** GLB path: error boundary → Suspense (loading shimmer + banner) → scaled model. */
function FurnitureGLBTree({ url }: { url: string }) {
  const fallbackBox = <FurniturePlaceholderBox />;

  return (
    <FurnitureLoadErrorBoundary fallback={fallbackBox}>
      <Suspense fallback={<GlbSuspenseFallback />}>
        <FurnitureGLTFScaled url={url} />
      </Suspense>
    </FurnitureLoadErrorBoundary>
  );
}

/**
 * Single catalog visual: placeholder box or optional GLB scaled to product dims.
 */
export function FurnitureVisual() {
  if (FURNITURE_MODEL_URL == null || FURNITURE_MODEL_URL === '') {
    return <FurniturePlaceholderBox />;
  }

  return <FurnitureGLBTree url={FURNITURE_MODEL_URL} />;
}

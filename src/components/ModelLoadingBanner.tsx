import { useFurnitureLoadStore } from '../features/ar/furnitureLoadStore';

export function ModelLoadingBanner() {
  const loading = useFurnitureLoadStore((s) => s.pendingGlbLoads > 0);
  if (!loading) return null;

  return (
    <div className="model-loading-banner" role="status" aria-live="polite">
      <span className="model-loading-banner__dot" aria-hidden />
      Loading 3D model…
    </div>
  );
}

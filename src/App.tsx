import { useStore } from 'zustand/react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ARContextAlerts } from './components/ARContextAlerts';
import { CameraBackground } from './components/CameraBackground';
import { LandingScreen } from './components/LandingScreen';
import { ModelLoadingBanner } from './components/ModelLoadingBanner';
import { TouchButton } from './components/TouchButton';
import { ARScene } from './features/ar/ARScene';
import { ARControls } from './features/ar/ARControls';
import { EnterImmersiveARButton } from './features/ar/EnterImmersiveARButton';
import { PlaceOnSurfaceButton } from './features/ar/PlaceOnSurfaceButton';
import { ProductInfoOverlay } from './features/ar/ProductInfoOverlay';
import { getPrimaryFocus, getSessionHeader } from './features/ar/sessionFlow';
import { rotateFurnitureLeft, rotateFurnitureRight, usePlacementStore } from './features/ar/placementStore';
import { arXRStore } from './features/ar/xrStore';
import { useImmersiveARSupport } from './hooks/useImmersiveARSupport';
import { useWebCamera } from './hooks/useWebCamera';

type AppView = 'landing' | 'ar';

function ARDockContent({
  variant,
  placementActive,
}: {
  variant: 'preview' | 'immersive';
  placementActive: boolean;
}) {
  const resetPlacement = usePlacementStore((s) => s.reset);
  const density = variant === 'immersive' ? 'compact' : 'comfortable';

  return (
    <>
      <ProductInfoOverlay
        name="Sample chair (placeholder)"
        widthCm={52}
        depthCm={55}
        heightCm={81}
        density={density}
        showScreenshotTip={variant === 'preview'}
      />
      {variant === 'immersive' ? <PlaceOnSurfaceButton /> : null}
      <ARControls
        onReset={resetPlacement}
        onRotateLeft={rotateFurnitureLeft}
        onRotateRight={rotateFurnitureRight}
        interactionsDisabled={variant === 'immersive' && !placementActive}
        resetDisabled={variant === 'preview' || !placementActive}
      />
    </>
  );
}

export default function App() {
  const [view, setView] = useState<AppView>('landing');
  const { support: arSupport, secureContext } = useImmersiveARSupport();
  const session = useStore(arXRStore, (s) => s.session);
  const isPlaced = usePlacementStore((s) => s.isPlaced);

  const immersiveSupported = arSupport === 'supported' && secureContext;
  const sessionActive = session != null;

  const {
    videoRef: cameraVideoRef,
    startCamera,
    stopCamera,
    isActive: cameraActive,
    isStarting: cameraStarting,
    error: cameraError,
    clearError: clearCameraError,
  } = useWebCamera({ preferEnvironmentFacing: true });

  const flowCtx = useMemo(
    () => ({
      sessionActive,
      immersiveSupported,
      cameraActive,
      isPlaced,
    }),
    [sessionActive, immersiveSupported, cameraActive, isPlaced],
  );

  const { title: headerTitle, subtitle: headerSubtitle } = useMemo(() => getSessionHeader(flowCtx), [flowCtx]);
  const primaryFocus = useMemo(() => getPrimaryFocus(flowCtx), [flowCtx]);

  const prevSessionRef = useRef<typeof session>(undefined);
  useEffect(() => {
    const prev = prevSessionRef.current;
    prevSessionRef.current = session;
    if (prev != null && session == null) {
      usePlacementStore.getState().reset();
    }
  }, [session]);

  useEffect(() => {
    if (session) stopCamera();
  }, [session, stopCamera]);

  const handleBack = useCallback(() => {
    session?.end().catch(() => {});
    stopCamera();
    clearCameraError();
    usePlacementStore.getState().reset();
    setView('landing');
  }, [session, stopCamera, clearCameraError]);

  const togglePreviewCamera = useCallback(() => {
    clearCameraError();
    if (cameraActive) {
      stopCamera();
      return;
    }
    void startCamera();
  }, [cameraActive, clearCameraError, startCamera, stopCamera]);

  if (view === 'landing') {
    return (
      <LandingScreen arSupport={arSupport} secureContext={secureContext} onStartAR={() => setView('ar')} />
    );
  }

  const showXRStrip = !immersiveSupported && !sessionActive;

  return (
    <div className="ar-shell">
      <header className="ar-shell__header">
        <button type="button" className="ar-shell__back" onClick={handleBack}>
          ← Back
        </button>
        <div className="ar-shell__header-center">
          <h1 className="ar-shell__title">{headerTitle}</h1>
          <p className="ar-shell__subtitle">{headerSubtitle}</p>
        </div>
        <div className="ar-shell__header-actions">
          {!sessionActive ? (
            <>
              <TouchButton
                type="button"
                variant="secondary"
                className={`ar-header__camera-btn ${primaryFocus === 'camera' ? 'touch-button--suggested' : ''}`.trim()}
                onClick={togglePreviewCamera}
                disabled={cameraStarting}
              >
                {cameraStarting ? 'Camera…' : cameraActive ? 'Stop camera' : 'Room camera'}
              </TouchButton>
              {immersiveSupported ? (
                <EnterImmersiveARButton recommended={primaryFocus === 'enter_ar'} />
              ) : null}
            </>
          ) : null}
        </div>
      </header>

      <ModelLoadingBanner />

      <ARContextAlerts
        cameraError={!sessionActive ? cameraError : null}
        onDismissCameraError={clearCameraError}
        showXRUnavailable={showXRStrip}
      />

      <main className="ar-shell__main ar-shell__main--with-camera">
        <CameraBackground videoRef={cameraVideoRef} active={cameraActive && !sessionActive} />
        <div className="ar-shell__canvas-stack">
          <ARScene
            overlayChildren={
              sessionActive ? (
                <div className="ar-overlay-stack">
                  <ARDockContent variant="immersive" placementActive={isPlaced} />
                </div>
              ) : null
            }
          />
        </div>
      </main>

      {sessionActive ? null : (
        <div className="ar-shell__dock">
          <ARDockContent variant="preview" placementActive={false} />
        </div>
      )}
    </div>
  );
}

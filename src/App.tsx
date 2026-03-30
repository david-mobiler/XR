import { useStore } from 'zustand/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LandingScreen } from './components/LandingScreen';
import { ModelLoadingBanner } from './components/ModelLoadingBanner';
import { ARScene } from './features/ar/ARScene';
import { ARControls } from './features/ar/ARControls';
import { EnterImmersiveARButton } from './features/ar/EnterImmersiveARButton';
import { PlaceOnSurfaceButton } from './features/ar/PlaceOnSurfaceButton';
import { ProductInfoOverlay } from './features/ar/ProductInfoOverlay';
import { UnsupportedMessage } from './features/ar/UnsupportedMessage';
import { rotateFurnitureLeft, rotateFurnitureRight, usePlacementStore } from './features/ar/placementStore';
import { arXRStore } from './features/ar/xrStore';
import { useImmersiveARSupport } from './hooks/useImmersiveARSupport';

type AppView = 'landing' | 'ar';

/**
 * `immersive` tree is mounted under XRDomOverlay (XR hooks work).
 * `preview` is mounted in the shell below the canvas (no XR hooks).
 */
function ARDockContent({ variant, placementActive }: { variant: 'preview' | 'immersive'; placementActive: boolean }) {
  const resetPlacement = usePlacementStore((s) => s.reset);

  return (
    <>
      <ProductInfoOverlay name="Sample chair (placeholder)" widthCm={52} depthCm={55} heightCm={81} />
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

  const prevSessionRef = useRef<typeof session>(undefined);
  useEffect(() => {
    const prev = prevSessionRef.current;
    prevSessionRef.current = session;
    if (prev != null && session == null) {
      usePlacementStore.getState().reset();
    }
  }, [session]);

  const handleBack = useCallback(() => {
    session?.end().catch(() => {});
    usePlacementStore.getState().reset();
    setView('landing');
  }, [session]);

  if (view === 'landing') {
    return (
      <LandingScreen arSupport={arSupport} secureContext={secureContext} onStartAR={() => setView('ar')} />
    );
  }

  return (
    <div className="ar-shell">
      <header className="ar-shell__header">
        <button type="button" className="ar-shell__back" onClick={handleBack}>
          ← Back
        </button>
        <span className="ar-shell__title">{session ? 'Immersive AR' : '3D preview'}</span>
        <div className="ar-shell__header-actions">
          {immersiveSupported && !session ? <EnterImmersiveARButton /> : null}
        </div>
      </header>

      <ModelLoadingBanner />

      <main className="ar-shell__main">
        <ARScene
          overlayChildren={
            session ? (
              <div className="ar-overlay-stack">
                <ARDockContent variant="immersive" placementActive={isPlaced} />
              </div>
            ) : null
          }
        />
      </main>

      {!immersiveSupported && !session ? (
        <div className="ar-shell__notice">
          <UnsupportedMessage title="Immersive AR unavailable">
            You’re viewing the 3D preview only. Fix HTTPS / localhost and use a supported browser (often Chrome on
            Android) to enable <code>immersive-ar</code>.
          </UnsupportedMessage>
        </div>
      ) : null}

      {session ? null : (
        <div className="ar-shell__dock">
          <ARDockContent variant="preview" placementActive={false} />
        </div>
      )}
    </div>
  );
}

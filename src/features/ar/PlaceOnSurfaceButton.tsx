import { useEffect, useRef, useState } from 'react';
import { Matrix4 } from 'three';
import { useXR, useXRRequestHitTest } from '@react-three/xr';
import { TouchButton } from '../../components/TouchButton';
import { usePlacementStore } from './placementStore';

/**
 * Lives inside XRDomOverlay so `useXRRequestHitTest` has XR context.
 * Runs a one-off viewer hit test at tap time (valid user gesture).
 */
export function PlaceOnSurfaceButton() {
  const session = useXR((s) => s.session);
  const mode = useXR((s) => s.mode);
  const isPlaced = usePlacementStore((s) => s.isPlaced);
  const setPlacedFromHitMatrix = usePlacementStore((s) => s.setPlacedFromHitMatrix);
  const requestHitTest = useXRRequestHitTest();
  const matrixScratch = useRef(new Matrix4());
  const [placeHint, setPlaceHint] = useState<string | null>(null);
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (hintTimer.current) clearTimeout(hintTimer.current);
    },
    [],
  );

  if (!session || mode !== 'immersive-ar' || isPlaced) return null;

  function flashHint(text: string) {
    if (hintTimer.current) clearTimeout(hintTimer.current);
    setPlaceHint(text);
    hintTimer.current = setTimeout(() => setPlaceHint(null), 3200);
  }

  async function handlePlace() {
    setPlaceHint(null);
    const hit = await requestHitTest('viewer', ['plane', 'mesh']);
    if (!hit?.results.length) {
      flashHint('No surface found — point at the floor or a table and try again.');
      return;
    }
    const ok = hit.getWorldMatrix(matrixScratch.current, hit.results[0]);
    if (ok) {
      setPlacedFromHitMatrix(matrixScratch.current);
    } else {
      flashHint('Could not read that hit — move slightly and try again.');
    }
  }

  return (
    <div className="ar-place-row ar-place-row--smart-next">
      <TouchButton type="button" variant="secondary" onClick={() => void handlePlace()}>
        Place on surface
      </TouchButton>
      {placeHint ? (
        <p className="ar-place-feedback" role="status">
          {placeHint}
        </p>
      ) : null}
      <p className="ar-place-hint">Point at a floor or table, then tap.</p>
    </div>
  );
}

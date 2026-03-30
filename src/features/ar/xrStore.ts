import { createXRStore } from '@react-three/xr';

/**
 * Single app-wide XR store. Passed to <XR store={…}> inside R3F <Canvas>.
 * - offerSession: false → no automatic session prompts; we call enterAR() from a button only.
 * - controller/hand/gaze off → handheld phone AR without VR controller models.
 * - bounded: false → typical unbounded world-scale AR.
 * - hitTest: true → session requests hit-test (used in Phase 3).
 */
export const arXRStore = createXRStore({
  offerSession: false,
  emulate: false,
  bounded: false,
  controller: false,
  hand: false,
  gaze: false,
  hitTest: true,
  domOverlay: true,
});

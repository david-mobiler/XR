/** SI meters — matches ProductInfoOverlay (cm) labels */
export const PLACEHOLDER_FURNITURE = {
  widthM: 0.52,
  heightM: 0.81,
  depthM: 0.55,
} as const;

/** Buttons: rotation per tap (15°) */
export const ROTATION_STEP_RAD = Math.PI / 12;

/**
 * Optional GLB under `public/` (e.g. `public/models/chair.glb` → `'/models/chair.glb'`).
 * Leave `undefined` for the placeholder box only.
 */
export const FURNITURE_MODEL_URL: string | undefined = '/models/chair.glb';
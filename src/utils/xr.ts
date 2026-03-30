export type ARSupportState = 'checking' | 'supported' | 'unsupported';

/**
 * WebXR immersive-ar requires a secure context (HTTPS or http://localhost).
 * Non-secure http://LAN_IP will not expose usable XR APIs on most browsers.
 */
export function getXRSecureContext(): boolean {
  if (typeof window === 'undefined') return false;
  return window.isSecureContext === true;
}

/**
 * Whether the WebXR API object exists (still need isSessionSupported for immersive-ar).
 */
export function isWebXRPresent(): boolean {
  return typeof navigator !== 'undefined' && navigator.xr != null;
}

export async function checkImmersiveARSupport(): Promise<boolean> {
  if (!isWebXRPresent()) return false;
  try {
    return await navigator.xr!.isSessionSupported('immersive-ar');
  } catch {
    return false;
  }
}

export async function getImmersiveARSupportState(): Promise<ARSupportState> {
  const ok = await checkImmersiveARSupport();
  return ok ? 'supported' : 'unsupported';
}

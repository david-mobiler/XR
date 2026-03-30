/** `getUserMedia` requires a secure context like WebXR (HTTPS or localhost). */
export function isCameraAccessSupported(): boolean {
  return typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia;
}

export type WebCameraConstraintsOptions = {
  /** Prefer rear camera on phones. */
  preferEnvironmentFacing?: boolean;
};

export function buildVideoTrackConstraints(options: WebCameraConstraintsOptions = {}): MediaTrackConstraints {
  const preferEnv = options.preferEnvironmentFacing !== false;
  return {
    facingMode: preferEnv ? { ideal: 'environment' } : { ideal: 'user' },
    width: { ideal: 1280 },
    height: { ideal: 720 },
  };
}

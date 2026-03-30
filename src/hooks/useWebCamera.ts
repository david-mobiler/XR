import { useCallback, useEffect, useRef, useState } from 'react';
import { buildVideoTrackConstraints, isCameraAccessSupported } from '../utils/camera';

export type UseWebCameraOptions = {
  preferEnvironmentFacing?: boolean;
};

/**
 * Starts/stops `navigator.mediaDevices.getUserMedia` for video only.
 * Must be called from a user gesture for browsers to show the permission prompt.
 * Stops tracks on unmount. Use behind a transparent WebGL canvas for “see-through” preview.
 */
export function useWebCamera(requestOptions: UseWebCameraOptions = {}) {
  const preferEnvironmentFacing = requestOptions.preferEnvironmentFacing ?? true;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    const el = videoRef.current;
    if (el) {
      el.srcObject = null;
    }
    setIsActive(false);
  }, []);

  const startCamera = useCallback(async () => {
    if (!isCameraAccessSupported()) {
      setError('Camera is not available in this browser.');
      return;
    }
    if (typeof window !== 'undefined' && !window.isSecureContext) {
      setError('Camera needs HTTPS or localhost (secure context).');
      return;
    }

    setError(null);
    setIsStarting(true);

    try {
      stopCamera();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: buildVideoTrackConstraints({ preferEnvironmentFacing }),
        audio: false,
      });
      streamRef.current = stream;
      const el = videoRef.current;
      if (el) {
        el.srcObject = stream;
        await el.play().catch(() => {});
      }
      setIsActive(true);
    } catch (e) {
      const message =
        e instanceof Error
          ? e.name === 'NotAllowedError'
            ? 'Camera permission denied.'
            : e.message
          : 'Could not open camera.';
      setError(message);
      setIsActive(false);
    } finally {
      setIsStarting(false);
    }
  }, [preferEnvironmentFacing, stopCamera]);

  useEffect(() => () => stopCamera(), [stopCamera]);

  return {
    videoRef,
    startCamera,
    stopCamera,
    isActive,
    isStarting,
    error,
    clearError: () => setError(null),
  };
}

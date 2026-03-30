import type { RefObject } from 'react';

type CameraBackgroundProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
  /** Stream bound and playing */
  active: boolean;
};

/**
 * Full-bleed `<video>` under the Three.js canvas (canvas must stay alpha-capable).
 */
export function CameraBackground({ videoRef, active }: CameraBackgroundProps) {
  return (
    <video
      ref={videoRef}
      className={`ar-shell__camera-bg ${active ? 'ar-shell__camera-bg--visible' : ''}`}
      playsInline
      muted
      autoPlay
      aria-hidden={!active}
    />
  );
}

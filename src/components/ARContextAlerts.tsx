type ARContextAlertsProps = {
  cameraError: string | null;
  onDismissCameraError: () => void;
  showXRUnavailable: boolean;
  showFallbackActive?: boolean;
};

/**
 * Priority-ranked contextual alerts: camera error, then XR availability (non-immersive only).
 */
export function ARContextAlerts({
  cameraError,
  onDismissCameraError,
  showXRUnavailable,
  showFallbackActive = false,
}: ARContextAlertsProps) {
  if (cameraError) {
    return (
      <div className="ar-alert ar-alert--error" role="alert">
        <span className="ar-alert__msg">{cameraError}</span>
        <button type="button" className="ar-alert__dismiss" onClick={onDismissCameraError} aria-label="Dismiss">
          ×
        </button>
      </div>
    );
  }

  if (showXRUnavailable) {
    return (
      <div className="ar-alert ar-alert--warn">
        <span className="ar-alert__msg">
          <strong>Limited mode.</strong> Immersive AR is not available — preview and camera still work. Use{' '}
          <strong>HTTPS</strong> and <strong>Chrome (Android)</strong> for full AR.
        </span>
      </div>
    );
  }

  if (showFallbackActive) {
    return (
      <div className="ar-alert ar-alert--info">
        <span className="ar-alert__msg">
          <strong>Fallback AR active.</strong> Camera preview is on. Move your phone to compare scale, rotate/zoom
          the model, and take a screenshot if needed.
        </span>
      </div>
    );
  }

  return null;
}

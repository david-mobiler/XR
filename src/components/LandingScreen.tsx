import { ARSessionButton } from '../features/ar/ARSessionButton';
import { UnsupportedMessage } from '../features/ar/UnsupportedMessage';
import type { ARSupportState } from '../utils/xr';
import { TouchButton } from './TouchButton';
import { OnboardingHint } from './OnboardingHint';

type LandingScreenProps = {
  arSupport: ARSupportState;
  secureContext: boolean;
  onStartAR: () => void;
  onStartFallbackAR?: () => void;
};

export function LandingScreen({
  arSupport,
  secureContext,
  onStartAR,
  onStartFallbackAR,
}: LandingScreenProps) {
  const checking = arSupport === 'checking';
  const unsupported = arSupport === 'unsupported';
  const startLabel = unsupported ? 'Open 3D workspace' : checking ? 'Checking support…' : 'Start AR';

  return (
    <div className="landing">
      <span className="landing__badge">Portfolio · MVP</span>
      <h1 className="landing__title">AR Space Planner</h1>
      <p className="landing__lead">
        See whether this piece fits your space—preview in 3D first, then step into AR on a supported phone.
      </p>
      <OnboardingHint />
      <ul className="landing__list">
        <li>Real-world placement with surface detection</li>
        <li>Dimensions shown in centimeters</li>
        <li>Rotate and reset without leaving AR</li>
      </ul>

      {unsupported ? (
        <UnsupportedMessage title="Immersive AR isn’t available here">
          This browser or device doesn’t expose WebXR <code>immersive-ar</code>, or the check failed. Try{' '}
          <strong>Chrome on a recent Android</strong> over <strong>HTTPS</strong> or <strong>localhost</strong>.
          iPhone Safari often differs from Android — use a supported stack for reliable AR. You can still open the
          3D preview on the next screen.
        </UnsupportedMessage>
      ) : null}

      {!secureContext ? (
        <UnsupportedMessage title="Secure context required for WebXR">
          Use <strong>https://</strong> or <strong>http://localhost</strong>. Opening the site as{' '}
          <code>http://192.168.x.x</code> usually blocks WebXR even if the device supports AR.
        </UnsupportedMessage>
      ) : null}

      <div className="landing__footer">
        <ARSessionButton onClick={onStartAR} disabled={checking} label={startLabel} />
        {unsupported ? (
          <div className="landing__fallback-cta">
            <TouchButton type="button" variant="secondary" onClick={onStartFallbackAR}>
              Start fallback AR (camera)
            </TouchButton>
          </div>
        ) : null}
        <p className="landing__hint">
          {unsupported ? (
            <>
              Immersive AR will be hidden on the next screen — you can still use the <strong>room camera</strong> and
              rotate the model.
            </>
          ) : (
            <>
              On the next screen, use <strong>Enter immersive AR</strong> on a supported phone (often a second tap is
              required by the browser).
            </>
          )}
        </p>
      </div>
    </div>
  );
}

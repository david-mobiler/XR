import { useState } from 'react';
import { TouchButton } from '../../components/TouchButton';
import { formatSessionError } from '../../utils/xrErrors';
import { arXRStore } from './xrStore';

type EnterImmersiveARButtonProps = {
  disabled?: boolean;
};

export function EnterImmersiveARButton({ disabled }: EnterImmersiveARButtonProps) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleEnter() {
    setError(null);
    setBusy(true);
    try {
      await arXRStore.enterAR();
    } catch (e) {
      setError(formatSessionError(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="enter-ar">
      <TouchButton onClick={() => void handleEnter()} disabled={disabled || busy}>
        {busy ? 'Starting…' : 'Enter immersive AR'}
      </TouchButton>
      {error ? (
        <p className="enter-ar__error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

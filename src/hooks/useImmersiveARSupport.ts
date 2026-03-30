import { useEffect, useState } from 'react';
import type { ARSupportState } from '../utils/xr';
import { getImmersiveARSupportState, getXRSecureContext } from '../utils/xr';

export function useImmersiveARSupport(): {
  support: ARSupportState;
  secureContext: boolean;
} {
  const [support, setSupport] = useState<ARSupportState>('checking');
  const [secureContext, setSecureContext] = useState(true);

  useEffect(() => {
    setSecureContext(getXRSecureContext());
    let cancelled = false;
    getImmersiveARSupportState().then((s) => {
      if (!cancelled) setSupport(s);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return { support, secureContext };
}

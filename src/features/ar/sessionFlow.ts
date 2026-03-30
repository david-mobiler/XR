export type SessionFlowContext = {
  sessionActive: boolean;
  immersiveSupported: boolean;
  cameraActive: boolean;
  isPlaced: boolean;
};

export function getSessionHeader(ctx: SessionFlowContext): { title: string; subtitle: string } {
  if (ctx.sessionActive) {
    if (ctx.isPlaced) {
      return {
        title: 'Placed in your space',
        subtitle: 'Use ↺ / ↻ to pivot the piece, or Reset to pick a new spot.',
      };
    }
    return {
      title: 'Place furniture',
      subtitle: 'Move until the blue ring steadies on a surface, then tap Place below.',
    };
  }

  if (ctx.cameraActive) {
    return {
      title: 'Live camera + model',
      subtitle: ctx.immersiveSupported
        ? 'When you are ready, enter immersive AR for real scale on surfaces.'
        : 'AR is not available here — use this view to preview size against your room.',
    };
  }

  if (!ctx.immersiveSupported) {
    return {
      title: '3D preview',
      subtitle: 'Immersive AR is not available in this browser — preview and rotate the model here.',
    };
  }

  return {
    title: '3D preview',
    subtitle: 'Optional: turn on the room camera, or go straight to immersive AR on your phone.',
  };
}

/**
 * Highlights the best next control: AR entry, room camera (AR-off devices), place, or post-place tools.
 */
export function getPrimaryFocus(ctx: SessionFlowContext): 'enter_ar' | 'camera' | 'place' | 'placed_actions' | 'none' {
  if (ctx.sessionActive) {
    return ctx.isPlaced ? 'placed_actions' : 'place';
  }
  if (!ctx.immersiveSupported) {
    return ctx.cameraActive ? 'none' : 'camera';
  }
  return 'enter_ar';
}

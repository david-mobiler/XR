import { create } from 'zustand';

/**
 * Tracks in-flight GLB loads via Suspense fallbacks so the shell can show a lightweight banner.
 */
type LoadSlice = {
  pendingGlbLoads: number;
  beginGlbLoad: () => void;
  endGlbLoad: () => void;
};

export const useFurnitureLoadStore = create<LoadSlice>((set) => ({
  pendingGlbLoads: 0,
  beginGlbLoad: () => set((s) => ({ pendingGlbLoads: s.pendingGlbLoads + 1 })),
  endGlbLoad: () => set((s) => ({ pendingGlbLoads: Math.max(0, s.pendingGlbLoads - 1) })),
}));

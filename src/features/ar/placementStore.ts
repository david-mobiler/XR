import { Matrix4 } from 'three';
import { create } from 'zustand';
import { ROTATION_STEP_RAD } from './furnitureConstants';

type PlacementSlice = {
  isPlaced: boolean;
  placedMatrix: Matrix4;
  rotationY: number;
  previewZoom: number;
  reset: () => void;
  setPlacedFromHitMatrix: (worldMatrix: Matrix4) => void;
  rotateYBy: (delta: number) => void;
  zoomBy: (delta: number) => void;
};

export const usePlacementStore = create<PlacementSlice>((set) => ({
  isPlaced: false,
  placedMatrix: new Matrix4(),
  rotationY: 0,
  previewZoom: 1,
  reset: () =>
    set({
      isPlaced: false,
      placedMatrix: new Matrix4(),
      rotationY: 0,
      previewZoom: 1,
    }),
  setPlacedFromHitMatrix: (worldMatrix) =>
    set({
      isPlaced: true,
      placedMatrix: worldMatrix.clone(),
    }),
  rotateYBy: (delta) => set((s) => ({ rotationY: s.rotationY + delta })),
  zoomBy: (delta) =>
    set((s) => ({
      previewZoom: Math.min(1.8, Math.max(0.6, s.previewZoom + delta)),
    })),
}));

export function rotateFurnitureLeft() {
  usePlacementStore.getState().rotateYBy(-ROTATION_STEP_RAD);
}

export function rotateFurnitureRight() {
  usePlacementStore.getState().rotateYBy(ROTATION_STEP_RAD);
}

export function zoomInPreview() {
  usePlacementStore.getState().zoomBy(-0.1);
}

export function zoomOutPreview() {
  usePlacementStore.getState().zoomBy(0.1);
}

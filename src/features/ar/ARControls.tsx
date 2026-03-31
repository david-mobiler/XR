import { TouchButton } from '../../components/TouchButton';

type ARControlsProps = {
  onReset: () => void;
  onRotateLeft: () => void;
  onRotateRight: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  /** When true, rotate buttons do nothing (e.g. immersive mode before placement). */
  interactionsDisabled?: boolean;
  /** Reset only after something is placed (Phase 3). */
  resetDisabled?: boolean;
  /** Disable zoom buttons when not in preview mode. */
  zoomDisabled?: boolean;
};

export function ARControls({
  onReset,
  onRotateLeft,
  onRotateRight,
  onZoomIn,
  onZoomOut,
  interactionsDisabled = true,
  resetDisabled,
  zoomDisabled = true,
}: ARControlsProps) {
  return (
    <div className="ar-controls">
      <TouchButton
        type="button"
        variant="secondary"
        className="touch-button--icon"
        onClick={onZoomOut}
        disabled={zoomDisabled}
        aria-label="Zoom out"
      >
        −
      </TouchButton>
      <TouchButton
        type="button"
        variant="secondary"
        className="touch-button--icon"
        onClick={onRotateLeft}
        disabled={interactionsDisabled}
        aria-label="Rotate left"
      >
        ↺
      </TouchButton>
      <TouchButton type="button" variant="secondary" onClick={onReset} disabled={resetDisabled}>
        Reset
      </TouchButton>
      <TouchButton
        type="button"
        variant="secondary"
        className="touch-button--icon"
        onClick={onRotateRight}
        disabled={interactionsDisabled}
        aria-label="Rotate right"
      >
        ↻
      </TouchButton>
      <TouchButton
        type="button"
        variant="secondary"
        className="touch-button--icon"
        onClick={onZoomIn}
        disabled={zoomDisabled}
        aria-label="Zoom in"
      >
        +
      </TouchButton>
    </div>
  );
}

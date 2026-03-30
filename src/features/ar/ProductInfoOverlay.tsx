type ProductInfoOverlayProps = {
  name: string;
  widthCm: number;
  depthCm: number;
  heightCm: number;
  showScreenshotTip?: boolean;
  /** Tighter summary when dock space is scarce (immersive overlay). */
  density?: 'comfortable' | 'compact';
};

function formatCm(value: number) {
  return `${value} cm`;
}

export function ProductInfoOverlay({
  name,
  widthCm,
  depthCm,
  heightCm,
  showScreenshotTip = true,
  density = 'comfortable',
}: ProductInfoOverlayProps) {
  if (density === 'compact') {
    return (
      <aside
        className="product-info product-info--compact"
        aria-label={`${name}, ${widthCm} by ${depthCm} by ${heightCm} centimeters`}
      >
        <div className="product-info__row">
          <span className="product-info__name-compact">{name}</span>
          <span className="product-info__dims-inline">
            {widthCm} × {depthCm} × {heightCm} cm
          </span>
        </div>
      </aside>
    );
  }

  return (
    <aside className="product-info" aria-label="Product dimensions">
      <h2 className="product-info__name">{name}</h2>
      <div className="product-info__dims">
        <div className="product-info__dim">
          <strong>Width</strong>
          {formatCm(widthCm)}
        </div>
        <div className="product-info__dim">
          <strong>Depth</strong>
          {formatCm(depthCm)}
        </div>
        <div className="product-info__dim">
          <strong>Height</strong>
          {formatCm(heightCm)}
        </div>
      </div>
      {showScreenshotTip ? (
        <p className="product-info__tip">Tip: use your phone's screenshot to keep a layout photo.</p>
      ) : null}
    </aside>
  );
}

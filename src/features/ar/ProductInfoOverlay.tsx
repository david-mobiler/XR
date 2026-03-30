type ProductInfoOverlayProps = {
  name: string;
  widthCm: number;
  depthCm: number;
  heightCm: number;
  /** One-line tip about saving a view (Phase 5). */
  showScreenshotTip?: boolean;
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
}: ProductInfoOverlayProps) {
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

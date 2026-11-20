import type { CSSProperties, ReactNode } from 'react';

type BoardGridProps = {
  size: number;
  description: string;
  children?: ReactNode;
};

export function BoardGrid({ size, description, children }: BoardGridProps) {
  const labels = Array.from({ length: size }, (_, index) => index);
  const gridStyle: CSSProperties & { '--grid-size': number } = {
    '--grid-size': size,
  };

  return (
    <div className="coordinate-grid" style={gridStyle}>
      <div className="coordinates column-labels" aria-hidden="true">
        {labels.map((label) => <span key={label}>{label}</span>)}
      </div>
      <div className="coordinates row-labels" aria-hidden="true">
        {labels.map((label) => <span key={label}>{label}</span>)}
      </div>

      <div id="board" role="img" aria-label={description}>
        {children}
      </div>
    </div>
  );
}

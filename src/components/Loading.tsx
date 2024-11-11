export const Loading: React.FC = () => (
  <div className="page-loading">
    {Array(3)
      .fill(0)
      .map((_, i) => (
        <div key={`page-loading-${i}`} className="page-bg-primary" style={{ "--i": i } as React.CSSProperties}></div>
      ))}
  </div>
);

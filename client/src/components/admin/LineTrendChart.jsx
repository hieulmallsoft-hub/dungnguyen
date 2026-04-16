import { formatCompactNumber } from '../../data/adminHelpers';

function LineTrendChart({ data }) {
  const width = 720;
  const height = 260;
  const padding = 24;
  const maxValue = Math.max(...data.map((item) => item.applications));
  const stepX = (width - padding * 2) / Math.max(data.length - 1, 1);

  const points = data
    .map((item, index) => {
      const x = padding + index * stepX;
      const y = height - padding - (item.applications / maxValue) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(' ');

  const area = `${padding},${height - padding} ${points} ${width - padding},${height - padding}`;

  return (
    <div className="admin-card-dark p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-white/60">Xu hướng ứng tuyển</p>
          <h3 className="mt-1 font-display text-2xl">{formatCompactNumber(data[data.length - 1].applications)} lượt ứng tuyển</h3>
        </div>
        <p className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
          9 tháng gần đây
        </p>
      </div>
      <div className="mt-6 overflow-hidden rounded-[24px] border border-white/10 bg-white/5 p-4">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-64 w-full">
          {[0.2, 0.4, 0.6, 0.8].map((ratio) => {
            const y = height - padding - ratio * (height - padding * 2);
            return <line key={ratio} x1={padding} y1={y} x2={width - padding} y2={y} stroke="rgba(255,255,255,0.08)" />;
          })}
          <polygon points={area} fill="rgba(242,77,54,0.18)" />
          <polyline points={points} fill="none" stroke="#ff7b67" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {data.map((item, index) => {
            const x = padding + index * stepX;
            const y = height - padding - (item.applications / maxValue) * (height - padding * 2);
            return (
              <g key={item.month}>
                <circle cx={x} cy={y} r="5" fill="#fff" stroke="#ff7b67" strokeWidth="3" />
                <text x={x} y={height - 6} textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="12">
                  {item.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default LineTrendChart;

import { motion, AnimatePresence } from 'framer-motion';
import { formatCompactNumber } from '../../data/adminHelpers';

function LineTrendChart({ data, title = 'Phân tích hoạt động' }) {
  const width = 720;
  const height = 280;
  const padding = 40;

  const maxVal = Math.max(
    1,
    ...data.map((item) => Math.max(item.applications || 0, item.users || 0, item.jobs || 0))
  );

  const stepX = (width - padding * 2) / Math.max(data.length - 1, 1);

  const getPathData = (key) => {
    if (data.length === 0) return '';
    return data
      .map((item, index) => {
        const x = padding + index * stepX;
        const val = item[key] || 0;
        const y = height - padding - (val / maxVal) * (height - padding * 2.5);
        return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  };

  const getAreaPathData = (key) => {
    const linePath = getPathData(key);
    if (!linePath) return '';
    return `${linePath} L ${padding + (data.length - 1) * stepX} ${height - padding} L ${padding} ${height - padding} Z`;
  };

  const lines = [
    { key: 'applications', label: 'Ứng tuyển', color: '#f24d36', shadow: 'rgba(242,77,54,0.15)' },
    { key: 'users', label: 'Người dùng', color: '#6366f1', shadow: 'rgba(99,102,241,0.15)' },
    { key: 'jobs', label: 'Việc làm', color: '#f59e0b', shadow: 'rgba(245,158,11,0.15)' }
  ];

  return (
    <div className="admin-card-dark p-6 overflow-hidden relative group">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <p className="text-sm font-semibold tracking-wider text-white/40 uppercase">{title}</p>
          <div className="mt-2 flex items-baseline gap-3">
            <h3 className="font-display text-4xl font-bold text-white tabular-nums">
              {formatCompactNumber(data.reduce((acc, curr) => acc + (curr.applications || 0), 0))}
            </h3>
            <span className="text-xs font-medium text-white/30 bg-white/5 px-2 py-1 rounded-md border border-white/10">
              Tổng quan kỳ này
            </span>
          </div>
        </motion.div>
        
        <div className="flex flex-wrap gap-6">
          {lines.map((line, idx) => (
            <motion.div 
              key={line.key} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-2.5"
            >
              <div className="h-2.5 w-2.5 rounded-full shadow-lg" style={{ backgroundColor: line.color, boxShadow: `0 0 10px ${line.color}44` }}></div>
              <span className="text-[11px] font-bold text-white/60 tracking-wide uppercase">{line.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-10 relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
          {/* Enhanced Grid */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = height - padding - ratio * (height - padding * 2.5);
            return (
              <g key={ratio}>
                <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <motion.text 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  x={padding - 12} y={y + 4} textAnchor="end" fill="white" fontSize="9" fontWeight="600"
                >
                  {formatCompactNumber(Math.round(ratio * maxVal))}
                </motion.text>
              </g>
            );
          })}

          <AnimatePresence mode="wait">
            <g key={data.length}> {/* Force re-render group when point count changes drastically for cleaner morphing */}
              {lines.map((line) => (
                <g key={line.key}>
                  <motion.path
                    d={getAreaPathData(line.key)}
                    fill={line.shadow}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                  />
                  <motion.path
                    d={getPathData(line.key)}
                    fill="none"
                    stroke={line.color}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "anticipate" }}
                  />
                </g>
              ))}
            </g>
          </AnimatePresence>

          {/* Time axis labels */}
          {data.filter((_, i) => data.length < 15 || i % Math.ceil(data.length / 10) === 0).map((item, index) => {
            const actualIndex = data.indexOf(item);
            const x = padding + actualIndex * stepX;
            return (
              <text
                key={actualIndex}
                x={x}
                y={height - 8}
                textAnchor="middle"
                fill="rgba(255,255,255,0.2)"
                fontSize="10"
                fontWeight="700"
              >
                {item.month}
              </text>
            );
          })}
        </svg>

        {/* Floating Tooltip Mockup (visual only) */}
        <div className="absolute top-0 right-0 pointer-events-none p-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl shadow-2xl">
             <p className="text-[10px] text-white/50 font-bold uppercase">Báo cáo chi tiết</p>
             <p className="text-white text-xs mt-1 font-medium">Dữ liệu thời gian thực</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LineTrendChart;

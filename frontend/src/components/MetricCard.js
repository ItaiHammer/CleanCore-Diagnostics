import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';

const MetricCard = ({ metric, data, history, index }) => {
  const metricsCardVarients = {
    initial: {
      y: 100,
      opacity: 0,
    },
    animate: (custom) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: custom * 0.1,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <motion.div
      custom={index}
      variants={metricsCardVarients}
      initial="initial"
      animate="animate"
      className="metric-card"
    >
      <div className="metric-header">
        <div className="metric-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
              <rect width="16" height="16" x="4" y="4" rx="2"/>
              <rect width="6" height="6" x="9" y="9" rx="1"/>
              <path d="M15 2v2m0 16v2M2 15h2M2 9h2m16 6h2m-2-6h2M9 2v2m0 16v2"/>
            </g>
          </svg>
        </div>
        <div className="cpu-header-content">
          <div className="cpu-title-group">
            <h3>{metric}</h3>
            <div className="cpu-stats">
              <span className="cpu-percent">{metric === 'CPU' ? `${data.usage}%` : `${data.percent}%`}</span>
              <span className="cpu-speed">{metric === 'CPU' ? `${data.speed}GHz` : `${data.used}GB`}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="utilization-label">% Utilization / 60s</div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={140}>
          <LineChart data={history} isAnimationActive={false}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#FEDE54" />
                <stop offset="100%" stopColor="#FE2B78" />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="usage"
              stroke="url(#lineGradient)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
              animationBegin={0}
              animationDuration={0}
            />
            <XAxis dataKey="time" hide />
            <YAxis hide domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} />
            <CartesianGrid stroke="#2A2B2E" strokeDasharray="0" vertical={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default MetricCard;

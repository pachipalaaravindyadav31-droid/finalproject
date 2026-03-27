import { memo } from 'react';
import '../styles/MetricCard.css';

const MetricCard = memo(({ 
  title, 
  value, 
  unit = '', 
  icon = '📈', 
  trend = null, 
  color = 'blue',
  lastUpdated = null 
}) => {
  const isPositiveTrend = trend && trend > 0;
  const isNegativeTrend = trend && trend < 0;

  return (
    <div className={`metric-card metric-card-${color}`}>
      <div className="metric-header">
        <h3 className="metric-title">{title}</h3>
        <span className="metric-icon">{icon}</span>
      </div>

      <div className="metric-content">
        <div className="metric-value">
          <span className="value">{value}</span>
          <span className="unit">{unit}</span>
        </div>

        {trend !== null && (
          <div className={`metric-trend ${isPositiveTrend ? 'positive' : isNegativeTrend ? 'negative' : ''}`}>
            <span className="trend-icon">
              {isPositiveTrend ? '📈' : isNegativeTrend ? '📉' : '→'}
            </span>
            <span className="trend-value">
              {isPositiveTrend ? '+' : ''}{trend}%
            </span>
          </div>
        )}
      </div>

      {lastUpdated && (
        <div className="metric-footer">
          <small className="last-updated">Updated: {lastUpdated}</small>
        </div>
      )}
    </div>
  );
});

MetricCard.displayName = 'MetricCard';

export default MetricCard;

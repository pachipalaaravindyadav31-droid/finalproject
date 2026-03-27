import { useState, useEffect, useCallback } from 'react';
import MetricCard from '../components/MetricCard';
import QuickOverview from '../components/QuickOverview';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    totalUsers: 15240,
    activeUsers: 8932,
    revenue: 47382,
    conversionRate: 3.24,
    pageViews: 245678,
    bounce: 42.5,
    avgSessionTime: 5.32,
    userRetention: 68,
  });

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [updateInterval, setUpdateInterval] = useState(5000); // 5 seconds default

  // Simulate real-time data updates
  const updateMetrics = useCallback(() => {
    setMetrics(prev => ({
      totalUsers: prev.totalUsers + Math.floor(Math.random() * 20),
      activeUsers: Math.max(1000, prev.activeUsers + Math.floor(Math.random() * 30 - 15)),
      revenue: prev.revenue + Math.floor(Math.random() * 500),
      conversionRate: Math.max(0.5, prev.conversionRate + (Math.random() * 0.3 - 0.15)),
      pageViews: prev.pageViews + Math.floor(Math.random() * 100),
      bounce: Math.max(20, Math.min(80, prev.bounce + (Math.random() * 2 - 1))),
      avgSessionTime: Math.max(1, prev.avgSessionTime + (Math.random() * 0.5 - 0.25)),
      userRetention: Math.max(30, Math.min(100, prev.userRetention + (Math.random() * 2 - 1))),
    }));
    setLastUpdate(new Date());
  }, []);

  // Auto-update metrics at specified interval
  useEffect(() => {
    const interval = setInterval(updateMetrics, updateInterval);
    return () => clearInterval(interval);
  }, [updateMetrics, updateInterval]);

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    // Simulate async data fetch
    await new Promise(resolve => setTimeout(resolve, 500));
    updateMetrics();
    setIsRefreshing(false);
  };

  const getFormattedTime = () => {
    return lastUpdate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h2 className="dashboard-title">Real-Time Analytics Dashboard</h2>
          <p className="dashboard-subtitle">Monitor your metrics in real-time</p>
        </div>

        <div className="header-controls">
          <div className="update-interval-control">
            <label htmlFor="interval" className="interval-label">Auto-update:</label>
            <select
              id="interval"
              value={updateInterval}
              onChange={(e) => setUpdateInterval(Number(e.target.value))}
              className="interval-select"
            >
              <option value={2000}>Every 2s</option>
              <option value={5000}>Every 5s</option>
              <option value={10000}>Every 10s</option>
              <option value={30000}>Every 30s</option>
            </select>
          </div>

          <button
            onClick={handleManualRefresh}
            className={`refresh-btn ${isRefreshing ? 'refreshing' : ''}`}
            disabled={isRefreshing}
            title="Refresh metrics now"
          >
            {isRefreshing ? '⟳ Refreshing...' : '⟳ Refresh'}
          </button>

          <div className="last-updated">
            <span className="update-indicator">🟢</span>
            <small>Updated: {getFormattedTime()}</small>
          </div>
        </div>
      </div>

      <QuickOverview
        totalUsers={metrics.totalUsers}
        activeUsers={metrics.activeUsers}
        revenue={metrics.revenue}
        conversionRate={metrics.conversionRate}
      />

      <div className="metrics-section">
        <h3 className="section-title">Performance Metrics</h3>
        <div className="metrics-grid">
          <MetricCard
            title="Total Users"
            value={metrics.totalUsers.toLocaleString()}
            unit="users"
            icon="👥"
            trend={Math.floor(Math.random() * 20 - 5)}
            color="blue"
            lastUpdated={getFormattedTime()}
          />

          <MetricCard
            title="Active Users"
            value={metrics.activeUsers.toLocaleString()}
            unit="active"
            icon="🔵"
            trend={Math.floor(Math.random() * 15 - 3)}
            color="green"
            lastUpdated={getFormattedTime()}
          />

          <MetricCard
            title="Revenue"
            value={`$${(metrics.revenue / 1000).toFixed(1)}`}
            unit="K"
            icon="💰"
            trend={Math.floor(Math.random() * 25 - 5)}
            color="purple"
            lastUpdated={getFormattedTime()}
          />

          <MetricCard
            title="Conversion Rate"
            value={metrics.conversionRate.toFixed(2)}
            unit="%"
            icon="🎯"
            trend={Math.floor(Math.random() * 10 - 3)}
            color="orange"
            lastUpdated={getFormattedTime()}
          />

          <MetricCard
            title="Page Views"
            value={(metrics.pageViews / 1000).toFixed(0)}
            unit="K"
            icon="📄"
            trend={Math.floor(Math.random() * 18 - 4)}
            color="red"
            lastUpdated={getFormattedTime()}
          />

          <MetricCard
            title="Bounce Rate"
            value={metrics.bounce.toFixed(1)}
            unit="%"
            icon="📊"
            trend={Math.floor(Math.random() * 5 - 3)}
            color="yellow"
            lastUpdated={getFormattedTime()}
          />

          <MetricCard
            title="Avg Session Time"
            value={metrics.avgSessionTime.toFixed(2)}
            unit="min"
            icon="⏱️"
            trend={Math.floor(Math.random() * 10 - 2)}
            color="pink"
            lastUpdated={getFormattedTime()}
          />

          <MetricCard
            title="User Retention"
            value={metrics.userRetention.toFixed(0)}
            unit="%"
            icon="📈"
            trend={Math.floor(Math.random() * 8 - 2)}
            color="teal"
            lastUpdated={getFormattedTime()}
          />
        </div>
      </div>

      <div className="dashboard-footer">
        <p className="footer-text">
          💡 Tip: Adjust the auto-update interval or manually refresh to see new data.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;

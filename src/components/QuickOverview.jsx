import { memo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/QuickOverview.css';

const QuickOverview = memo(({ totalUsers, activeUsers, revenue, conversionRate }) => {
  const { user } = useAuth();

  return (
    <div className="quick-overview">
      <div className="overview-header">
        <div className="welcome-section">
          <h1 className="welcome-title">Welcome, {user?.firstName}! 👋</h1>
          <p className="welcome-subtitle">Here's your analytics overview</p>
        </div>
        <div className="last-sync">
          <span className="sync-indicator">🟢</span>
          <small>Live Updates</small>
        </div>
      </div>

      <div className="overview-grid">
        <div className="overview-item">
          <div className="overview-label">Total Users</div>
          <div className="overview-value">{totalUsers.toLocaleString()}</div>
          <div className="overview-change positive">↑ 12% from last week</div>
        </div>

        <div className="overview-item">
          <div className="overview-label">Active Users</div>
          <div className="overview-value">{activeUsers.toLocaleString()}</div>
          <div className="overview-change positive">↑ 8% from last week</div>
        </div>

        <div className="overview-item">
          <div className="overview-label">Revenue</div>
          <div className="overview-value">${revenue.toLocaleString()}</div>
          <div className="overview-change positive">↑ 15% from last week</div>
        </div>

        <div className="overview-item">
          <div className="overview-label">Conversion Rate</div>
          <div className="overview-value">{conversionRate.toFixed(2)}%</div>
          <div className="overview-change negative">↓ 2% from last week</div>
        </div>
      </div>
    </div>
  );
});

QuickOverview.displayName = 'QuickOverview';

export default QuickOverview;

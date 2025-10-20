import React, { useState, useEffect } from 'react';
import { couponService } from '../../services/couponService';
import './CouponAnalytics.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CouponAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTimeRange, setSelectedTimeRange] = useState('30');
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  useEffect(() => {
    fetchAnalytics();
    fetchCoupons();
  }, [selectedTimeRange]);

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true);
      const data = await couponService.getCouponStats();
      setAnalytics(data);
      setError('');
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setError('Failed to load analytics data');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCoupons = async () => {
    try {
      const data = await couponService.getAllCoupons();
      setCoupons(data);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  const getSchoolUsageStats = (coupon) => {
    if (!coupon.usedBy || coupon.usedBy.length === 0) {
      return { total: 0, bySchool: {} };
    }

    const schoolStats = {};
    let total = 0;

    coupon.usedBy.forEach(usage => {
      if (usage.user && usage.user.school) {
        const school = usage.user.school;
        schoolStats[school] = (schoolStats[school] || 0) + 1;
        total++;
      }
    });

    return { total, bySchool: schoolStats };
  };

  const getUsagePercentage = (coupon) => {
    if (!coupon.maxUses) return 0;
    return Math.round((coupon.usageCount / coupon.maxUses) * 100);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="coupon-analytics">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="coupon-analytics">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Error Loading Analytics</h3>
          <p>{error}</p>
          <button onClick={fetchAnalytics} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="coupon-analytics">
      <div className="analytics-header">
        <h1>Coupon Analytics Dashboard</h1>
        <p>Comprehensive insights into coupon usage and performance</p>
      </div>

      {/* Overview Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🎫</div>
          <div className="stat-content">
            <h3>{analytics?.totalCoupons || 0}</h3>
            <p>Total Coupons</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{analytics?.activeCoupons || 0}</h3>
            <p>Active Coupons</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{analytics?.totalUsage || 0}</h3>
            <p>Total Usage</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⏰</div>
          <div className="stat-content">
            <h3>{analytics?.expiredCoupons || 0}</h3>
            <p>Expired Coupons</p>
          </div>
        </div>
      </div>

      {/* Usage Trend Chart */}
      {analytics?.usageTrend && analytics.usageTrend.length > 0 && (
        <div className="chart-section">
          <h2>Usage Trend (Last 30 Days)</h2>
          <div className="chart-container">
            <Bar
              data={{
                labels: analytics.usageTrend.map(day => day._id),
                datasets: [
                  {
                    label: 'Coupon Usage',
                    data: analytics.usageTrend.map(day => day.usage),
                    backgroundColor: 'rgba(59, 130, 246, 0.6)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 1,
                    borderRadius: 4,
                    borderSkipped: false,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true,
                    position: 'top',
                  },
                  title: {
                    display: false,
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                    title: {
                      display: true,
                      text: 'Number of Uses',
                    },
                  },
                  x: {
                    title: {
                      display: true,
                      text: 'Date',
                    },
                  },
                },
                interaction: {
                  intersect: false,
                  mode: 'index',
                },
              }}
            />
          </div>
        </div>
      )}

      {/* Top Performing Coupons */}
      {analytics?.topCoupons && analytics.topCoupons.length > 0 && (
        <div className="top-coupons-section">
          <h2>Top Performing Coupons</h2>
          <div className="top-coupons-list">
            {analytics.topCoupons.map((coupon, index) => (
              <div key={coupon._id} className="top-coupon-item">
                <div className="coupon-rank">#{index + 1}</div>
                <div className="coupon-info">
                  <h4>{coupon.couponName}</h4>
                  <p>{coupon.usageCount} uses</p>
                </div>
                <div className="coupon-performance">
                  <div className="performance-bar">
                    <div 
                      className="performance-fill"
                      style={{ width: `${getUsagePercentage(coupon)}%` }}
                    ></div>
                  </div>
                  <span className="performance-text">{getUsagePercentage(coupon)}% used</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Coupon Analysis */}
      {/* <div className="detailed-analysis">
        <h2>Detailed Coupon Analysis</h2>
        <div className="coupons-table-container">
          <table className="coupons-table">
            <thead>
              <tr>
                <th>Coupon Name</th>
                <th>Type</th>
                <th>Usage</th>
                <th>School Usage</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map(coupon => {
                const schoolStats = getSchoolUsageStats(coupon);
                const usagePercentage = getUsagePercentage(coupon);
                
                return (
                  <tr key={coupon._id}>
                    <td className="coupon-name-cell">
                      <strong>{coupon.couponName}</strong>
                    </td>
                    <td>
                      <span className={`type-badge type-${coupon.type}`}>
                        {coupon.type === 'specific' ? 'Specific' : 'General'}
                      </span>
                    </td>
                    <td>
                      <div className="usage-cell">
                        <span>{coupon.usageCount} / {coupon.maxUses || '∞'}</span>
                        {coupon.maxUses && (
                          <div className="usage-bar-small">
                            <div 
                              className="usage-fill-small"
                              style={{ width: `${usagePercentage}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="school-usage">
                        {Object.keys(schoolStats.bySchool).length > 0 ? (
                          <div className="school-stats">
                            {Object.entries(schoolStats.bySchool).slice(0, 2).map(([school, count]) => (
                              <div key={school} className="school-stat">
                                <span className="school-name">{school}</span>
                                <span className="school-count">{count}</span>
                              </div>
                            ))}
                            {Object.keys(schoolStats.bySchool).length > 2 && (
                              <span className="more-schools">
                                +{Object.keys(schoolStats.bySchool).length - 2} more
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="no-usage">No school usage</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${
                        !coupon.isActive ? 'inactive' : 
                        new Date() >= new Date(coupon.expiryDate) ? 'expired' : 'active'
                      }`}>
                        {!coupon.isActive ? 'Inactive' : 
                         new Date() >= new Date(coupon.expiryDate) ? 'Expired' : 'Active'}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="view-details-btn"
                        onClick={() => setSelectedCoupon(coupon)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div> */}

      {/* School-wise Usage Breakdown */}
      {/* <div className="school-breakdown">
        <h2>School-wise Usage Breakdown</h2>
        <div className="school-stats-grid">
          {coupons.map(coupon => {
            const schoolStats = getSchoolUsageStats(coupon);
            if (Object.keys(schoolStats.bySchool).length === 0) return null;
            
            return (
              <div key={coupon._id} className="school-breakdown-card">
                <h3>{coupon.couponName}</h3>
                <div className="school-list">
                  {Object.entries(schoolStats.bySchool).map(([school, count]) => (
                    <div key={school} className="school-item">
                      <span className="school-name">{school}</span>
                      <div className="school-usage-bar">
                        <div 
                          className="school-usage-fill"
                          style={{ 
                            width: `${(count / schoolStats.total) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <span className="school-count">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div> */}
    </div>
  );
};

export default CouponAnalytics;


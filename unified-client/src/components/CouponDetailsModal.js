import React from 'react';
import './CouponDetailsModal.css';

const CouponDetailsModal = ({ isOpen, onClose, coupon }) => {
  if (!isOpen || !coupon) return null;

  const getStatusBadge = (coupon) => {
    if (!coupon.isActive) {
      return <span className="status-badge inactive">Inactive</span>;
    }
    if (new Date() >= new Date(coupon.expiryDate)) {
      return <span className="status-badge expired">Expired</span>;
    }
    return <span className="status-badge active">Active</span>;
  };

  const getUsagePercentage = (coupon) => {
    if (!coupon.maxUses) return 0;
    return Math.round((coupon.usageCount / coupon.maxUses) * 100);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="coupon-details-overlay">
      <div className="coupon-details-modal">
        <div className="coupon-details-header">
          <h2>Coupon Details</h2>
          <button 
            className="coupon-details-close" 
            onClick={onClose}
          >
            ×
          </button>
        </div>
        
        <div className="coupon-details-body">
          <div className="coupon-info-section">
            <div className="coupon-name-section">
              <h3>{coupon.couponName}</h3>
              {getStatusBadge(coupon)}
            </div>
            
            <div className="coupon-stats">
              <div className="stat-item">
                <span className="stat-label">Type</span>
                <span className={`stat-value type-${coupon.type}`}>
                  {coupon.type === 'specific' ? 'Specific Users' : 'General Access'}
                </span>
              </div>
              
              <div className="stat-item">
                <span className="stat-label">Usage</span>
                <span className="stat-value">
                  {coupon.usageCount} / {coupon.maxUses || '∞'}
                </span>
              </div>
              
              {coupon.maxUses && (
                <div className="stat-item">
                  <span className="stat-label">Usage Percentage</span>
                  <div className="usage-bar-container">
                    <div className="usage-bar">
                      <div 
                        className="usage-fill"
                        style={{ width: `${getUsagePercentage(coupon)}%` }}
                      ></div>
                    </div>
                    <span className="usage-percentage">{getUsagePercentage(coupon)}%</span>
                  </div>
                </div>
              )}
              
              <div className="stat-item">
                <span className="stat-label">Created</span>
                <span className="stat-value">
                  {formatDate(coupon.createdAt)}
                </span>
              </div>
              
              <div className="stat-item">
                <span className="stat-label">Expires</span>
                <span className="stat-value">
                  {formatDate(coupon.expiryDate)}
                </span>
              </div>
            </div>
          </div>

          {coupon.assignedUsers && coupon.assignedUsers.length > 0 && (
            <div className="assigned-users-section">
              <h4>Assigned Users ({coupon.assignedUsers.length})</h4>
              <div className="assigned-users-list">
                {coupon.assignedUsers.map(user => (
                  <div key={user._id} className="assigned-user">
                    <div className="user-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-details">
                      <span className="user-name">{user.name}</span>
                      <span className="user-email">{user.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {coupon.usedBy && coupon.usedBy.length > 0 && (
            <div className="usage-history-section">
              <h4>Usage History ({coupon.usedBy.length})</h4>
              <div className="usage-history-list">
                {coupon.usedBy.map((usage, index) => (
                  <div key={index} className="usage-item">
                    <div className="user-avatar">
                      {usage.user?.name?.charAt(0).toUpperCase() || '?'}
                    </div>
                    <div className="usage-details">
                      <span className="user-name">
                        {usage.user?.name || 'Unknown User'}
                      </span>
                      <span className="usage-date">
                        Used on {formatDate(usage.usedAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {coupon.type === 'general' && (
            <div className="general-info-section">
              <h4>General Access Information</h4>
              <p>
                This coupon can be used by any user with the coupon code. 
                It has a maximum usage limit of {coupon.maxUses} times.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponDetailsModal;


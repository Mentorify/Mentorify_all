import React, { useState } from 'react';
import { useCouponAccess } from '../Hooks/useCouponAccess';
import CouponCodeModal from './CouponCodeModal';
import './ProtectedTestRoute.css';

const ProtectedTestRoute = ({ testName, children, fallbackComponent }) => {
  const { hasAccess, isChecking, grantAccess } = useCouponAccess(testName);
  const [showCouponModal, setShowCouponModal] = useState(false);

  if (isChecking) {
    return (
      <div className="test-loading">
        <div className="test-loading-spinner"></div>
        <p>Checking access...</p>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <>
        {fallbackComponent || (
          <div className="test-access-required">
            <div className="test-access-card">
              <div className="test-access-icon">🔒</div>
              <h2>Coupon Required</h2>
              <p>You need a valid coupon code to access the <strong>{testName}</strong> test.</p>
              <button 
                className="test-access-btn"
                onClick={() => setShowCouponModal(true)}
              >
                Enter Coupon Code
              </button>
            </div>
          </div>
        )}
        
        <CouponCodeModal
          isOpen={showCouponModal}
          onClose={() => setShowCouponModal(false)}
          onSuccess={grantAccess}
          testName={testName}
        />
      </>
    );
  }

  return children;
};

export default ProtectedTestRoute;


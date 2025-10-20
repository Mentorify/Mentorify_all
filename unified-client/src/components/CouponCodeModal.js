import React, { useState } from 'react';
import { couponService } from '../services/couponService';
import './CouponCodeModal.css';

const CouponCodeModal = ({ isOpen, onClose, onSuccess, testName }) => {
  const [couponCode, setCouponCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) {
      setError('Please enter a coupon code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // First validate coupon code
      const validateResponse = await couponService.validateCoupon(couponCode.trim());
      
      if (validateResponse.valid) {
        // If valid, use the coupon to update usage count
        const useResponse = await couponService.useCoupon(couponCode.trim());
        
        // Store coupon info in session storage for test access
        sessionStorage.setItem('validCoupon', JSON.stringify({
          code: couponCode.trim(),
          couponId: validateResponse.couponId,
          testName: testName,
          usageCount: useResponse.usageCount
        }));
        
        onSuccess(validateResponse);
        onClose();
      } else {
        setError(validateResponse.message || 'Invalid coupon code');
      }
    } catch (error) {
      console.error('Coupon validation error:', error);
      setError(error.response?.data?.message || 'Failed to validate coupon code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setCouponCode('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="coupon-modal-overlay">
      <div className="coupon-modal">
        <div className="coupon-modal-header">
          <h2>Enter Coupon Code</h2>
          <button 
            className="coupon-modal-close" 
            onClick={handleClose}
            disabled={isLoading}
          >
            ×
          </button>
        </div>
        
        <div className="coupon-modal-body">
          <p className="coupon-modal-description">
            To access the <strong>{testName}</strong> test, please enter your coupon code below.
          </p>
          
          <form onSubmit={handleSubmit} className="coupon-form">
            <div className="coupon-input-group">
              <label htmlFor="couponCode">Coupon Code</label>
              <input
                id="couponCode"
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Enter your coupon code"
                className="coupon-input"
                disabled={isLoading}
                autoFocus
              />
            </div>
            
            {error && (
              <div className="coupon-error">
                {error}
              </div>
            )}
            
            <div className="coupon-modal-actions">
              <button
                type="button"
                onClick={handleClose}
                className="coupon-btn-secondary"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="coupon-btn-primary"
                disabled={isLoading || !couponCode.trim()}
              >
                {isLoading ? (
                  <>
                    <span className="coupon-spinner"></span>
                    Loading Test...
                  </>
                ) : (
                  'Access Test'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CouponCodeModal;


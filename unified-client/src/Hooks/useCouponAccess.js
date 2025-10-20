import { useState, useEffect, useCallback } from 'react';
import { couponService } from '../services/couponService';

export const useCouponAccess = (testName) => {
  const [hasAccess, setHasAccess] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [couponInfo, setCouponInfo] = useState(null);

  const checkCouponAccess = useCallback(() => {
    try {
      const storedCoupon = sessionStorage.getItem('validCoupon');
      if (storedCoupon) {
        const coupon = JSON.parse(storedCoupon);
        if (coupon.testName === testName) {
          setHasAccess(true);
          setCouponInfo(coupon);
        }
      }
    } catch (error) {
      console.error('Error checking coupon access:', error);
    } finally {
      setIsChecking(false);
    }
  }, [testName]);

  useEffect(() => {
    checkCouponAccess();
  }, [checkCouponAccess]);

  const grantAccess = (couponData) => {
    setHasAccess(true);
    setCouponInfo(couponData);
    
    // Store in session storage
    sessionStorage.setItem('validCoupon', JSON.stringify({
      ...couponData,
      testName
    }));
  };

  const revokeAccess = () => {
    setHasAccess(false);
    setCouponInfo(null);
    sessionStorage.removeItem('validCoupon');
  };

  const useCoupon = async () => {
    if (!couponInfo?.code) return false;

    try {
      await couponService.useCoupon(couponInfo.code);
      return true;
    } catch (error) {
      console.error('Error using coupon:', error);
      return false;
    }
  };

  return {
    hasAccess,
    isChecking,
    couponInfo,
    grantAccess,
    revokeAccess,
    useCoupon
  };
};

export default useCouponAccess;

import api from '../api';

// Note: api instance already has baseURL='/api', so we only need the endpoint path
const COUPON_API_BASE = '/coupons';

export const couponService = {
  // Get all coupons
  getAllCoupons: async () => {
    try {
      const response = await api.get(COUPON_API_BASE);
      return response.data;
    } catch (error) {
      console.error('Error fetching coupons:', error);
      throw error;
    }
  },

  // Get coupon by ID
  getCouponById: async (id) => {
    try {
      const response = await api.get(`${COUPON_API_BASE}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching coupon:', error);
      throw error;
    }
  },

  // Create new coupon
  createCoupon: async (couponData) => {
    try {
      const response = await api.post(COUPON_API_BASE, couponData);
      return response.data;
    } catch (error) {
      console.error('Error creating coupon:', error);
      throw error;
    }
  },

  // Update coupon
  updateCoupon: async (id, couponData) => {
    try {
      const response = await api.put(`${COUPON_API_BASE}/${id}`, couponData);
      return response.data;
    } catch (error) {
      console.error('Error updating coupon:', error);
      throw error;
    }
  },

  // Delete coupon
  deleteCoupon: async (id) => {
    try {
      const response = await api.delete(`${COUPON_API_BASE}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting coupon:', error);
      throw error;
    }
  },

  // Toggle coupon status
  toggleCouponStatus: async (id) => {
    try {
      const response = await api.put(`${COUPON_API_BASE}/${id}/toggle`);
      return response.data;
    } catch (error) {
      console.error('Error toggling coupon status:', error);
      throw error;
    }
  },

  // Get coupon statistics
  getCouponStats: async () => {
    try {
      const response = await api.get(`${COUPON_API_BASE}/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching coupon stats:', error);
      throw error;
    }
  },

  // Validate coupon code (for test access)
  validateCoupon: async (couponCode) => {
    try {
      const response = await api.post(`${COUPON_API_BASE}/validate`, { couponCode });
      return response.data;
    } catch (error) {
      console.error('Error validating coupon:', error);
      throw error;
    }
  },

  // Use coupon (when user takes test)
  useCoupon: async (couponCode) => {
    try {
      const response = await api.post(`${COUPON_API_BASE}/use`, { couponCode });
      return response.data;
    } catch (error) {
      console.error('Error using coupon:', error);
      throw error;
    }
  }
};

export default couponService;


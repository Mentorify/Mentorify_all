import React, { useState, useEffect } from 'react';
import './CreateCouponModal.css';

const CreateCouponModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    couponName: '',
    type: 'general',
    assignedUsers: [],
    maxUses: '',
    expiryDate: ''
  });
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  useEffect(() => {
    if (userSearch) {
      const filtered = users.filter(user => 
        user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearch.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  }, [userSearch, users]);

  const fetchUsers = async () => {
    try {
      // Fetch users from the backend API
      const response = await fetch('/api/profile/students', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Failed to fetch users');
        setUsers([]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Convert coupon name to uppercase
    const processedValue = name === 'couponName' ? value.toUpperCase() : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
    
    if (name === 'type' && value === 'general') {
      setFormData(prev => ({
        ...prev,
        assignedUsers: []
      }));
    }
  };

  const handleUserSelect = (user) => {
    if (!formData.assignedUsers.find(u => u._id === user._id)) {
      setFormData(prev => ({
        ...prev,
        assignedUsers: [...prev.assignedUsers, user]
      }));
    }
    setUserSearch('');
    setFilteredUsers([]);
  };

  const handleUserRemove = (userId) => {
    setFormData(prev => ({
      ...prev,
      assignedUsers: prev.assignedUsers.filter(u => u._id !== userId)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validate form data before submission
      if (formData.type === 'specific' && formData.assignedUsers.length === 0) {
        setError('Please select at least one user for specific coupons');
        setIsLoading(false);
        return;
      }

      const submitData = {
        ...formData,
        couponName: formData.couponName.trim(),
        assignedUsers: formData.type === 'specific' ? formData.assignedUsers.map(u => u._id) : [],
        maxUses: formData.type === 'general' ? parseInt(formData.maxUses) : undefined,
        expiryDate: new Date(formData.expiryDate).toISOString()
      };

      console.log('Submitting coupon data:', submitData);
      await onSubmit(submitData);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create coupon');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      couponName: '',
      type: 'general',
      assignedUsers: [],
      maxUses: '',
      expiryDate: ''
    });
    setError('');
    setUserSearch('');
    setFilteredUsers([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="create-coupon-overlay">
      <div className="create-coupon-modal">
        <div className="create-coupon-header">
          <h2>Create New Coupon</h2>
          <button 
            className="create-coupon-close" 
            onClick={handleClose}
            disabled={isLoading}
          >
            ×
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="create-coupon-form">
          <div className="form-group">
            <label htmlFor="couponName">Coupon Name *</label>
            <input
              id="couponName"
              name="couponName"
              type="text"
              value={formData.couponName}
              onChange={handleInputChange}
              placeholder="Enter coupon name"
              required
              disabled={isLoading}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Coupon Type *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="form-select"
            >
              <option value="general">General Access</option>
              <option value="specific">Specific Users</option>
            </select>
          </div>

          {formData.type === 'general' && (
            <div className="form-group">
              <label htmlFor="maxUses">Maximum Uses *</label>
              <input
                id="maxUses"
                name="maxUses"
                type="number"
                value={formData.maxUses}
                onChange={handleInputChange}
                placeholder="Enter maximum uses"
                min="1"
                required
                disabled={isLoading}
                className="form-input"
              />
            </div>
          )}

          {formData.type === 'specific' && (
            <div className="form-group">
              <label>Assigned Users *</label>
              <div className="user-search-container">
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search users by name or email"
                  disabled={isLoading}
                  className="form-input"
                />
                {filteredUsers.length > 0 && (
                  <div className="user-search-results">
                    {filteredUsers.map(user => (
                      <div
                        key={user._id}
                        className="user-search-item"
                        onClick={() => handleUserSelect(user)}
                      >
                        <div className="user-info">
                          <span className="user-name">{user.name}</span>
                          <span className="user-email">{user.email}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {formData.assignedUsers.length > 0 && (
                <div className="selected-users">
                  <h4>Selected Users ({formData.assignedUsers.length})</h4>
                  <div className="selected-users-list">
                    {formData.assignedUsers.map(user => (
                      <div key={user._id} className="selected-user">
                        <span className="user-name">{user.name}</span>
                        <span className="user-email">{user.email}</span>
                        <button
                          type="button"
                          onClick={() => handleUserRemove(user._id)}
                          className="remove-user-btn"
                          disabled={isLoading}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="expiryDate">Expiry Date *</label>
            <input
              id="expiryDate"
              name="expiryDate"
              type="datetime-local"
              value={formData.expiryDate}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="form-input"
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              onClick={handleClose}
              className="btn-secondary"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isLoading || !formData.couponName.trim() || !formData.expiryDate}
            >
              {isLoading ? 'Creating...' : 'Create Coupon'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCouponModal;

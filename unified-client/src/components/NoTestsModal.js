import React from 'react';

const NoTestsModal = ({ isOpen, onClose, studentName }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="modal-backdrop fade show" 
        style={{ zIndex: 1040 }}
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div 
        className="modal fade show" 
        style={{ display: 'block', zIndex: 1050 }}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                <i className="fas fa-info-circle text-warning me-2"></i>
                No Test Reports Found
              </h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={onClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center py-4">
              <i className="fas fa-clipboard-list fa-3x text-muted mb-3"></i>
              <h6 className="mb-3">No Test Reports Available</h6>
              <p className="text-muted mb-0">
                <strong>{studentName}</strong> has not attempted any tests yet.
              </p>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={onClose}
              >
                <i className="fas fa-check me-2"></i>
                Okay
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoTestsModal;


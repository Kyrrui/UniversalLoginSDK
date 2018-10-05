import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BackupModal extends Component {
  render() {
    return (
      <div className="modal-overlay">
        <div className="modal-body">
          <div className="modal-content">
            <h2>Your backup codes have been set! </h2>
            <p className="modal-text">
              Be sure to print out a copy of these codes.
            </p>
          </div>
          <div className="modal-footer">
            <button
              onClick={() => this.props.printScreen()}
              className="modal-btn"
            >
              Print Codes
            </button>
            <button
              onClick={() => this.props.showAccount()}
              className="modal-btn"
            >
              Return to Account
            </button>
          </div>
        </div>
      </div>
    );
  }
}

BackupModal.propTypes = {
  showAccount: PropTypes.func,
  printScreen: PropTypes.func
};

export default BackupModal;

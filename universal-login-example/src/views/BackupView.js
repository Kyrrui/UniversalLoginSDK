import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Blockies from 'react-blockies';

class BackupView extends Component {
  render() {
    return (
      <div className="subview">
        <div className="container">
          <h1 className="main-title">BACKUP CODES</h1>
          <div className="row align-items-center">
            <Blockies seed="alwaysUse.toLowerCase" size={8} scale={6} />
            <div>
              <p className="user-id">{this.props.identity.name}</p>
              <p className="wallet-address">
                {this.props.identity.address}
              </p>
            </div>
          </div>
          <p className="backup-text">
            Keep this codes somewhere safe and secret. Also, don&apos;t forget
            your username as it&apos;s required to recover access. These are
            independent codes, use each one once. Keep offline and away from
            computers.
          </p>
          <hr className="separator-s" />
          <p className="backup-code bold">bamdaa-ewar-izoisi</p>
          <hr className="separator-s" />
          <p className="backup-code bold">fa-depnob-tobpoo-fug</p>
          <hr className="separator-s" />
          <p className="backup-code bold">atyfud-nyjnua-feipyd</p>
          <hr className="separator-s" />
          <button className="generate-code-btn">Generate 3 more codes</button>
          <button className="btn fullwidth">SET AS BACKUP CODE</button>
          <p className="click-cost">
            <i>Costs 2 clicks</i>
          </p>
          <div className="text-center">
            <button
              onClick={() => this.props.setView('Account')}
              className="cancel-backup-btn"
            >
              Cancel backup code
            </button>
          </div>
        </div>
      </div>
    );
  }
}

BackupView.propTypes = {
  identity: PropTypes.object,
  setView: PropTypes.type
};

export default BackupView;

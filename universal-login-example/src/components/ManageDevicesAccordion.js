import React, { Component } from 'react';
import Collapsible from './Collapsible';
import ManageDevicesAccordionView from '../views/ManageDevicesAccordionView';
import PropTypes from 'prop-types';

const THIS_DEVICE = 1;

class ManageDevices extends Component {
  constructor(props) {
    super(props);
  }

  confirmAction(publicKey) {
    //console.log(publicKey)
    this.props.emitter.emit('showModal', 'devices', publicKey);
  }

  render() {
    var subtitle = 'You currently have ' + (this.props.devices.length) + " authorized devices";
    return (
      <Collapsible
        title="Manage devices"
        subtitle={subtitle}
        icon="icon-smartphone"
      >
      <ManageDevicesAccordionView
        devices={this.props.devices}
        thisDevice={this.props.thisDevice}
        confirmAction={this.confirmAction.bind(this)}
      />
      </Collapsible>
    );
  }
}

ManageDevices.propTypes = {
  emitter: PropTypes.object
};

export default ManageDevices;

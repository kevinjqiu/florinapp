import React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import * as actions from "../../actions";

class GlobalModal extends Component {
  render() {
    const { isOpen, title, body, positiveActionLabel, positiveAction, negativeActionLabel, hideGlobalModal } = this.props;
    return (
      <div>
        <Modal isOpen={isOpen}>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            {body}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={positiveAction}>{positiveActionLabel}</Button>{' '}
            <Button color="secondary" onClick={hideGlobalModal}>{negativeActionLabel}</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ ui }) => {
  const { globalModal } = ui;
  return globalModal;
};

export default connect(mapStateToProps, actions)(GlobalModal);
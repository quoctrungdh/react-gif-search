import React from 'react';
import Modal from 'react-modal';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './CustomModal.css';

export default function CustomModal({ isModalOpen, selectedGif, children }) {
  // TODO: add some onClose animation, put the gif in modal content
  return <ReactCSSTransitionGroup
    transitionName="modal"
    transitionAppear={true}
    transitionAppearTimeout={5000}
    transitionEnter={false}
    transitionLeaveTimeout={500}
  >
    <Modal
      isOpen={isModalOpen}
      contentLabel="Modal"
			closeTimeoutMS={500}
    >
      {children}
    </Modal>
  </ReactCSSTransitionGroup>
}


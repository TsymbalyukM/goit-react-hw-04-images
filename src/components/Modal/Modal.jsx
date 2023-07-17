import PropTypes from 'prop-types';
import { React, useEffect } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';

export const Modal = ({ onClose, imgUrl }) => {
  // componentDidMount() {
  //   window.addEventListener('keydown', this.handleKeydown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener('keydown', this.handleKeydown);
  

  const handleKeydown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };


    return (
      <Overlay onClick={handleBackdropClick}>
        <ModalWindow>
          <img src={imgUrl} alt="" />
        </ModalWindow>
      </Overlay>
    );
  }


Modal.proptTypes = {
  onClose: PropTypes.func.isRequired,
};
import PropTypes from 'prop-types'
import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.scss';

const modalRoot = document.querySelector("#modal-root");

export class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    document.body.style.overflow = null;
    document.body.style.height = null;
  }

  handleKeyDown = evt => {
    if (evt.key === 'Escape') {
      this.props.onClose();
    }
  }

  handleBackDropClick = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.onClose();
    }
  }

  render() {
    return createPortal((
      <div className={s.Overlay} onClick={this.handleBackDropClick}>
        <div className={s.Modal}>
          <button className={s.closeBtn} onClick={this.props.onClose}>&#10006;</button>
          {this.props.children}
        </div>
      </div>
    ), modalRoot);
  }
}

export default Modal

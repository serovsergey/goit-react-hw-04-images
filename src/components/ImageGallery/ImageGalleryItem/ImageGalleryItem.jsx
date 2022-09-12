import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Modal from 'components/common/Modal';
import s from './ImageGalleryItem.module.scss';

export class ImageGalleryItem extends Component {
  static propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string,
    tags: PropTypes.string,
  }

  state = {
    isModalOpen: false,
  }

  toggleModal = evt => {
    this.setState(prevState => (
      { isModalOpen: !prevState.isModalOpen }
    ))
  }

  render() {
    const { largeImageURL, webformatURL, tags } = this.props;
    return (
      <>
        <li className={s.ImageGalleryItem}>
          <img
            className={s['ImageGalleryItem-image']}
            src={webformatURL}
            alt={tags}
            onClick={this.toggleModal}
          />
          {this.state.isModalOpen && (
            <Modal onClose={this.toggleModal}>
              <img className={s.innerImg} src={largeImageURL} alt={tags} />
            </Modal>
          )}
        </li>
      </>
    )
  }
}

export default ImageGalleryItem

import PropTypes from 'prop-types'
import Modal from 'components/common/Modal';
import s from './ImageGalleryItem.module.scss';
import { useState } from 'react';

export const ImageGalleryItem = ({ largeImageURL, webformatURL, tags }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = evt => {
    setIsModalOpen(prevState => !prevState)
  }

  return (
    <>
      <li className={s.ImageGalleryItem}>
        <img
          className={s['ImageGalleryItem-image']}
          src={webformatURL}
          alt={tags}
          onClick={toggleModal}
        />
        {isModalOpen && (
          <Modal onClose={toggleModal}>
            <img className={s.innerImg} src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </li>
    </>
  )
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string,
  tags: PropTypes.string,
}

export default ImageGalleryItem

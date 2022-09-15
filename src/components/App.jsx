import { useState, useEffect } from 'react';
import { Box } from './Box';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import imagesAPI from '../services/images-api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const App = () => {
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!name) {
      return;
    }
    setStatus(Status.PENDING);

    imagesAPI
      .fetchImages(name, page)
      .then(({ hits }) => {
        if (hits.length === 0) {
          return Promise.reject(new Error('No images found'));
        }
        const images = hits.map(({ id, webformatURL, largeImageURL }) => {
          const img = {
            id,
            webformatURL,
            largeImageURL,
          };
          return img;
        });

        setImages(prevImages => prevImages.concat(images));
        setStatus(Status.RESOLVED);
        setError('');
      })
      .catch(({ message }) => {
        setError(message);
        setStatus(Status.REJECTED);
        setImages([]);
      });
  }, [name, page]);

  const onFormSubmit = title => {
    setName(title);
    setImages([]);
    setPage(1);
  };

  const onBtnClick = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const onGalleryItemClick = name => {
    toggleModal();
    setModalImageSrc(name);
  };

  return (
    <Box display="grid" gridTemplateColumns="1fr" gridGap="16px" pb="24px">
      <SearchBar onSubmit={onFormSubmit} />
      {status === 'idle' && (
        <Box display="flex" alignItems="center" justifyContent="center">
          <div>Enter title of image.</div>
        </Box>
      )}
      {images.length > 0 && (
        <ImageGallery images={images} onClick={onGalleryItemClick} />
      )}

      {images && images.length > 0 && status === 'resolved' && (
        <Button onClick={onBtnClick} />
      )}

      {status === 'pending' && (
        <Box display="flex" alignItems="center" justifyContent="center">
          <Loader />
        </Box>
      )}

      {status === 'rejected' && (
        <Box display="flex" alignItems="center" justifyContent="center">
          {error}
        </Box>
      )}

      {showModal && (
        <Modal largeImageURL={modalImageSrc} onClose={toggleModal} />
      )}
    </Box>
  );
};

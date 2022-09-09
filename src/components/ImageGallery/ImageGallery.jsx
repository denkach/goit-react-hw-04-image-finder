import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ images, onClick }) => {
  return (
    <Gallery>
      {images.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          onClick={onClick}
        />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClick: PropTypes.func.isRequired,
};

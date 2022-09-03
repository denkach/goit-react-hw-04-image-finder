import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { Gallery } from './ImageGallery.styled';
import { Box } from '../Box';

export class ImageGallery extends Component {
  static propTypes = {
    status: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    error: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const { status, images, error, onClick } = this.props;

    if (status === 'idle') {
      return (
        <Box display="flex" alignItems="center" justifyContent="center">
          <div>Enter title of image.</div>
        </Box>
      );
    }

    if (status === 'pending') {
      return (
        <Box display="flex" alignItems="center" justifyContent="center">
          <Loader />
        </Box>
      );
    }

    if (status === 'resolved') {
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
    }

    if (status === 'rejected') {
      return (
        <Box display="flex" alignItems="center" justifyContent="center">
          {error}
        </Box>
      );
    }
  }
}

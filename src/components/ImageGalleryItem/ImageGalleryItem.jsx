import PropTypes from 'prop-types';
import { ImageGalleryCard, GalleryCardImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ picture, onClickImg }) => {
  return (
    <ImageGalleryCard>
      <GalleryCardImg
        onClick={() => {
          onClickImg(picture.largeImageURL);
        }}
        src={picture.webformatURL}
        alt={picture.tags}
      />
    </ImageGalleryCard>
  );
};

ImageGalleryItem.propTypes = {
  pictures: PropTypes.shape({
    ebformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  onClickImg: PropTypes.func.isRequired,
};

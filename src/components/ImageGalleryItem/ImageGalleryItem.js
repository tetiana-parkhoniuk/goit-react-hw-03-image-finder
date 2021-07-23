import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({
  webformatURL,
  tags,
  onImageClick,
  largeImageURL,
}) {
  return (
    <li
      className={styles.imageGalleryItem}
      onClick={() => onImageClick(largeImageURL)}
    >
      <img
        src={webformatURL}
        alt={tags}
        className={styles.imageGalleryItemImage}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ id, webformatURL, tags }) {
  return (
    <li className={styles.imageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={styles.imageGalleryItemImage}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  // id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

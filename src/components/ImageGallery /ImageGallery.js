// import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import styles from './ImageGallery.module.css';

export default function ImageGallery({ images }) {
  return (
    <ul className={styles.imageGallery}>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          // id={image.id}
          webformatURL={image.webformatURL}
          tags={image.tags}
        />
      ))}
    </ul>
  );
}

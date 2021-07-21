import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const handleSearch = event => {
    event.preventDefault();
    onSubmit(event.target.elements.searchQuery.value);
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.searchForm} onSubmit={handleSearch}>
        <button type="submit" className={styles.searchFormBtn}>
          <span className={styles.searchFormBtnLabel}>Search</span>
        </button>

        <input
          className={styles.searchFormInput}
          name="searchQuery"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

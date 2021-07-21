import styles from './Button.module.css';

export default function Button(onClick) {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      Load more
    </button>
  );
}

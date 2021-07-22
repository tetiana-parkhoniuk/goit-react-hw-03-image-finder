import Loader from 'react-loader-spinner';
import styles from 'components/Spinner/Spinner.module.css';

export default function Spinner() {
  return (
    <div className={styles.spinner}>
      <Loader
        type="ThreeDots"
        color="#d3d8e8"
        height={100}
        width={100}
        timeout={3000}
      />
    </div>
  );
}

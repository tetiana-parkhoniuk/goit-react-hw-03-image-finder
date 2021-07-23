import { Component } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery ';
import Button from 'components/Button';
import Spinner from 'components/Spinner';
import Modal from 'components/Modal';
import { fetchImages } from 'services/api';
import styles from './App.module.css';

export default class App extends Component {
  state = {
    searchQuery: null,
    images: [],
    page: 1,
    reqStatus: 'idle',
    showModal: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      try {
        this.setState({ reqStatus: 'pending' });

        const images = await fetchImages(
          this.state.searchQuery,
          this.state.page,
        );

        this.setState({ images, reqStatus: 'fulfilled' });
      } catch (error) {
        this.setState({ reqStatus: 'rejected' });
        alert('Error');
      }
    } else if (prevState.page !== this.state.page) {
      try {
        this.setState({ reqStatus: 'pending' });

        const images = await fetchImages(
          this.state.searchQuery,
          this.state.page,
        );

        this.setState({
          images: [...this.state.images, ...images],
          reqStatus: 'fulfilled',
        });
        this.scrollOnLoadMore();
      } catch (error) {
        this.setState({ reqStatus: 'rejected' });
        alert('Error');
      }
    }
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery, page: 1, images: [] });
  };

  incrementPage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  scrollOnLoadMore = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, reqStatus, showModal } = this.state;
    const isLoading = reqStatus === 'pending';
    const showLoadMoreBtn = images.length > 0;

    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {<ImageGallery images={this.state.images} />}
        {isLoading && <Spinner />}
        {showLoadMoreBtn && <Button onClick={this.incrementPage} />}
        {showModal && (
          <Modal>
            <h1>test</h1>
          </Modal>
        )}
      </div>
    );
  }
}

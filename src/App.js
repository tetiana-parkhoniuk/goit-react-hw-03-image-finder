import { Component } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery ';
import Button from 'components/Button';
import Spinner from 'components/Spinner';
import { fetchImages } from 'services/api';
import styles from './App.module.css';

export default class App extends Component {
  state = {
    searchQuery: null,
    images: [],
    page: 1,
    reqStatus: '',
    // idle, pending, fulfilled, rejected
  };

  async componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      try {
        this.setState({ images: [], reqStatus: 'pending' });
        this.resetPage();

        const images = await fetchImages(
          this.state.searchQuery,
          this.state.page,
        );
        this.setState({ images, reqStatus: 'fulfilled' });
      } catch (error) {
        this.setState({ reqStatus: 'rejected' });
        alert('Error');
      }
    }

    if (prevState.page !== this.state.page) {
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

      // const images = await fetchImages(this.state.searchQuery, this.state.page);
      // this.setState({ images: [...this.state.images, ...images] });
      // this.scrollOnLoadMore();
    }
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  incrementPage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  resetPage = () => {
    this.setState({ page: 1 });
  };

  scrollOnLoadMore = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { images, reqStatus } = this.state;
    const isLoading = reqStatus === 'pending';
    const showLoadMoreBtn = images.length > 0;

    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {<ImageGallery images={this.state.images} />}
        {isLoading && <Spinner />}
        {showLoadMoreBtn && <Button onClick={this.incrementPage} />}
      </div>
    );
  }
}

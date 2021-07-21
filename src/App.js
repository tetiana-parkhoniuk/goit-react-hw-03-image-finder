import { Component } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery ';
import Button from 'components/Button';
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
      this.setState({ images: [] });
      this.resetPage();

      try {
        const images = await fetchImages(
          this.state.searchQuery,
          this.state.page,
        );
        this.setState({ images });
      } catch (error) {
        alert('Error');
      }
    }

    if (prevState.page !== this.state.page) {
      const images = await fetchImages(this.state.searchQuery, this.state.page);
      this.setState({ images: [...this.state.images, ...images] });
      this.scrollOnLoadMore();
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
    const { images } = this.state;
    const showLoadMoreBtn = images.length > 0;
    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={this.state.images} />
        {showLoadMoreBtn && <Button onClick={this.incrementPage} />}
      </div>
    );
  }
}

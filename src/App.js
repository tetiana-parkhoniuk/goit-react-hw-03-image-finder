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
    reqStatus: '',
    // idle, pending, fulfilled, rejected
  };

  async componentDidUpdate(_, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      console.log('fetch');
      const images = await fetchImages(this.state.searchQuery);
      this.setState({ images });
      // if(images.length < 1){ do not show load more button 46:45}
    }
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    const { images } = this.state;
    const showLoadMoreBtn = images.length > 0;
    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={this.state.images} />
        {showLoadMoreBtn && <Button onClick={'fetch'} />}
      </div>
    );
  }
}

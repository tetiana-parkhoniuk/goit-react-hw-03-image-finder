import { Component } from 'react';
import Searchbar from 'components/Searchbar';
import styles from './App.module.css';

export default class App extends Component {
  state = {
    searchQuery: null,
    images: [],
    reqStatus: '',
    // idle, pending, fulfilled, rejected
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
    console.log(searchQuery);
  };

  render() {
    return (
      <div className={styles.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
      </div>
    );
  }
}

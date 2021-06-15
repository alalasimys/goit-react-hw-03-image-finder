import React, { Component } from "react";

import "./styles.css";
import imagesApi from "../src/services/imagesApi";

import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import ImageGalleryItem from "./components/ImageGalleryItem";
import Button from "./components/Button";

export class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: "",
    isLoading: false,
    error: null,
    largeImageURL: "",
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.getImages();
    }

    if (this.state.currentPage > 2) {
      this.scrollTo();
    }
  }

  onChangeQuery = (query) => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      images: [],
      error: null,
    });
  };

  getImages = () => {
    const { currentPage, searchQuery } = this.state;
    const options = { currentPage, searchQuery };

    this.setState({ isLoading: true });

    imagesApi
      .fetchImages(options)
      .then((images) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...images],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch((error) => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  scrollTo = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  render() {
    const { images, isLoading, error } = this.state;
    const renderLoadButton = images.length > 0 && !isLoading;

    return (
      <div>
        <Searchbar onSubmit={this.onChangeQuery} />

        {error && <h2>Please try again you request</h2>}

        <ImageGallery>
          <ImageGalleryItem images={images} />
        </ImageGallery>

        {isLoading && <h2>Loading...</h2>}

        {renderLoadButton && <Button onClick={this.getImages} />}
      </div>
    );
  }
}

export default App;

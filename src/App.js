import React, { Component } from "react";

import "./styles.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import fetchImages from "../src/services/imagesApi";
import Loader from "react-loader-spinner";

import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import ImageGalleryItem from "./components/ImageGalleryItem";
import Button from "./components/Button";
import Modal from "./components/Modal";

export class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: "",
    isLoading: false,
    error: null,
    largeImageURL: "",
    showModal: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.getImages();
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

    fetchImages(options)
      .then((images) => {
        this.setState((prevState) => ({
          images: [...prevState.images, ...images],
          currentPage: prevState.currentPage + 1,
        }));
        if (currentPage > 1) {
          window.scrollTo({
            top: document.querySelector("#imageGallery").scrollHeight,
            behavior: "smooth",
          });
        }
      })
      .catch((error) => this.setState({ error }))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleClick = (image) => {
    this.toggleModal();
    this.setState({ largeImageURL: image });
  };

  render() {
    const { images, isLoading, error, showModal, largeImageURL } = this.state;
    const renderLoadButton = images.length > 0 && !isLoading;

    return (
      <div>
        <Searchbar onSubmit={this.onChangeQuery} />

        {error && <h2>Please try again your request</h2>}

        <ImageGallery>
          <ImageGalleryItem images={images} onClick={this.handleClick} />
        </ImageGallery>

        {isLoading && (
          <Loader
            className="Loader"
            type="Circles"
            color="#471135"
            height={100}
            width={100}
          />
        )}

        {renderLoadButton && <Button onClick={this.getImages} />}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;

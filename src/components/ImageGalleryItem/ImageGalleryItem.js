import PropTypes from "prop-types";

const ImageGalleryItem = ({ images }) =>
  images.map(({ id, webformatURL, largeImageURL, tags }) => (
    <li className="ImageGalleryItem" key={id}>
      <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" />
    </li>
  ));
export default ImageGalleryItem;

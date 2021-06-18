import React from "react";
import PropTypes from "prop-types";

const ImageGallery = ({ children }) => (
  <ul id="imageGallery" className="ImageGallery">
    {children}
  </ul>
);

ImageGallery.propTypes = {
  children: PropTypes.object.isRequired,
};

export default ImageGallery;

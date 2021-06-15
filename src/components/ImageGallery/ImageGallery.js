import React from "react";
import PropTypes from "prop-types";

const ImageGallery = ({ children }) => (
  <ul className="ImageGallery">{children}</ul>
);

ImageGallery.propTypes = {
  children: PropTypes.object.isRequired,
};

export default ImageGallery;

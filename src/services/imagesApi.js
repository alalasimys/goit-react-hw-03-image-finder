import axios from "axios";

const fetchImages = ({ currentPage = 1, searchQuery = "", pageSize = 12 }) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&per_page=${pageSize}&key=21244519-50cd1518df4ac35a1fd6e5fdb&image_type=photo&orientation=horizontal`
    )
    .then((response) => response.data.hits);
};

export default { fetchImages };

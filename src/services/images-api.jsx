const API_KEY = '28410112-890d31eb018b119befebb0576';

const fetchImage = name => {
  return fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${name}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error(`There are no images with name ${name}`));
    }
  );
};

const fetchImages = (name, page) => {
  return fetch(
    `https://pixabay.com/api/?q=${name}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`There are no images with name ${name}`));
  });
};

const api = {
  fetchImage,
  fetchImages,
};

export default api;

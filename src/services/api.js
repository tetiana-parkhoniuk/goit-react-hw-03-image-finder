import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (searchQuery, page) => {
  const API_KEY = '21882924-40498065f1aa5022828b315f8';
  const params = `page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  const response = await axios.get(`?q=${searchQuery}&${params}`);
  return response.data.hits;
};

import axios from "axios";

export const PER_PAGE = 12;

const instance = axios.create({
  baseURL: 'https://pixabay.com/api',
  params: {
    key: '9050134-41fe2ca79f29d6928e7cd9c9b',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: PER_PAGE,
  }
})

export const fetchImages = async (query, page) => {
  const params = {
    q: query,
    page
  }
  return (await instance.get('/', { params })).data;
}

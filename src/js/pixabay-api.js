import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export default class PixabayApi {
  constructor() {
    this.API_KEY = '38695324-b75ec9d269a1ef21c9f93a682';
    this.BASE_URL = 'https://pixabay.com/api/';
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  async getPhotos() {
    const requestConfig = {
      params: {
        key: `${this.API_KEY}`,
        q: `${this.searchQuery}`,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: `${this.per_page}`,
        page: `${this.page}`,
      },
    };

    try {
      const response = await axios.get(this.BASE_URL, requestConfig);

      if (response.data.hits.length) {
        this.incrementPage();
        return response.data;
      } else {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return Promise.reject(response.data);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}

import '../css/style.css';

import { refs } from './refs';
import PixabayApi from './pixabay-api';
import makeGalleryCards from './gallery';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const pixabay = new PixabayApi();

refs.searchForm.addEventListener('submit', searchFormHandler);
refs.loadMoreBtn.addEventListener('click', getNextPhotos);

async function searchFormHandler(e) {
  e.preventDefault();
  refs.loadMoreBtn.classList.add('is-hidden');

  pixabay.searchQuery = e.target.elements.searchQuery.value.trim();

  clearContainer();
  pixabay.resetPage();

  try {
    const data = await pixabay.getPhotos();

    makeGalleryCards(data);
    lightbox();

    if (data.hits.length === pixabay.per_page) {
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
      refs.loadMoreBtn.classList.remove('is-hidden');
    } else {
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.log('error on searchFormHandler', error);
  }
}

async function getNextPhotos() {
  refs.loadMoreBtn.classList.add('is-hidden');

  try {
    const data = await pixabay.getPhotos();

    makeGalleryCards(data);

    if (data.hits.length === pixabay.per_page) {
      refs.loadMoreBtn.classList.remove('is-hidden');
    } else {
      Notify.info("We're sorry, but you've reached the end of search results.");
    }

    lightbox().refresh();
    smoothScroll();
  } catch (error) {
    console.log('error on getNextPhotos', error);
  }
}

function clearContainer() {
  refs.galleryBox.innerHTML = '';
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function lightbox() {
  let lightBox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: '250ms',
  });
  return lightBox;
}

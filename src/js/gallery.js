import { refs } from './refs';
import cardMarkup from './markup';

export default function makeGalleryCards({ hits }) {
  const cards = hits.map(cardMarkup).join('');
  refs.galleryBox.insertAdjacentHTML('beforeend', cards);
}

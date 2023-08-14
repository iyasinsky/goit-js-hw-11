export default function cardMarkup(obj) {
  const {
    largeImageURL,
    webformatURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = obj;

  return `
  <a href="${largeImageURL}">
    <div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          Likes ${likes}
        </p>
        <p class="info-item">
          Views ${views}
        </p>
        <p class="info-item">
          Comments ${comments}
        </p>
        <p class="info-item">
          Downloads ${downloads}
        </p>
      </div>
    </div>
  </a>
  `;
}

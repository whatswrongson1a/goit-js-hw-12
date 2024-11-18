import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
let lightbox = new SimpleLightbox('.gallery a');

export function renderImages(images) {
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <div class="gallery__item">
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <div class="photo-info">
            <p><b>Likes:</b> ${likes}</p>
            <p><b>Views:</b> ${views}</p>
            <p><b>Comments:</b> ${comments}</p>
            <p><b>Downloads:</b> ${downloads}</p>
          </div>
        </div>
      `
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function hideLoadMoreButton(button) {
  button.classList.add('is-hidden');
}

export function showLoadMoreButton(button) {
  button.classList.remove('is-hidden');
}

export function scrollPage() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 0.7,
    behavior: 'smooth',
  });
}


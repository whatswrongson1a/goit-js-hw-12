import { fetchImages } from './js/pixabay-api.js';
import {
  renderImages,
  clearGallery,
  hideLoadMoreButton,
  showLoadMoreButton,
  scrollPage,
} from './js/render-functions.js';

const form = document.querySelector('#search-form');
const loadMoreButton = document.querySelector('#load-more-btn');
let query = '';
let page = 1;
const perPage = 15;
let totalHits = 0;

form.addEventListener('submit', onFormSubmit);
loadMoreButton.addEventListener('click', onLoadMore);

async function onFormSubmit(event) {
  event.preventDefault();
  query = event.currentTarget.elements.searchQuery.value.trim();
  if (!query) return;

  page = 1;
  clearGallery();
  hideLoadMoreButton(loadMoreButton);

  try {
    const { hits, totalHits: hitsCount } = await fetchImages(query, page, perPage);
    totalHits = hitsCount;
    if (hits.length === 0) {
      alert('No images found. Please try another query.');
      return;
    }

    renderImages(hits);

    if (page * perPage < totalHits) {
      showLoadMoreButton(loadMoreButton);
    }
  } catch (error) {
    console.error('Error loading images:', error);
  }
}

async function onLoadMore() {
  page += 1;
  hideLoadMoreButton(loadMoreButton);

  try {
    const { hits } = await fetchImages(query, page, perPage);
    renderImages(hits);

    if (page * perPage >= totalHits) {
      hideLoadMoreButton(loadMoreButton);
      alert("We're sorry, but you've reached the end of search results.");
    } else {
      showLoadMoreButton(loadMoreButton);
      scrollPage();
    }
  } catch (error) {
    console.error('Error loading more images:', error);
  }
}


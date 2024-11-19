import { fetchImages } from './js/pixabay-api.js';
import {
  renderImages,
  clearGallery,
  hideLoadMoreButton,
  showLoadMoreButton,
  scrollPage,
} from './js/render-functions.js';
import iziToast from 'izitoast'; 
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const loadMoreButton = document.querySelector('#load-more-btn');
const loader = document.querySelector('#loader');
let query = '';
let page = 1;
const perPage = 15;
let totalHits = 0;

form.addEventListener('submit', onFormSubmit);
loadMoreButton.addEventListener('click', onLoadMore);

function showLoader() {
  loader.classList.remove('is-hidden');
}

function hideLoader() {
  loader.classList.add('is-hidden');
}

async function onFormSubmit(event) {
  event.preventDefault();
  query = event.currentTarget.elements.searchQuery.value.trim();
  if (!query) return;

  page = 1;
  clearGallery();
  hideLoadMoreButton(loadMoreButton);
  showLoader();

  try {
    const { hits, totalHits: hitsCount } = await fetchImages(query, page, perPage);
    totalHits = hitsCount;
    if (hits.length === 0) {
      iziToast.warning({
        title: 'Warning',
        message: 'No images found. Please try another query.',
      });
      return;
    }

    renderImages(hits);

    if (page * perPage < totalHits) {
      showLoadMoreButton(loadMoreButton);
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: error.message.includes('Network')
        ? 'Network error! Please check your internet connection.'
        : 'An unexpected error occurred. Please try again later.',
    });
    console.error('Error loading images:', error);
  } finally {
    hideLoader();
  }
}

async function onLoadMore() {
  page += 1;
  hideLoadMoreButton(loadMoreButton);
  showLoader();

  try {
    const { hits } = await fetchImages(query, page, perPage);

    renderImages(hits);

    if (page * perPage >= totalHits) {
      hideLoadMoreButton(loadMoreButton);
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showLoadMoreButton(loadMoreButton);
      scrollPage();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'An error occurred while loading more images. Please try again later.',
    });
    console.error('Error loading more images:', error);
  } finally {
    hideLoader();
  }
}






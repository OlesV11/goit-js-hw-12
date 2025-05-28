import { getImagesByQuery } from './js/pixabay-api.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import {
    createGallery,
    clearGallery,
    showLoader,
    hideLoader,
    showLoadMoreButton,
    hideLoadMoreButton,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const galleryContainer = document.querySelector('.gallery');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;
let loadMoreBtn = null;
let loader = null;

function initializeLoader() {
    loader = document.querySelector('.loader');
    if (!loader) {
        loader = document.createElement('span');
        loader.classList.add('loader');
        if (galleryContainer) {
            galleryContainer.insertAdjacentElement('afterend', loader);
        } else {
        }
    }
}

if (!form) {
    iziToast.error({
        title: 'Error',
        message: 'Search form not found. Please check your HTML.',
    });
}

if (!galleryContainer) {
    iziToast.error({
        title: 'Error',
        message: 'Gallery container not found. Please check your HTML.',
    });
} else {
    initializeLoader();
}

function createLoadMoreButton() {
    if (!galleryContainer) {
        iziToast.error({
            title: 'Error',
            message: 'Cannot create Load More button due to missing gallery container.',
        });
        return;
    }

    loadMoreBtn = document.createElement('button');
    if (!loadMoreBtn) {
        return;
    }
    loadMoreBtn.classList.add('load-more');
    loadMoreBtn.textContent = 'Load more';

    try {
        galleryContainer.insertAdjacentElement('afterend', loadMoreBtn);

        if (loader) {
            loadMoreBtn.insertAdjacentElement('afterend', loader);
        } else {
            console.error('Loader is null during Load More button creation.');
        }
    } catch (error) {
        console.error('Error inserting Load More button or loader:', error);
        iziToast.error({
            title: 'Error',
            message: 'Failed to insert Load More button or loader into DOM.',
        });
        return;
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', handleLoadMore);
    } else {
    }
}

async function handleLoadMore() {
    currentPage += 1;
    showLoader();
    hideLoadMoreButton();

    try {
        if (typeof currentPage !== 'number' || currentPage < 1) {
            currentPage = 1;
        }
        const data = await getImagesByQuery(currentQuery, currentPage);
        createGallery(data.hits);

        const galleryItem = document.querySelector('.gallery-item');
        if (galleryItem) {
            const { height: cardHeight } = galleryItem.getBoundingClientRect();
            window.scrollBy({
                top: cardHeight * 2,
                behavior: 'smooth',
            });
        } else {
            console.warn('No gallery items found for smooth scrolling.');
        }

        if (currentPage * 15 >= totalHits) {
            hideLoadMoreButton();
            iziToast.info({
                title: 'Info',
                message: "We're sorry, but you've reached the end of search results.",
            });
        } else {
            showLoadMoreButton();
        }
    } catch (error) {
        console.error('Error fetching more images:', error);
        iziToast.error({
            title: 'Error',
            message: error.message.includes('401')
                ? 'Invalid API key. Please check your Pixabay API key.'
                : error.message.includes('429')
                    ? 'Too many requests. Please wait and try again later.'
                    : 'Failed to fetch images. Please try again later.',
        });
    } finally {
        hideLoader();
    }
}

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const searchInput = e.target.elements.searchQuery;
        if (!searchInput) {
            console.error('Input with name="searchQuery" not found in form. Please check your HTML.');
            iziToast.error({
                title: 'Error',
                message: 'Search input not found. Please ensure <input name="searchQuery"> exists in the form.',
            });
            return;
        }

        const query = searchInput.value.trim();

        if (!query) {
            iziToast.error({
                title: 'Error',
                message: 'Please enter a search query',
            });
            return;
        }

        if (!galleryContainer) {
            iziToast.error({
                title: 'Error',
                message: 'Gallery container not found. Please check your HTML.',
            });
            return;
        }

        currentQuery = query;
        currentPage = 1;
        clearGallery();
        if (loadMoreBtn) {
            loadMoreBtn.remove();
            loadMoreBtn = null;
            console.log('Previous Load More button removed.');
        }
        if (loader && galleryContainer) {
            galleryContainer.insertAdjacentElement('afterend', loader);
        }
        hideLoadMoreButton();
        showLoader();

        try {
            if (typeof currentPage !== 'number' || currentPage < 1) {
                console.error(`Invalid currentPage: ${currentPage}. Resetting to 1.`);
                currentPage = 1;
            }
            const data = await getImagesByQuery(currentQuery, currentPage);
            totalHits = data.totalHits;

            if (data.hits.length > 15) {
                console.warn(`Expected 15 images, but received ${data.hits.length}. Check API parameters.`);
            }

            if (data.hits.length === 0) {
                iziToast.error({
                    title: 'Error',
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                });
                hideLoader();
                return;
            }

            createGallery(data.hits);

            if (!loadMoreBtn) {
                createLoadMoreButton();
            }

            if (data.hits.length < 15 || currentPage * 15 >= totalHits) {
                console.log('Hiding Load More button due to insufficient images or end of results.');
                hideLoadMoreButton();
                iziToast.info({
                    title: 'Info',
                    message: "We're sorry, but you've reached the end of search results.",
                });
            } else {
                showLoadMoreButton();
            }
        } catch (error) {
            console.error('Error fetching images:', error);
            iziToast.error({
                title: 'Error',
                message: error.message.includes('401')
                    ? 'Invalid API key. Please check your Pixabay API key.'
                    : error.message.includes('429')
                        ? 'Too many requests. Please wait and try again later.'
                        : error.message.includes('page is not defined')
                            ? 'Invalid page parameter. Please try again.'
                            : 'Failed to fetch images. Please try again later.',
            });
        } finally {
            hideLoader();
            form.reset();
        }
    });
} else {
}
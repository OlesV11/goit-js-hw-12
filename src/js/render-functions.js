import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
// const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});

export function createGallery(images) {
    const markup = images
        .map(
            ({
                webformatURL,
                largeImageURL,
                tags,
                likes,
                views,
                comments,
                downloads,
            }) => `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" />
          <div class="info">
            <p><b>Likes</b> ${likes}</p>
            <p><b>Views</b> ${views}</p>
            <p><b>Comments</b> ${comments}</p>
            <p><b>Downloads</b> ${downloads}</p>
          </div>
        </a>
      </li>
    `
        )
        .join('');

    galleryContainer.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
};

export function clearGallery() {
    galleryContainer.innerHTML = '';
};

export function showLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.classList.add('visible');
    } else {
        console.error('Loader element not found.');
    }
}

export function hideLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.classList.remove('visible');
    } else {
        console.error('Loader element not found.');
    }
}

export function showLoadMoreButton() {
    const loadMoreBtn = document.querySelector('.load-more');
    if (loadMoreBtn) {
        loadMoreBtn.classList.add('visible');
    } else {
        console.error('Load More button not found.');
    }
}

export function hideLoadMoreButton() {
    const loadMoreBtn = document.querySelector('.load-more');
    if (loadMoreBtn) {
        loadMoreBtn.classList.remove('visible');
    }
}
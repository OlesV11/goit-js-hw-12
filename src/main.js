import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('.form');

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const searchInput = event.currentTarget.elements['search-text'];
    const query = searchInput.value.trim();

    if (!query) {
        iziToast.error({
            title: 'Помилка',
            message: 'Будь ласка, введіть пошуковий запит!',
            position: 'topRight',
        });
        return;
    }

    try {
        showLoader();
        clearGallery();

        const data = await getImagesByQuery(query);

        if (data.hits.length === 0) {
            iziToast.info({
                title: '',
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
                backgroundColor: '#ff0000',
            });
            return;
        }

        createGallery(data.hits);
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: error.message,
            position: 'topRight', s
        });
    } finally {
        hideLoader();
        searchInput.value = '';
    }
});
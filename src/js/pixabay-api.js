import axios from 'axios';

const API_KEY = '50347591-5bd4b47a011c37c1e11104459';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page) {
    if (!query) {
        console.error('Query is undefined or empty in getImagesByQuery.');
        throw new Error('Search query is required.');
    }
    if (typeof page !== 'number' || page < 1) {
        console.error(`Invalid page parameter: ${page}. Defaulting to page 1.`);
        page = 1;
    }


    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: page,
                per_page: 15,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching images from Pixabay:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
        });
        throw new Error('Failed to fetch images from Pixabay API');
    }
}
import axios from 'axios';

const API_KEY = '50347591-5bd4b47a011c37c1e11104459';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Не вдалося отримати зображення: ' + error.message);
    }
}
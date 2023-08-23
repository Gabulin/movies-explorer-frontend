import { MOVIE_URL } from './Сonstants.js';

export const getMovies = () => {
    return fetch(`${MOVIE_URL}/beatfilm-movies`, {
        method: 'GET',
    })
        .then((res) => {  return res.ok
            ? res.json()
            : Promise.reject(`Ошибка: ${res.status}`) })
};

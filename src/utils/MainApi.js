import { BASE_URL } from "./Constants";
import { HEADERS } from "./Constants";

const handleResponse = (res) => {
    return res.ok
        ? res.json()
        : Promise.reject(`Ошибка: ${res.status}`);
}

export const registerUser = ({ name, email, password }) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
    })
        .then((res) => { return handleResponse(res) });
};


export const loginUser = ({ email, password }) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
        .then((res) => { return handleResponse(res) })
};

export const getUserInfo = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: HEADERS(token),
    })
        .then((res) => { return handleResponse(res) })
};

export const updateUserInfo = (token, { name, email, password }) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: HEADERS(token),
        body: JSON.stringify({ name, email, password })
    })
        .then((res) => { return handleResponse(res) })
};

export const getUserMovies = (token) => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'GET',
        headers: HEADERS(token)
    })
        .then((res) => { return handleResponse(res) })
};

export const createUserMovies = (token, film) => {
    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        headers: HEADERS(token),
        body: JSON.stringify(film)
    })
        .then((res) => { return handleResponse(res) })
};

export const deleteUserMovies = (token, filmID) => {
    return fetch(`${BASE_URL}/movies/${filmID}`, {
        method: 'DELETE',
        headers: HEADERS(token),
    })
        .then((res => { return handleResponse(res) }))
};

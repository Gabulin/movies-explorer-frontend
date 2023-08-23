export const REGEX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//export const BASE_URL = "https://gn.movies-explorer.api.nomoreparties.co"; // Добавьте "https://"
export const BASE_URL = 'http://localhost:3001'
export const MOVIE_URL = "https://api.nomoreparties.co"; 

export const HEADERS = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
};

export const TOKEN = localStorage.getItem("token");
export const FIRST_VISIT_SITE = sessionStorage.getItem("entrance");

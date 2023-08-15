import React from "react";
import "./SavedMovies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";

import movieImg1 from "../../images/movies/movie-img_1.jpg";
import movieImg2 from "../../images/movies//movie-img_2.jpg";
import movieImg3 from "../../images/movies/movie-img_3.jpg";

import Preloader from "../Movies/Preloader/Preloader";

function SavedMovies() {
  const moviesList = [
    {
      id: 1,
      image: movieImg1,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
    },
    {
      id: 2,
      image: movieImg2,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
    },
    {
      id: 3,
      image: movieImg3,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
    },
  ];

  return (
    <main className="saved-movies">
      <SearchForm />
      {moviesList.length !== 0 ? (
        <MoviesCardList moviesList={moviesList} />
      ) : (
        <Preloader />
      )}
    </main>
  );
}

export default SavedMovies;

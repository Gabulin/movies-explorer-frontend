import React from "react";
import "./Movies.css";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";

import movieImg1 from "../../images/movies/movie-img_1.jpg";
import movieImg2 from "../../images/movies/movie-img_2.jpg";
import movieImg3 from "../../images/movies/movie-img_3.jpg";
import movieImg4 from "../../images/movies/movie-img_4.jpg";
import movieImg5 from "../../images/movies/movie-img_5.jpg";
import movieImg6 from "../../images/movies/movie-img_6.jpg";
import movieImg7 from "../../images/movies/movie-img_7.jpg";
import movieImg8 from "../../images/movies/movie-img_8.jpg";
import movieImg9 from "../../images/movies/movie-img_9.jpg";
import movieImg10 from "../../images/movies/movie-img_10.jpg";
import movieImg11 from "../../images/movies/movie-img_11.jpg";
import movieImg12 from "../../images/movies/movie-img_12.jpg";
import movieImg13 from "../../images/movies/movie-img_13.jpg";
import movieImg14 from "../../images/movies/movie-img_14.jpg";
import movieImg15 from "../../images/movies/movie-img_15.jpg";
import movieImg16 from "../../images/movies/movie-img_16.jpg";

import Preloader from "./Preloader/Preloader";

function Movies() {
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
    {
      id: 4,
      image: movieImg4,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
    },
    {
      id: 5,
      image: movieImg5,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
    },
    {
      id: 6,
      image: movieImg6,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
      owner: "user",
    },
    {
      id: 7,
      image: movieImg7,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
    },
    {
      id: 8,
      image: movieImg8,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
    },
    {
      id: 9,
      image: movieImg9,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
    },
    {
      id: 10,
      image: movieImg10,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
    },
    {
      id: 11,
      image: movieImg11,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
    },
    {
      id: 12,
      image: movieImg12,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
    },
    {
      id: 13,
      image: movieImg13,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
    },
    {
      id: 14,
      image: movieImg14,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
    },
    {
      id: 15,
      image: movieImg15,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
    },
    {
      id: 16,
      image: movieImg16,
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
    },
  ];

  return (
    <main className="movies">
      <SearchForm />
      {moviesList.length !== 0 ? (
        <MoviesCardList moviesList={moviesList} />
      ) : (
        <Preloader />
      )}
    </main>
  );
}

export default Movies;

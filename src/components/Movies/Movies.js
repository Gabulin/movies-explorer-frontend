import React, { useState } from "react";
import "./Movies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { MOVIE_URL } from "../../utils/Constants";


function Movies({ movies, savedMovies, getMovies, getSavedMovies, onDelete, onSave }) {
  const [load, setIsLoad] = useState(false);
  const [filtered, setFilterd] = useState(
    JSON.parse(localStorage.getItem('filtred')) || null
  );
  const [search, setSearch] = useState(
    JSON.parse(localStorage.getItem('search')) || { film: "", isShort: "" }
  );

  React.useEffect(() => {
    setIsLoad(true);
    getMovies().finally(() => {
      setIsLoad(false);
    })
    setIsLoad(true);
    getSavedMovies().finally(() => {
      setIsLoad(false);
    })
  }, []);

  React.useEffect(() => {
    localStorage.setItem('search', JSON.stringify(search));
  }, [search])

  React.useEffect(() => {
    localStorage.setItem('filtred', JSON.stringify(filtered));
  }, [filtered])

  const handleSearch = (search) => {
    const found = movies.filter(({ nameRU, nameEN, duration }) => {
      const searchString = search.film.toLowerCase();
      console.debug(search)
      const isShort = search.isShort ? duration <= 40 : true;

      return isShort &&
        (nameRU.toLowerCase().includes(searchString) || nameEN.toLowerCase().includes(searchString))
    });

    setFilterd(found);
  }

  const isSaved = ({ id }) => {
    if (savedMovies) {
      return savedMovies.filter(m => m.movieId === id).length;
    }

    return false;
  };

  const handleDelete = ({ id }) => {
    setIsLoad(true);
    const [movie] = savedMovies.filter(({ movieId }) => movieId === id);

    onDelete(movie).finally(() => {
      setIsLoad(false);
    })
  }

  const handleSave = ({
    id,
    nameRU,
    nameEN,
    director,
    country,
    image,
    year,
    duration,
    description,
    trailerLink
  }) => {
    setIsLoad(true);
    onSave({
      nameRU,
      nameEN,
      director,
      country,
      year,
      image: `${MOVIE_URL}${image.url}`,
      thumbnail: `${MOVIE_URL}${image.url}`,
      movieId: id,
      duration,
      description,
      trailerLink,
    }).finally(() => {
      setIsLoad(false)
    })
  }

  return (
    <main className="movies">
      <SearchForm
        setSearch={setSearch}
        search={search}
        onSearch={search => {
          handleSearch(search);
        }}
      />
      <MoviesCardList
        moviesList={filtered}
        isSaved={isSaved}
        onDelete={handleDelete}
        onSave={handleSave}
      />
      {load ? (<Preloader />) : ("")}
    </main>
  );
}

export default Movies;

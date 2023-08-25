import React, { useState } from "react";
import "./SavedMovies.css";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function SavedMovies({ movies, getMovies, onDelete }) {
  const [load, setIsLoad] = useState(false);
  const [filtered, setFilterd] = useState(null);
  const [search, setSearch] = useState({ film: "", isShort: "" });

  React.useEffect(() => {
    setIsLoad(true);
    getMovies().finally(() => {
      setIsLoad(false);
    })
  }, []);

  React.useEffect(() => {
    handleSearch(search)
  }, [movies])

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
        isSaved={() => true}
        onDelete={onDelete}
      />
      {load ? (<Preloader />) : ("")}
    </main>
  );
}

export default SavedMovies;

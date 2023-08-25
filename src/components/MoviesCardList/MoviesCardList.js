import React, { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ moviesList, isSaved, onDelete, onSave }) {
  const location = useLocation();
  const [width, setWidth] = useState(window.innerWidth);
  const [more, setMore] = useState(
    localStorage.getItem('more') || 0
  );

  React.useEffect(() => {
    localStorage.setItem('more', more);
  }, [more])

  React.useEffect(() => {
    const size = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", size);

    return () => {
      window.removeEventListener("resize", size);
    };
  }, []);

  let start = 16;
  let cards = 4;

  const renderMovies = useMemo(() => {
    if (moviesList && moviesList.length) {
       if (location.pathname === '/movies' ) {
        
        if (width < 768) {
          start = 5;
          cards = 2;
        } else if (width < 1280) {
          start = 8;
          cards = 2;
        }

         return moviesList.slice(0, start + ( more * cards ))
       }
    }

    return moviesList
  }, [moviesList, width, start, more, cards, location, start, cards])

  const showButtonMore = () => {
    if (location.pathname === '/movies' && moviesList) {
      return moviesList.length > renderMovies.length
    }

    return false
  }

  return (
    <section className="movies-list">
      <ul className="movies-list__cards">
        {moviesList ? (
          moviesList.length === 0 ? ("Ничего не найдено") : renderMovies.map((movieCard) => {
            return <MoviesCard 
            key={location.pathname === "/saved-movies" ? movieCard._id : movieCard.id} 
            movieCard={movieCard}
            isSaved={isSaved}
            onDelete={onDelete}
            onSave={onSave}
             />
          })
        )
          : ("")}
      </ul>
      {showButtonMore() && (
        <div className="movies-list__btn-more-container">
          <button
            type="button"
            aria-label="Загрузить еще"
            className="movies-list__btn-more"
            onClick={() => setMore(more => ++more)}
          >
            Ещё
          </button>
        </div>
      )}
    </section>
  );
}

export default MoviesCardList;

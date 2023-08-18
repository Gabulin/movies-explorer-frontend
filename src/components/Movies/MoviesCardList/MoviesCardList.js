import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCardList.css";

import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ moviesList }) {
  const location = useLocation();

  return (
    <section className="movies-list">
      <ul className="movies-list__cards">
        {moviesList.map((movieCard) => {
          return <MoviesCard key={movieCard.id} movieCard={movieCard} />;
        })}
      </ul>
      {location.pathname === "/movies" && (
        <div className="movies-list__btn-more-container">
          <button
            type="button"
            aria-label="Загрузить еще"
            className="movies-list__btn-more"
          >
            Ещё
          </button>
        </div>
      )}
    </section>
  );
}

export default MoviesCardList;

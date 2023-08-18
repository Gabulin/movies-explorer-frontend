import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import saveMovieBtnActive from "../../../images/card-button_active.svg";
import saveMovieBtnDisabled from "../../../images/card-button_disabled.svg";
import deleteMovieBtn from "../../../images/card-button_delete.svg";

function MoviesCard({ movieCard }) {
  const { image, duration, nameRU } = movieCard;
  const location = useLocation();
  const [isSaved, setIsSaved] = useState(false);

  function handleClick() {
    setIsSaved(!isSaved);
  }

  function handleDelete() {
    alert("Удаление карточки");
  }

  return (
    <li className="movies-card">
      <a
        href="#"
        target="_blank"
        className="movies-card__movies-link"
        rel="noreferrer"
      >
        <img className="movies-card__image" src={image} alt="Превью фильма" />
      </a>
      <div className="movies-card__container">
        <div className="movies-card__description">
          <h2 className="movies-card__title">{nameRU}</h2>
          <p className="movies-card__duration">{duration}</p>
        </div>
        {location.pathname === "/movies" && (
          <button
            type="button"
            aria-label="Добавить в сохраненные"
            className="movies-card__btn"
            onClick={handleClick}
          >
            {isSaved ? (
              <img
                className="movies-card__save-btn"
                alt="Добавлено в сохраненные"
                src={saveMovieBtnActive}
              />
            ) : (
              <img
                className="movies-card__save-btn"
                alt="добавить"
                src={saveMovieBtnDisabled}
              />
            )}
          </button>
        )}
        {location.pathname === "/saved-movies" && (
          <button
            type="button"
            aria-label="удалить фильм"
            className="movies-card__btn-delete"
            onClick={handleDelete}
          >
            <img
              className="movies-сard__img-btn-delete"
              alt="Удалить"
              src={deleteMovieBtn}
            />
          </button>
        )}
      </div>
    </li>
  );
}

export default MoviesCard;

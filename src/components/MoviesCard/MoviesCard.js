import React from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import saveMovieBtnActive from "../../images/card-button_active.svg";
import saveMovieBtnDisabled from "../../images/card-button_disabled.svg";
import deleteMovieBtn from "../../images/card-button_delete.svg";
import { MOVIE_URL } from "../../utils/Constants";


function MoviesCard({ movieCard, isSaved, onDelete, onSave }) {
  const { trailerLink, duration, nameRU } = movieCard;
  const location = useLocation();

  function getImage(movieCard) {
    return movieCard.thumbnail || `${MOVIE_URL}${movieCard.image.url}`
  }

  function getTime(duration) {
    if (duration < 60) {
      return `${duration % 60}м`
    } else {
      return `${Math.floor(duration / 60)}ч ${duration % 60}м`
    }
  }

  return (
    <li className="movies-card">
      <a
        href={trailerLink}
        target="_blank"
        className="movies-card__movies-link"
        rel="noreferrer"
      >
        <img className="movies-card__image" src={getImage(movieCard)} alt="Превью фильма" />
      </a>
      <div className="movies-card__container">
        <div className="movies-card__description">
          <h2 className="movies-card__title">{nameRU}</h2>
          <p className="movies-card__duration">{getTime(duration)}</p>
        </div>
        {location.pathname === "/movies" && (
          isSaved(movieCard) ? (
            <>
              <button
                type="button"
                aria-label="Удалить из сохраненных"
                className="movies-card__btn"
                onClick={() => onDelete(movieCard)}
              >
                <img
                  className="movies-card__save-btn"
                  alt="Добавлено в сохраненные"
                  src={saveMovieBtnActive}
                />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                aria-label="Добавить в сохраненные"
                className="movies-card__btn"
                onClick={() => onSave(movieCard)}
              >
                <img
                  className="movies-card__save-btn"
                  alt="добавить"
                  src={saveMovieBtnDisabled}
                />
              </button>
            </>
          )
        )
        }
        {location.pathname === "/saved-movies" && (
          <button
            type="button"
            aria-label="удалить фильм"
            className="movies-card__btn-delete"
            onClick={() => onDelete(movieCard)}
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

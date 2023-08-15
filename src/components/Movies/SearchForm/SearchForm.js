import React, { useState, useEffect } from "react";
import "./SearchForm.css"; 
import search from "../../../images/search.svg";
import searchBlue from "../../../images/searchBlue.svg";

const SearchForm = () => {
  const [isShortFilm, setIsShortFilm] = useState(false); 
  const [shouldMoveCheckboxInside, setShouldMoveCheckboxInside] = useState(
    window.innerWidth > 420
  );

  const handleToggleCheckbox = () => {
    setIsShortFilm(!isShortFilm);
  };

  useEffect(() => {
    const handleResize = () => {
      setShouldMoveCheckboxInside(window.innerWidth > 420);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="search-form-container">
      <div className="search-box">
        <div className="search-icon">
          <img src={search} alt="Лого поиска" />
        </div>
        <div className="search-input">
          <input
            type="text"
            placeholder="Фильм"
            className="search-input-field"
          />
        </div>
        <button className="search-button">
          <img src={searchBlue} alt="Лого поиска" />
        </button>
        {shouldMoveCheckboxInside && (
          <div className="checkbox">
            <div
              className={`toggle-switch ${isShortFilm ? "active" : ""}`}
              onClick={handleToggleCheckbox}
            >
              <div className="toggle-knob"></div>
            </div>
            <p className="checkbox-label">Короткометражки</p>
          </div>
        )}
      </div>
      {!shouldMoveCheckboxInside && (
        <div className="checkbox">
          <div
            className={`toggle-switch ${isShortFilm ? "active" : ""}`}
            onClick={handleToggleCheckbox}
          >
            <div className="toggle-knob"></div>
          </div>
          <p className="checkbox-label">Короткометражки</p>
        </div>
      )}
    </div>
  );
};

export default SearchForm;

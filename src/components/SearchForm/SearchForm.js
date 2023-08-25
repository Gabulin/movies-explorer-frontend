import React, { useState, useEffect } from "react";
import "./SearchForm.css";
import searchImg from "../../images/search.svg";
import searchBlue from "../../images/searchBlue.svg";

const SearchForm = ({ onSearch, search, setSearch }) => {
  const [error, setError] = useState();
  const [shouldMoveCheckboxInside, setShouldMoveCheckboxInside] = useState(
    window.innerWidth > 480
  );

  useEffect(() => {
    const handleResize = () => {
      setShouldMoveCheckboxInside(window.innerWidth > 480);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSearch = (state) => {
    setError('');
    if (search.film.length < 1) {
      return setError('Нужно ввести ключевое слово');
    }

    onSearch(state);
  }

  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSearch(search);
      }} className="search-form-container">
        <div className="search-box">
          <div className="search-icon">
            <img src={searchImg} alt="Лого поиска" />
          </div>
          <div className="search-input">
            <input
              type="text"
              placeholder="Фильм"
              value={search.film}
              onChange={(e) => setSearch({ ...search, film: e.target.value })}
              name="film"
              className="search-input-field"
            />
          </div>
          <button className="search-button">
            <img src={searchBlue} alt="Лого поиска" />
          </button>
          {shouldMoveCheckboxInside && (
            <div className="checkbox">
              <div
                className={`toggle-switch ${search.isShort ? "active" : ""}`}
                onClick={() => {
                  const state = { ...search, isShort: !search.isShort }
                  setSearch(state);
                  handleSearch(state);
                }}
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
              className={`toggle-switch ${search.isShort ? "active" : ""}`}
              onClick={() => {
                const state = { ...search, isShort: !search.isShort }
                setSearch(state);
                handleSearch(state);
              }}
            >
              <div className="toggle-knob"></div>
            </div>
            <p className="checkbox-label">Короткометражки</p>
          </div>
        )}
        <p>{error}</p>
      </form>
    </>
  );
};

export default SearchForm;

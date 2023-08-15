import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import burgerIcon from "../../images/burgerIcon.svg";
import closeIcon from "../../images/closeIcon.svg";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navigation">
      <div
        className={`nav-burger ${isOpen ? "nav-burger_open" : ""}`}
        onClick={toggleMenu}
      >
        <img
          src={isOpen ? closeIcon : burgerIcon}
          alt="Menu Icon"
          className="nav-burger__icon"
        />
      </div>

      {isOpen && (
        <div className="nav-overlay">
          <div
            className={`nav-burger nav-burger_close ${
              isOpen ? "nav-burger_close_open" : ""
            }`}
            onClick={toggleMenu}
          >
            <img
              src={closeIcon}
              alt="Close Icon"
              className="nav-burger__icon"
            />
          </div>
          <nav className="nav-dropdown">
            <div className="nav-links">
              <NavLink to="/" className="nav-dropdown__link">
                Главная
              </NavLink>
              <NavLink to="/movies" className="nav-dropdown__link">
                Фильмы
              </NavLink>
              <NavLink to="/saved-movies" className="nav-dropdown__link">
                Сохранённые фильмы
              </NavLink>
            </div>
            <NavLink
              to="/profile"
              className="navigation__account-btn"
            ></NavLink>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Navigation;

import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";
import Navigation from "../Navigation/Navigation";

function Header({ loggedIn, registrationLink, login, main }) {
  const headerClass = `header ${loggedIn ? "header_logged-in" : ""}`;

  return (
    <header className={headerClass}>
      <Link to="/" className="logo-link">
        <img src={logo} alt="Логотип" className="logo" />
      </Link>
      {loggedIn ? (
        <>
          <LoggedInHeader />
          <Navigation />
        </>
      ) : (
        <LoggedOutHeader registrationLink={registrationLink} login={login} />
      )}
    </header>
  );
}

function LoggedInHeader() {
  return (
    <>
      <nav className="nav">
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            "nav-link" + (isActive ? " nav-link_active" : "")
          }
        >
          Фильмы
        </NavLink>
        <NavLink
          to="/saved-movies"
          className={({ isActive }) =>
            "nav-link" + (isActive ? " nav-link_active" : "")
          }
        >
          Сохранённые фильмы
        </NavLink>
      </nav>
      <Link to="/profile" className="account-button">
      </Link>
    </>
  );
}

function LoggedOutHeader({ registrationLink, login }) {
  return (
    <nav className="login-container">
      <Link to={registrationLink} className="registration-button">
        Регистрация
      </Link>
      <Link to={login} className="login-button">
        Войти
      </Link>
    </nav>
  );
}

export default Header;

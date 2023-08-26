import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import Footer from "../Footer/Footer";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SavedMovies from "../SavedMovies/SavedMovies";
import InfoToolTip from "../InfoToolTip/InfoToolTip";

import { getMovies } from "../../utils/MoviesApi"; 
import {
  registerUser,
  loginUser,
  getUserInfo,
  updateUserInfo,
  createUserMovies,
  deleteUserMovies,
  getUserMovies,
} from "../../utils/MainApi";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [infoToolTipVisible, setInfoToolTipVisible] = React.useState(false);
  const [messageText, setMessageText] = React.useState("");
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [loggedIn, setLoggedIn] = React.useState(token || false);
  const [userInfo, setUserInfo] = React.useState({
    name: "",
    email: "",
  });
  const [movies, setMovies] = useState(
    JSON.parse(localStorage.getItem('movies')) || []
  );
  const [savedMovies, setSavedMovies] = useState([]);

  const allowedPaths = ["/", "/movies", "/saved-movies", "/profile"];

  const shouldDisplayHeader = allowedPaths.includes(location.pathname);

  const shouldDisplayFooter =
    allowedPaths.includes(location.pathname) &&
    !["/profile", "/signup", "/signin"].includes(location.pathname);

  React.useEffect(() => {
    if (loggedIn) {
      console.debug('LoggedIn')
      handleUserInfo();
      navigate(location.pathname, { replace: true });
    }
  }, [loggedIn]);

  React.useEffect(() => {
    sessionStorage.setItem('token', token);
  }, [token]);

  React.useEffect(() => {
    console.debug({ saveMovies: movies })
    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies]);

  const handleRegister = ({ name, email, password }) => {
    registerUser({ name, email, password })
      .then(() => {
        loginUser({ email, password })
          .then((res) => {
            setToken(res.token)
            setLoggedIn(true);
            setInfoToolTipVisible(true);
            setMessageText("Регистрация прошла успешно!");
            navigate("/movies", { replace: true });
          })
          
      })
      .catch((err) => {
        setInfoToolTipVisible(true);
        setMessageText(`${err}...Попробуйте еще раз...`);
      })
      .finally(() => {
        setTimeout(() => {
          setInfoToolTipVisible(false);
        }, 1500);
      });
  };

  const handleLogin = ({ email, password }) => {
    loginUser({ email, password })
      .then(({ token }) => {
        console.debug(token)
        setToken(token);
        setLoggedIn(true);
        setInfoToolTipVisible(true);
        setMessageText("Добро пожаловать!");
        navigate("/movies", { replace: true });
      })
      .catch((err) => {
        setInfoToolTipVisible(true);
        setMessageText(`${err}...Попробуйте еще раз...`);
      })
      .finally(() => {
        setTimeout(() => {
          setInfoToolTipVisible(false);
        }, 1500);
      });
  };

  const handleUserUpdate = ({ name, email }) => {
    updateUserInfo(token, { name, email })
      .then(({ name, email }) => {
        setUserInfo({ name, email });
      })
  };

  const handleUserInfo = () => {
    getUserInfo(token)
      .then((user) => {
        setUserInfo(user);
      })
      .catch(() => {
        handleLogout();
      });
  };

  const handleLogout = () => {
    setToken("")
    setUserInfo({ name: "", email: "", password: "" });
    localStorage.removeItem('movies');
    localStorage.removeItem('more');
    localStorage.removeItem('search');
    localStorage.removeItem('filtred');
    setLoggedIn(false);
  };

  const handleGetMovies = () => {
    if (movies.length === 0) {
      return getMovies()
        .then(setMovies)
        .catch(console.debug);
    }

    return Promise.resolve(movies);
  }

  const handleGetSavedMovies = () => {
    if (savedMovies.length === 0) {
      return getUserMovies(token)
        .then(setSavedMovies)
        .catch(console.debug)
    }

    return Promise.resolve(savedMovies)
  }

  const handleSaveMovie = (movie) => {
    return createUserMovies(token, movie).then(movie => {
      setSavedMovies([ ...savedMovies, movie ])
    });
  }

  const handleDeleteMovie = ({ _id }) => {
    return deleteUserMovies(token, _id).then(() => {
      setSavedMovies(savedMovies.filter(m => m._id !== _id))
    });
  }

  return (
    <CurrentUserContext.Provider value={userInfo}>
      <div lang="en" className="App">
        {shouldDisplayHeader && (
          <Header
            loggedIn={loggedIn}
            registrationLink={"/signup"}
            login={"/signin"}
            main={"/"}
            profile={"/profile"}
          />
        )}

        <Routes>
          <Route path="/" element={<Main />} />
          {!loggedIn && (
          <Route
            path="/signup"
            element={<Register handleRegister={handleRegister} />}
          />
          )}
          {!loggedIn && (
          <Route
            path="/signin"
            element={<Login handleLogin={handleLogin} />}
          />
          )}
          <Route path="/movies"
            element={
              <ProtectedRoute
                element={Movies}
                movies={movies}
                savedMovies={savedMovies}
                getMovies={handleGetMovies}
                getSavedMovies={handleGetSavedMovies}
                onSave={handleSaveMovie}
                onDelete={handleDeleteMovie}
                loggedIn={loggedIn}
              />
            }
          />
          <Route path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                movies={savedMovies}
                getMovies={handleGetSavedMovies}
                onDelete={handleDeleteMovie}
                loggedIn={loggedIn}
              />
            }
          />
          <Route path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                handleUserUpdate={handleUserUpdate}
                handleLogout={handleLogout}
                loggedIn={loggedIn}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {shouldDisplayFooter && <Footer />}
        <InfoToolTip
          messageText={messageText}
          infoToolTipVisible={infoToolTipVisible}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

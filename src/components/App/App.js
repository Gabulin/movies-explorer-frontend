import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import Footer from "../Footer/Footer";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import {
  registerUser,
  loginUser,
  getUserInfo,
  updateUserInfo,
  createUserMovies,
  deleteUserMovies,
  getUserMovies,
} from "../../utils/MainApi";

import {
  TOKEN,
  FIRST_VISIT_SITE,
} from "../../utils/Constants";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(TOKEN ? true : false);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = React.useState({
    name: "",
    email: "",
  });

  const location = useLocation();
  const allowedPaths = ["/", "/movies", "/saved-movies", "/profile"];

  const shouldDisplayHeader = allowedPaths.includes(location.pathname);
  const shouldDisplayFooter =
    allowedPaths.includes(location.pathname) &&
    !["/profile", "/signup", "/signin"].includes(location.pathname);

    React.useEffect(() => {
      if (
        loggedIn &&
        !FIRST_VISIT_SITE &&
        (location === "movies" || location === "/")
      ) {
        navigate("/movies", { replace: true });
      }
      if (loggedIn) {
        sessionStorage.setItem("entrance", true);
        handleUserInfo();
      }
  
    }, []);

    const handleRegister = ({ name, email, password }) => {
      registerUser({ name, email, password })
        .then(() => {
          loginUser({ email, password })
            .then((res) => {
              localStorage.setItem("token", res.token);
              setLoggedIn(true);
              handleUserInfo();
              navigate("/movies", { replace: true });
            })
        })
    };
  
    const handleLogin = ({ email, password }) => {
      loginUser({ email, password })
        .then((res) => {
          localStorage.setItem("token", res.token);
          navigate("/profile", { replace: true });
          setLoggedIn(true);
          handleUserInfo();
        })
    };

    const handleUserUpdate = ({ name, email }) => {
      updateUserInfo({ name, email })
        .then((res) => {
          setUserInfo({ name: res.name, email: res.email });
        })
    };

    const handleUserInfo = () => {
      getUserInfo()
        .then((res) => {
          setUserInfo({
            name: res.user.name,
            email: res.user.email,
          });
        })
        .catch((err) => {
          localStorage.removeItem("token");
          handleLogout();
        })
    };

    const handleLogout = () => {
      localStorage.removeItem("token");
      setUserInfo({ name: "", email: "", password: "" });
      setLoggedIn(false);
    };

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
        <Route exact path="/" element={<Main />} />
        <Route
            path="/movies"
            element={
              <ProtectedRoute
                element={Movies}
                loggedIn={loggedIn}
              />
            }
          />
        <Route exact path="/saved-movies" element={<SavedMovies />} />
        <Route
            exact path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                handleUserUpdate={handleUserUpdate}
                handleLogout={handleLogout}
                loggedIn={loggedIn}
              />
            }
          />
        <Route
              path="/signup"
              element={<Register handleRegister={handleRegister} />}
            />
        <Route
              path="/signin"
              element={<Login handleLogin={handleLogin} />}
            />
        <Route exact path="*" element={<PageNotFound />} />
      </Routes>
      {shouldDisplayFooter && <Footer />}
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

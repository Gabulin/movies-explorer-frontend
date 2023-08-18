import { Routes, Route, useLocation } from "react-router-dom";
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

function App() {
  const location = useLocation();
  const allowedPaths = ["/", "/movies", "/saved-movies", "/profile"];

  const shouldDisplayHeader = allowedPaths.includes(location.pathname);
  const shouldDisplayFooter =
    allowedPaths.includes(location.pathname) &&
    !["/profile", "/signup", "/signin"].includes(location.pathname);

  return (
    <div lang="en" className="App">
      {shouldDisplayHeader && (
        <Header
          loggedIn={true}
          registrationLink={"/signup"}
          login={"/signin"}
          main={"/"}
          profile={"/profile"}
        />
      )}

      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/saved-movies" element={<SavedMovies />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/signup" element={<Register />} />
        <Route exact path="/signin" element={<Login />} />
        <Route exact path="*" element={<PageNotFound />} />
      </Routes>
      {shouldDisplayFooter && <Footer />}
    </div>
  );
}

export default App;

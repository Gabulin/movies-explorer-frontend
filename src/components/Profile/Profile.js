import React, { useState, useEffect } from "react";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Profile = ({ handleUserUpdate, handleLogout }) => {
  const context = React.useContext(CurrentUserContext);
  const [editProfile, setEditProfile] = useState(false);
  const [userName, setUserName] = useState(context.name);
  const [userEmail, setUserEmail] = useState(context.email);
  const [emailError, setEmailError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  React.useEffect(() => {
    if (context) {
      setUserEmail(context.email);
      setUserName(context.name);
    }
  }, [context]);

  React.useEffect(() => {
    const isNameChanged = userName !== context.name;
    const isEmailChanged = userEmail !== context.email;
    setHasUnsavedChanges(isNameChanged || isEmailChanged);
  }, [userName, userEmail, context]);

  const handleEditClick = () => {
    setEditProfile(true);
  };

  const handleCancelClick = () => {
    setEditProfile(false);
    setUserName(context.name);
    setUserEmail(context.email);
    setUserNameError("");
    setEmailError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      handleUserUpdate({
        name: userName,
        email: userEmail,
      });
      setEditProfile(false);
    }
  };

  const isFormValid = () => {
    return (
      userName.trim() !== "" &&
      userEmail.trim() !== "" &&
      emailError === "" &&
      userNameError === ""
    );
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!email) {
      setEmailError("Введите email");
    } else if (!emailRegex.test(email)) {
      setEmailError("Некорректный email");
    } else {
      setEmailError("");
    }
  };

  const validateUserName = (name) => {
    if (!name) {
      setUserNameError("Введите имя");
    } else {
      setUserNameError("");
    }
  };

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, {context.name}!</h1>
      <form className="profile__form" onSubmit={handleSubmit}>
        <fieldset className="profile__fieldset" disabled={!editProfile}>
          <label className="profile__input-label">
            <span className="profile__input-text">Имя</span>
            <input
              className="profile__input"
              type="text"
              name="name"
              placeholder="Имя"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                validateUserName(e.target.value);
              }}
              minLength={2}
              maxLength={30}
              required
            />
          </label>
          <span className="profile__line"></span>
          <span className="profile__error">{userNameError}</span>
          <label className="profile__input-label">
            <span className="profile__input-text">E-mail</span>
            <input
              className="profile__input"
              type="email"
              name="email"
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              placeholder="E-mail"
              required
            />
          </label>
          <span className="profile__error">{emailError}</span>
        </fieldset>
        <div className="profile__edit">
          {editProfile ? (
            <div>
              <button
                className={`profile__btn-save ${
                  !hasUnsavedChanges || !isFormValid()
                    ? "profile__btn-save--disabled"
                    : ""
                }`}
                type="submit"
                disabled={!hasUnsavedChanges || !isFormValid()}
              >
                Сохранить
              </button>
              <button
                className="profile__btn-cancel"
                type="button"
                onClick={handleCancelClick}
              >
                Отменить
              </button>
            </div>
          ) : (
            <button className="profile__btn-edit" onClick={handleEditClick}>
              Редактировать
            </button>
          )}
          <button className="profile__btn-signin" onClick={handleLogout}>
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>
  );
};

export default Profile;

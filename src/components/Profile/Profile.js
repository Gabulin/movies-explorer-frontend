import React from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const signOut = () => {
    navigate("/", { replace: true });
  };

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form className="profile__form">
        <fieldset className="profile__fieldset">
          <label className="profile__input-label">
            <span className="profile__input-text">Имя</span>
            <input
              className="profile__input"
              type="text"
              name="name"
              placeholder="Имя"
              defaultValue="Виталий"
              minLength={2}
              maxLength={30}
              required
            />
          </label>
          <span className="profile__line"></span>
          <label className="profile__input-label">
            <span className="profile__input-text">E-mail</span>
            <input
              className="profile__input"
              type="email"
              name="email"
              defaultValue="pochta@yandex.ru"
              placeholder="E-mail"
              required
            />
          </label>
        </fieldset>
        <div className="profile__edit">
          <button className="profile__btn-edit" type="submit">
            Редактировать
          </button>
          <button className="profile__btn-signin" onClick={signOut}>
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>
  );
}

export default Profile;

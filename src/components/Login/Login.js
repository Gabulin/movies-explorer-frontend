import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("pochta@yandex.ru");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Валидация данных
    if (!email) {
      setEmailError("Введите email");
      return;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Введите пароль");
      return;
    } else {
      setPasswordError("");
    }

    // Действия по регистрации
    console.log("Выполняется регистрация...");
  };

  return (
    <section className="register">
      <Link to="/">
        <img src={logo} alt="Логотип" className="register__logo" />
      </Link>
      <h1 className="register__title">Рады видеть!</h1>
      <form className="register__form" onSubmit={handleSubmit}>
        <fieldset className="register__fieldset">
          <label className="register__input-label">
            <span className="register__input-text">E-mail</span>
            <input
              className="register__input"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <span className="register__validate-error">{emailError}</span>
          </label>
          <label className="register__input-label">
            <span className="register__input-text">Пароль</span>
            <input
              className="register__input"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
              minLength={2}
              maxLength={30}
              required
            />
            <span className="register__validate-error">{passwordError}</span>
          </label>
        </fieldset>
        <div className="register__edit">
          <button className="register__btn-edit" type="submit">
            Войти
          </button>
          <div className="register__question">
            <p className="register__question-text">Ещё не зарегистрированы?</p>
            <Link to="/signup" className="register__btn-signin">
              Регистрация
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Login;

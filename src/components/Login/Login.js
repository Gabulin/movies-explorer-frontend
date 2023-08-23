import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Login.css";

function Login({ handleLogin }) {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

  const validatePassword = (password) => {
    if (!password) {
      setPasswordError("Введите пароль");
    } else if (password.length < 6 || password.length > 30) {
      setPasswordError("Пароль должен быть от 6 до 30 символов");
    } else {
      setPasswordError("");
    }
  };

  const isFormValid = () => {
    return userEmail.trim() !== "" && userPassword.trim() !== "" && emailError === "" && passwordError === "";
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    // Валидация данных
    validateEmail(userEmail);
    validatePassword(userPassword);

    // Если форма валидна, выполнить действия по входу
    if (isFormValid()) {
      handleLogin({
        email: userEmail,
        password: userPassword
      });
    }
  };

  return (
    <section className="register">
      <div className="register-container">
        <Link to="/">
          <img src={logo} alt="Логотип" className="register__logo" />
        </Link>
        <h1 className="register__title">Рады видеть!</h1>
        <form className="register__form" onSubmit={handleSubmitLogin}>
          <fieldset className="register__fieldset">
            <label className="register__input-label">
              <span className="register__input-text">E-mail</span>
              <input
                className={`register__input ${emailError && "register__input_error"}`}
                type="email"
                name="email"
                value={userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                placeholder="Email"
                required
              />
              <span className="register__validate-error">{emailError}</span>
            </label>
            <label className="register__input-label">
              <span className="register__input-text">Пароль</span>
              <input
                className={`register__input ${passwordError && "register__input_error"}`}
                type="password"
                name="password"
                value={userPassword}
                onChange={(e) => {
                  setUserPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
                placeholder="password"
                minLength={6}
                maxLength={30}
                required
              />
              <span className="register__validate-error">{passwordError}</span>
            </label>
          </fieldset>
        </form>
      </div>
      <div className="register__edit">
        <button className="register__btn-edit" type="submit" disabled={!isFormValid()} onClick={handleSubmitLogin}>
          Войти
        </button>
        <div className="register__question">
          <p className="register__question-text">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="register__btn-signin">
            Регистрация
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;

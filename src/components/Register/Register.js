import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Register.css";

function Register({ handleRegister }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Поле не должно быть пустым" }));
    } else if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Некорректный email" }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
  };

  const validateName = (name) => {
    if (!name) {
      setErrors((prevErrors) => ({ ...prevErrors, name: "Поле не должно быть пустым" }));
    } else if (name.length < 2 || name.length > 30) {
      setErrors((prevErrors) => ({ ...prevErrors, name: "Имя должно быть от 2 до 30 символов" }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
    }
  };

  const validatePassword = (password) => {
    if (!password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "Поле не должно быть пустым" }));
    } else if (password.length < 6 || password.length > 30) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "Пароль должен быть от 6 до 30 символов" }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };

  const isFormValid = () => {
    return (
      userName.trim() !== "" &&
      userEmail.trim() !== "" &&
      userPassword.trim() !== "" &&
      Object.values(errors).every((error) => error === "")
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    if (name === "email") {
      setUserEmail(value);
      validateEmail(value);
    } else if (name === "name") {
      setUserName(value);
      validateName(value);
    } else if (name === "password") {
      setUserPassword(value);
      validatePassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isFormValid()) {
      try {
        await handleRegister({
          name: userName,
          email: userEmail,
          password: userPassword,
        });
      } catch (error) {
        console.error("Ошибка:", error);
      }
    }
  };
  
  const renderInput = (
    type,
    name,
    placeholder,
    minLength,
    maxLength,
    required,
    errorMessage
  ) => (
    <label className="register__input-label">
      <span className="register__input-text">{placeholder}</span>
      <input
        className={`register__input ${errorMessage && "register__input_error"}`}
        type={type}
        name={name}
        placeholder={placeholder}
        value={name === "name" ? userName : name === "email" ? userEmail : userPassword}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        onChange={handleChange}
      />
      <span className="register__validate-error">{errorMessage}</span>
    </label>
  );

  return (
    <section className="register">
      <div className="register-container">
        <Link to="/">
          <img src={logo} alt="Логотип" className="register__logo" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <form className="register__form">
          <fieldset className="register__fieldset">
            {renderInput("text", "name", "Имя", 2, 30, true, errors.name)}
            {renderInput("email", "email", "E-mail", 0, 100, true, errors.email)}
            {renderInput(
              "password",
              "password",
              "Пароль",
              6,
              30,
              true,
              errors.password
            )}
          </fieldset>
        </form>
      </div>
      <div className="register__edit">
        <button
          className={`register__btn-edit ${isFormValid() ? "" : "register__btn-edit_disabled"}`}
          type="submit"
          disabled={!isFormValid()}
          onClick={handleSubmit} // Вызываем handleSubmit при нажатии кнопки
        >
          Зарегистрироваться
        </button>
        <div className="register__question">
          <p className="register__question-text">Уже зарегистрированы?</p>
          <Link to="/signin" className="register__btn-signin">
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Register;

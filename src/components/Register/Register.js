import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "./Register.css";

const defaultValues = {
  name: "Виталий",
  email: "pochta@yandex.ru",
  password: "**********",
};

function Register() {
  const [formData, setFormData] = useState(defaultValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
        value={formData[name]}
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
            {renderInput("text", "name", "Имя", 2, 30, true, "")}
            {renderInput("email", "email", "E-mail", 0, 100, true, "")}
            {renderInput(
              "password",
              "password",
              "Пароль",
              6,
              30,
              true,
              "Что-то пошло не так..."
            )}
          </fieldset>
        </form>
      </div>
      <div className="register__edit">
        <button className="register__btn-edit" type="submit">
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

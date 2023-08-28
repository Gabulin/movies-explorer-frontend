import { Link, useNavigate } from "react-router-dom";
import "./PageNotFound.css";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <section className="page-not-found">
      <h1 className="page-not-found__title">404</h1>
      <p className="page-not-found__text">Страница не найдена</p>
      <button onClick={() => navigate(-1)}  className="page-not-found__link">
        Назад
      </button>
    </section>
  );
}

export default PageNotFound;

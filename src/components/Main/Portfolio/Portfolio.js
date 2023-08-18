import "./Portfolio.css";
import arrow from "../../../images//arrow.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://gabulin.github.io/how-to-learn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="portfolio__link-text"> Статичный сайт</p>
            <img
              src={arrow}
              className="portfolio__link-icon"
              alt="Иконка стрелки"
            ></img>
          </a>
        </li>

        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://gabulin.github.io/russian-travel/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="portfolio__link-text"> Адаптивный сайт</p>
            <img
              src={arrow}
              className="portfolio__link-icon"
              alt="Иконка стрелки"
            />
          </a>
        </li>

        <li className="portfolio__item">
          <a
            className="portfolio__link"
            href="https://gabulib.frontend.nomoredomains.xyz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <img
              src={arrow}
              className="portfolio__link-icon"
              alt="Иконка стрелки"
            ></img>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;

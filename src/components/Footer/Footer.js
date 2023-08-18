import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__container">
        <p className="footer__copyright">© 2023</p>
        <div className="footer__links">
          <a
            href="https://practicum.yandex.ru/"
            target="_blank"
            className="footer__link"
          >
            Яндекс.Практикум
          </a>
          <a href="https://github.com" target="_blank" className="footer__link">
            Github
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

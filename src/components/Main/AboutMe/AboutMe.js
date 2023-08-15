import "./AboutMe.css";
import avatar from "../../../images/avatar.jpg";
import Title from "../Title/Title";

function AboutMe() {
  return (
    <section className="about-me" id="student">
      <Title title="Студент" />
      <div className="about-me__info">
        <div className="about-me__info-description">
          <h3 className="about-me__info-title">Виталий</h3>
          <h4 className="about-me__info-subtitle">
            Фронтенд-разработчик, 30 лет
          </h4>
          <p className="about-me__info-text">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            href="https://github.com/Gabulin"
            target="_blank"
            className="about-me__github"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </div>
        <img
          src={avatar}
          alt="Фотография студента Виталия"
          className="about-me__avatar"
        />
      </div>
    </section>
  );
}

export default AboutMe;

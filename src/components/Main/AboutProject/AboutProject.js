import "./AboutProject.css";
import Title from "../Title/Title";

function AboutProject() {
  return (
    <section className="about-project" id="about">
      <Title title="О проекте" />
      <div className="about-project__description">
        <div className="about-project__content">
          <h3 className="about-project__content-title">
            Дипломный проект включал 5 этапов
          </h3>
          <p className="about-project__content-text">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__content">
          <h3 className="about-project__content-title">
            На выполнение диплома ушло 5 недель
          </h3>
          <p className="about-project__content-text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__timing">
        <div className="about-project__back">
          <span className="about-project__period-back">1 неделя</span>
          <p className="about-project__timing-text">Back-end</p>
        </div>
        <div className="about-project__front">
          <span className="about-project__period-front">4 недели</span>
          <p className="about-project__timing-text">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;

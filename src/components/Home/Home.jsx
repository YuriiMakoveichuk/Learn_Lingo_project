import { Link } from "react-router-dom";
import { Container } from "../Container/Container.jsx";

import block from "../../assets/img/block.png";

import css from "./Home.module.css";

const Home = () => {
  return (
    <main>
      <section className={css.section}>
        <Container>
          <div className={css.box}>
            <div className={css.boxText}>
              <h1 className={css.title}>
                Unlock your potential with the best{" "}
                <span className={css.spanTitle}>language</span> tutors
              </h1>
              <p className={css.text}>
                Embark on an Exciting Language Journey with Expert Language
                Tutors: Elevate your language proficiency to new heights by
                connecting with highly qualified and experienced tutors.
              </p>
              <Link className={css.link} to="/teachers">
                Get started
              </Link>
            </div>
            <img className={css.boxImg} src={block} alt="Girl and laptop" />
          </div>
          <ul className={css.listInfo}>
            <li className={css.itemInfo}>
              <p className={css.currentInfo}>32,000&nbsp;+</p>
              <p className={css.textInfo}>Experienced tutors</p>
            </li>
            <li className={css.itemInfo}>
              <p className={css.currentInfo}>300,000&nbsp;+</p>
              <p className={css.textInfo}>5-star tutor reviews</p>
            </li>
            <li className={css.itemInfo}>
              <p className={css.currentInfo}>120&nbsp;+</p>
              <p className={css.textInfo}>Subjects taught</p>
            </li>
            <li className={css.itemInfo}>
              <p className={css.currentInfo}>200&nbsp;+</p>
              <p className={css.textInfo}>Tutor nationalities</p>
            </li>
          </ul>
        </Container>
      </section>
    </main>
  );
};

export default Home;

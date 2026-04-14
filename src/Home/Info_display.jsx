import styles from "./Home.module.css";
import Teacher_teaching from "../assets/woman-teaching-kids-about-planets.jpg";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

export default function Info_display({
  text_type = "list",
  image_side = "left",
  image = Teacher_teaching,
  title = "Title of the Info",
  title_size = { fontSize: "2rem" },
  content = [
    [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et do magna aliqua",
    ],
    [
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    ],
    [
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum do eu fugiat nulla pariatur. ",
    ],
    [
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ],
  ],
}) {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // animation duration
  }, []);

  function list_passage(type) {
    if (type == "list") {
      return (
        <ul>
          {content.map((element, index) => (
            <li key={index}>{element}</li>
          ))}
        </ul>
      );
    } else {
      return <p>{content}</p>;
    }
  }

  if (image_side == "left") {
    return (
      <>
        <div className={styles.info_display_main_container}>
          <img
            data-aos="fade-right"
            src={image}
            className={styles.info_image}
            alt="Image of Kids"
          />
          <div className={styles.info_container}>
            <h1 className={`${styles.info_title}`} style={title_size}>
              {title}
            </h1>
            {list_passage(text_type)}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={styles.info_display_main_container}>
          <div className={styles.info_container}>
            <h1 className={styles.info_title} style={title_size}>
              {title}
            </h1>
            {list_passage(text_type)}
          </div>
          <img
            data-aos="fade-left"
            src={image}
            className={styles.info_image}
            alt="Image of Kids"
          />
        </div>
      </>
    );
  }
}

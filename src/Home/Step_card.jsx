import styles from "./Home.module.css";
import Image_url from "../assets/3D image of the numb.png";
import Button from "../Buttons/Button";
import Button2 from "../Buttons/Button2";

export default function Step_card({
  image = Image_url,
  title = "Title",
  title_description = "This is the description the card , What its all about",
  color = { background: "#00FFEE" },
}) {
  return (
    <>
      <div style={color} className={styles.card}>
        <img
          className={`${styles.number_image} ${styles.Step_card_margin}`}
          src={image}
        />
        <h3 className={`${styles.Step_card_margin} ${styles.font_step_card}`}>
          {title}
        </h3>
        <p className={`${styles.Step_card_margin} ${styles.title_description}`}>
          {title_description}
        </p>
      </div>
    </>
  );
}

import styles from "./Home.module.css";
import Image_url from "../assets/Sms .png";

export default function Benefits_card({
  image = Image_url,
  title = "Title",
  title_description = "This is the description the card , What its all about",
  color = { background: "#00FFEE" },
}) {
  return (
    <>
      <div style={color} className={`${styles.benefits_card}`}>
        <h3 className={styles.Step_card_margin}>{title}</h3>
        <p className={`${styles.Step_card_margin} ${styles.title_description}`}>
          {title_description}
        </p>
        <img
          className={`${styles.number_image} ${styles.Step_card_margin}`}
          src={image}
        />
      </div>
    </>
  );
}

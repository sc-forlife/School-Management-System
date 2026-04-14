import styles from "./About.module.css";

export default function Hero_section() {
  return (
    <>
      <div className={styles.image_container}>
        <h1 className={styles.title_hero_section}>About Us</h1>
        <p className={styles.Hero_section_text}>
          “Bridging Parents, Teachers, and Caregivers for Brighter Futures
          Because every child deserves the right support, every step of the
          way."
        </p>
      </div>
    </>
  );
}

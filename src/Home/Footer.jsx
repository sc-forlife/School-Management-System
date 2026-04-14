import styles from "./Home.module.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className={styles.footer_main_container}>
        <div className={styles.footer_icon_links}>
          <div className={styles.icon_social_media}>
            <i class="bi bi-facebook"></i>
            <i class="bi bi-twitter"></i>
            <i class="bi bi-instagram"></i>
            <i class="bi bi-linkedin"></i>
          </div>
          <div
            className={`${styles.icon_links_link} ${styles.icon_social_media}`}
          >
            <Link className={styles.links} to={"/"}>
              Home
            </Link>
            <Link className={styles.links} to={"/about"}>
              About
            </Link>
            <Link className={styles.links} to={"/Sign_up"}>
              Register
            </Link>
          </div>
          <div className={styles.footer_text}>
            <p>&copy; 2025 Salem Chirau | All rights reserved</p>
          </div>
        </div>
      </div>
    </>
  );
}

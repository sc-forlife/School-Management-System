import styles from "./Home.module.css";
import Image from "../assets/kid-playing-with-paper-plane.jpg";
import Button from "../Buttons/Button";
import Button2 from "../Buttons/Button2";
import { Link } from "react-router-dom";

export default function Hero_section() {
  return (
    <>
      <div className={styles.main_content}>
        <img
          className={styles.hero_image}
          src={Image}
          alt="Kids seated at the table"
        />
        <div className={styles.content_data}>
          <h2 className={styles.margin}>
            Connecting Parents and Care-givers , Empowering Children
          </h2>
          <p className={styles.margin}>
            Track behavior, and progress while staying connected to your child’s
            world anytime, anywhere.
          </p>
          <Link to={"/Sign_up"}>
            <Button nameBtn="Get Started" />
          </Link>
        </div>
      </div>
    </>
  );
}

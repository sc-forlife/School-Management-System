import styles from "./Home.module.css";
import Image from "../assets/kid-playing-with-paper-plane.jpg";
import Button from "../Buttons/Button";
import Button2 from "../Buttons/Button2";
import Step_Card from "./Step_card";
import Image_number from "../assets/3D image of the numb2.png";
import Image_number2 from "../assets/3D image of the numb3.png";

export default function Get_connected() {
  return (
    <>
      <div className={styles.main_content_get_connected}>
        <h1>Get Connected in Three Steps</h1>
        <br></br>
        <div className={styles.cards_container}>
          <Step_Card
            title="Sign Up"
            title_description="Schools register and verify. Parents join using their school invite code."
          />
          <div className={`${styles.arrow1} ${styles.arrow}`}></div>
          <Step_Card
            image={Image_number}
            title="Connect Your Child"
            title_description="Parents link to their child’s profile created by the school."
            color={{
              background: "linear-gradient(0deg, #FFFFFF 40% ,#00FFEE 100%)",
            }}
          />
          <div className={`${styles.arrow2} ${styles.arrow}`}></div>
          <Step_Card
            image={Image_number2}
            title="Stay Updated"
            title_description="Get reports, events, and direct communication anytime."
            color={{
              background: "#FFFFFF",
            }}
          />
        </div>
      </div>
    </>
  );
}

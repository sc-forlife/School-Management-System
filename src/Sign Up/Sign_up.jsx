import styles from "./Sign_up.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Nav from "../NavBar/Navbar";
import Button from "../Buttons/Button";
import Image from "../assets/ywpp_iurg_220311.jpg";

function Sign_up({ nav = true }) {
  if (nav) {
    return (
      <>
        <div className={styles.body_background}>
          <Nav />
          <div className={styles.main_container}>
            <div className={styles.image_container}>
              <img className={styles.image} src={Image} />
            </div>
            <div className={styles.content_container}>
              <div>
                <h1 className={styles.get_started}>Get Started Today</h1>
              </div>
              <div className={styles.block}>
                <Link className={styles.line} to={"/Registration/Parent"}>
                  <Button nameBtn="Parent" />
                </Link>
                <Link className={styles.line} to={"/Registration"}>
                  <Button nameBtn="School" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={styles.body_background}>
          <div className={styles.main_container}>
            <div className={styles.image_container}>
              <img className={styles.image} src={Image} />
            </div>
            <div className={styles.content_container}>
              <div>
                <h1 className={styles.get_started}>Get Started Today</h1>
              </div>
              <div className={styles.block}>
                <Link className={styles.line} to={"/Registration/Parent"}>
                  <Button nameBtn="Parent" />
                </Link>
                <Link className={styles.line} to={"/Registration"}>
                  <Button nameBtn="School" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Sign_up;

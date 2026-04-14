import styles from "./Button.module.css";
import { Fragment } from "react";

export default function Button2({ name = "Button2" }) {
  return (
    <>
      <button className={`${styles.Button} ${styles.Button2}`}>{name}</button>
    </>
  );
}

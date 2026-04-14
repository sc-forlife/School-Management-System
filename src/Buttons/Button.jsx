import styles from "./Button.module.css";
import { Fragment } from "react";

export default function Button({
  nameBtn = "Button",
  type = "",
  onClick = () => {},
}) {
  return (
    <>
      <button onClick={onClick} className={styles.Button} name="" type={type}>
        {nameBtn}
      </button>
    </>
  );
}

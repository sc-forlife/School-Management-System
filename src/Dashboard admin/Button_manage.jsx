import styles from "./Dashboard.module.css";

export default function Button_manage({ title = "Button" }) {
  return (
    <>
      <button className={styles.managing_button}>{title}</button>
    </>
  );
}

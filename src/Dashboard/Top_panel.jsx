import styles from "./Dashboard.module.css";

export default function Top_panel({ title = "Hello User", passage = "" }) {
  return (
    <>
      <div className={styles.top_panel}>
        <h4>{title}</h4>
        <p>{passage}</p>
      </div>
    </>
  );
}

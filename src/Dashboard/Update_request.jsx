import styles from "./Dashboard.module.css";

export default function Update_request({
  title = "Update Request",
  type = "submit",
}) {
  return (
    <>
      <button type={type} className={styles.button_update_request}>
        {title}
      </button>
    </>
  );
}

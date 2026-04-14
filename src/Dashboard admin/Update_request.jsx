import styles from "./Dashboard.module.css";

export default function Update_request({
  title = "Update Request",
  margin_top = "30px",
  margin_bottom = "30px",
  type = "submit",
}) {
  return (
    <>
      <button
        className={styles.button_update_request}
        style={{ marginTop: `${margin_top}`, marginBottom: `${margin_bottom}` }}
        type={type}
      >
        {title}
      </button>
    </>
  );
}

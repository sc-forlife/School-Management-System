import styles from "./Dashboard.module.css";

export default function Textarea({
  title = "Level name",
  placeholder = "Enter text",
  name = "",
  value = "",
  onChange = () => {},
}) {
  return (
    <>
      <div className={styles.textarea_container}>
        <h5>{title}</h5>
        <textarea
          placeholder={placeholder}
          className={styles.textarea}
          name={name}
          value={value}
          onChange={onChange}
          required
        ></textarea>
      </div>
    </>
  );
}

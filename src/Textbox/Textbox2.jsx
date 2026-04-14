import styles from "./Textbox.module.css";

export default function Textbox({
  type = "text",
  label = "Textbox",
  placeholder = "Enter text...",
  id = "textbox",
  value = "",
  onChange = () => {}, // ✅ function
  name = "", // ✅ match React
  required = 1,
  style = { width: "230px" },
}) {
  return (
    <label>
      {label}:
      <input
        style={style}
        className={styles.textbox}
        type={type}
        id={id}
        autoComplete="current-password"
        name={name} // ✅ match formData key
        placeholder={placeholder}
        value={value} // ✅ controlled input
        onChange={onChange} // ✅ function
        required
      />
    </label>
  );
}

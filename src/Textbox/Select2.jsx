import styles from "./Textbox.module.css";

export default function Select({
  label = "Select Option",
  placeholder = "Choose...",
  id = "select_input",
  select_list = [], // expects array of { value, label }
  name = "",
  value = "", // ✅ added value prop
  onChange = () => {},
  style = { width: "230px" },
}) {
  return (
    <label htmlFor={id} className={styles.select}>
      {label}:
      <select
        id={id}
        style={style}
        name={name}
        value={value} // ✅ binds selected value
        onChange={onChange}
        className={styles.textbox}
        required
      >
        <option value="">{placeholder}</option>
        {select_list.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

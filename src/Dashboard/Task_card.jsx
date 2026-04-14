import styles from "./Dashboard.module.css";

export default function Task_card({ passage = "Numbers" }) {
  const colors = [
    "linear-gradient(135deg, #fef08a, #fde047)",
    "linear-gradient(135deg, #bfdbfe, #60a5fa)",
    "linear-gradient(135deg, #bbf7d0, #4ade80)",
    "linear-gradient(135deg, #fbcfe8, #f472b6)",
    "linear-gradient(135deg, #ddd6fe, #a78bfa)",
  ];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <>
      <div
        className={styles.task_completed}
        style={{ background: randomColor }}
      >
        <p style={{ marginBottom: "0px" }}>{passage}</p>
      </div>
    </>
  );
}

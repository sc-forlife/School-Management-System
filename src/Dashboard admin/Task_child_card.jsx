import styles from "./Dashboard.module.css";

export default function Task_child_card({
  passage1 = "Name: Unknown",
  passage2 = "Gender: N/A",
  passage3 = "DOB: N/A",
  passage4 = "Child Key: N/A",
}) {
  const gradients = [
    "linear-gradient(135deg, #6EE7B7, #3B82F6)",
    "linear-gradient(135deg, #FDE68A, #F59E0B)",
    "linear-gradient(135deg, #F9A8D4, #EC4899)",
    "linear-gradient(135deg, #C7D2FE, #6366F1)",
    "linear-gradient(135deg, #A7F3D0, #10B981)",
  ];
  const randomGradient =
    gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <div className={styles.child_card} style={{ background: randomGradient }}>
      <div className={styles.child_card_content}>
        <p>{passage1}</p>
        <p>{passage2}</p>
        <p>{passage3}</p>
        <p>{passage4}</p>
      </div>
    </div>
  );
}

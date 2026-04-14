import { useState } from "react";
import styles from "./Home.module.css";

export default function Drop_down_tab({
  question = "What is life?",
  answer = "Life is what happens when you're busy making other plans.",
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.faq_item}>
      {/* Question Row */}
      <div
        className={styles.faq_question}
        onClick={() => setExpanded(!expanded)}
      >
        <h3>{question}</h3>
        <i
          className={`bi ${expanded ? "bi-arrow-up" : "bi-arrow-down"}`}
          style={{ fontSize: "1.5rem", transition: "transform 0.3s" }}
        ></i>
      </div>

      {/* Answer (toggle with height animation) */}
      <div className={`${styles.faq_answer} ${expanded ? styles.show : ""}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
}

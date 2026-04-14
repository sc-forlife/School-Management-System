import styles from "./About.module.css";

export default function Passage({
  title = "Hello",
  passage = "Lorem Ipsum is a dummy text commonly used in the printing and typesetting industry. It has been the industry's standard placeholder text since the 1500s, when an unknown printer scrambled a galley of type to create a type specimen book. The text is derived from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. It serves as a useful tool for designers and developers to showcase how a layout will look without the distraction of meaningful content.",
}) {
  return (
    <>
      <div className={styles.passage_text}>
        <h1>{title}</h1>
        <p className={styles.passage_description}>{passage}</p>
      </div>
    </>
  );
}

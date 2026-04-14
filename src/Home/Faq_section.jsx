import styles from "./Home.module.css";
import Drop_down_tab from "./Drop_down_tab";

export default function Faq_section() {
  return (
    <>
      <div className={styles.main_FAQ_SECTION}>
        <h1>FAQ</h1>
        <Drop_down_tab
          question="Is the app really free to use?"
          answer="Yes, Kiddilink is completely free for parents and schools."
        />
        <Drop_down_tab
          question="How do schools get started?"
          answer="Schools register first, then invite parents to join using secure codes."
        />
        <Drop_down_tab
          question="What if my school isn’t listed?"
          answer="Parents can’t register alone. Ask your school to sign up first, then you’ll be able to join."
        />
        <Drop_down_tab
          question="Does the app support local languages?"
          answer="Currently in English, but we’re working on adding local languages for easier access."
        />
      </div>
    </>
  );
}

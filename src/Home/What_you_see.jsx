import Info_display from "./Info_display";
import Sms_demo from "../assets/SMS DEMO.png";
import Dashboard from "../assets/Dashboard demo.png";
import styles from "./Home.module.css";

export default function What_you_see() {
  let title_content1 = `Everything you need as a parent or teacher, organized in one simple dashboard.`;

  let title_content2 = `Share updates, ask questions, and stay connected anytime with clear communication that strengthens home–school collaboration.`;

  return (
    <>
      <div className={styles.What_you_see_container}>
        <h1>What you will see</h1>
        <Info_display
          title="Dashboard with summarized details"
          content={title_content1}
          text_type="passage"
          image={Dashboard}
          image_side="right"
          title_size={{ fontSize: "1.5rem" }}
        />
        <Info_display
          title="Secure End-to-End Communication "
          content={title_content2}
          text_type="passage"
          image={Sms_demo}
          image_side="left"
          title_size={{ fontSize: "1.5rem" }}
        />
      </div>
    </>
  );
}

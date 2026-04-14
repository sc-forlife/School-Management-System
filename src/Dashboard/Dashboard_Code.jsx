import styles from "./Dashboard.module.css";
import Right_panel from "./Right_panel";
import Left_panel from "./Left_panel";
import Top_panel from "./Top_panel";

export default function Dasboard_main() {
  return (
    <>
      <div className={styles.inline_display}>
        <Left_panel />
        <div className={styles.Dashboard_mid_section}>
          <Top_panel passage={`Today is ${formatted}`} />
          <div className={styles.Dashboard_main_body}>
            {/* DASHBOARD BODY */}
          </div>
        </div>
        <Right_panel />
      </div>
    </>
  );
}

import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Pricing() {
  return (
    <>
      <div className={styles.pricing_main_container}>
        <div className={styles.title_pricing_container}>
          <h1 className={styles.title_pricing_color}>PRICING</h1>
        </div>
        <div className={styles.title_pricing_number_container}>
          <h1 className={styles.inline_pricing}>N$0</h1>
          <p className={styles.inline_pricing}>/year</p>
          <hr className={styles.pricing_hr_line}></hr>
        </div>
        <div className={styles.pricing_content_container}>
          <p>
            <i className="bi bi-toggle-on"></i> Unlimited Parents
          </p>
          <p>
            <i className="bi bi-toggle-on"></i> Child Progress Tracking
          </p>
          <p>
            <i className="bi bi-toggle-on"></i> Real-Time Messaging
          </p>
          <p>
            <i className="bi bi-toggle-on"></i> Daily Logs & Health Notes
          </p>
          <p>
            <i className="bi bi-toggle-on"></i> Event Calendar + Noticeboard
          </p>
        </div>
      </div>
    </>
  );
}

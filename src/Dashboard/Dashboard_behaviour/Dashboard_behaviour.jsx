//cleaned and commented

import styles from "../Dashboard.module.css";
import styles2 from "./Behaviour.module.css";
import Right_panel from "../Right_panel";
import Left_panel from "../Left_panel";
import Top_panel from "../Top_panel";
import Update from "../Dashboard_progress/Updates";
import Update_request from "../Update_request";
import { useState, useEffect } from "react";
import axios from "axios";
import AlertPopup from "../../Alert";

export default function Dasboard_behaviour() {
  // State for user session data
  const [user, setUser] = useState({});

  // State for behaviour data from backend
  const [area_dev, setAreaDev] = useState(null);

  // Data used for submitting an update request
  const [formData, setFormData] = useState({});

  // Date of the last update
  const [date, setDate] = useState("");

  // Alert popup data
  const [alertData, setAlertData] = useState({
    show: false,
    type: "",
    message: "",
  });

  // Function to show alert popup
  const showAlert = (type, message) => {
    // Reset first to allow re-render even with same message/type
    setAlertData({ show: false, type: "", message: "" });
    setTimeout(() => {
      setAlertData({ show: true, type, message });
    }, 50);
  };

  // Load user data from sessionStorage
  useEffect(() => {
    const user_data = JSON.parse(sessionStorage.getItem("userparent"));
    setUser(user_data);

    // Pre-fill form data for update requests
    setFormData({
      parent_name: user_data.username,
      child_id: user_data.Child_id,
      area_dev: "Child Behaviour",
      school_name: user_data.school_name,
    });
  }, []);

  // Fetch behaviour progress data
  useEffect(() => {
    if (!user || !user.Child_id) return; // Wait until user data is loaded

    axios
      .post("http://localhost/api/get_progress.php", {
        Child_ID: user.Child_id,
        area_dev: "Child Behaviour",
        school_name: user.school_name,
      })
      .then((response) => {
        if (response.data.status) {
          if (response.data.data.length > 0) {
            // Use the first record returned
            setAreaDev(response.data.data[0]);
            setDate(response.data.data[0].created_at.slice(0, 10));
          }
          showAlert("success", "Child behaviour data found!");
        } else {
          showAlert("warning", response.data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "View console for more details.");
      });
  }, [user]);

  // Handle submitting an update request
  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost/api/add_update_request.php", formData)
      .then((response2) => {
        if (response2.data.status) {
          showAlert("success", "Update request has been sent!");
        } else {
          showAlert("danger", response2.data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "View console for more details.");
      });
  }

  return (
    <div className={styles.inline_display}>
      {/* Alert Popup */}
      <AlertPopup
        show={alertData.show}
        type={alertData.type}
        message={alertData.message}
        onClose={() => setAlertData({ show: false, type: "", message: "" })}
      />

      <Left_panel />

      <div className={styles.Dashboard_mid_section}>
        <Top_panel
          title="Child Behaviour Update"
          passage={`Updated on ${date}`}
        />

        <div className={styles.Dashboard_main_body}>
          {/* Current behaviour status */}
          <Update
            title="How your child is doing"
            content={
              area_dev
                ? area_dev.current_level.split(". ").map((c) => [c])
                : [["Waiting for update..."]]
            }
          />

          {/* Recent positive behaviour */}
          <Update
            color="#00aeffa9"
            title="What they recently did well"
            content={
              area_dev
                ? area_dev.recent_ach.split(". ").map((c) => [c])
                : [["Waiting for update..."]]
            }
          />

          {/* Next focus area */}
          <Update
            color="#2ef72bac"
            title="What We’re Focusing on Next"
            content={
              area_dev
                ? area_dev.next_steps.split(". ").map((c) => [c])
                : [["Waiting for update..."]]
            }
          />

          {/* Form to send an update request */}
          <form onSubmit={handleSubmit}>
            <Update_request />
          </form>
        </div>
      </div>

      <Right_panel />
    </div>
  );
}

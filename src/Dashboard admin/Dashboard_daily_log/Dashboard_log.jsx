//cleaned and commented

import styles from "../Dashboard.module.css";
import styles2 from "./Daily_log.module.css";
import Right_panel from "../Right_panel";
import Left_panel from "../Left_panel";
import Top_panel from "../Top_panel";
import { Link } from "react-router-dom";
import Button from "../../Buttons/Button";
import Select from "../../Textbox/Select2";
import Textbox from "../../Textbox/Textbox2";
import Textarea from "../textarea";
import Update_request from "../Update_request";
import Button_manage from "../Button_manage";
import Child_card from "../Child_card";
import { useState, useEffect } from "react";
import axios from "axios";
import AlertPopup from "../../Alert";

export default function Daily_log() {
  // -------------------------------
  // State variables
  // -------------------------------
  const [child, setChild] = useState([]); // Child list
  const [userItems, setUser] = useState({}); // Logged in user data
  const [num, setNum] = useState(0); // Control variable (not used much)
  const [formData, setFormData] = useState({}); // Form input data

  // Alert popup data
  const [alertData, setAlertData] = useState({
    show: false,
    type: "",
    message: "",
  });

  // -------------------------------
  // Function to show alert popup
  // -------------------------------
  const showAlert = (type, message) => {
    // Reset first to trigger re-render even with same message/type
    setAlertData({ show: false, type: "", message: "" });
    setTimeout(() => {
      setAlertData({ show: true, type, message });
    }, 50);
  };

  // -------------------------------
  // Load user data from session
  // -------------------------------
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("useradmin"));
    setUser((u) => ({ ...u, ...user }));
    setNum(1);
  }, []);

  // -------------------------------
  // Fetch children based on school name
  // -------------------------------
  useEffect(() => {
    if (!userItems.school_name) return;

    axios
      .post("http://localhost/api/edit_child.php", {
        school_name: userItems.school_name,
      })
      .then((response) => {
        setChild(response.data.data);
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "No children found for this school.");
      });
  }, [userItems]);

  // -------------------------------
  // Handle form input changes
  // -------------------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -------------------------------
  // Handle form submission
  // -------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost/api/add_log.php", {
        ...formData,
        school_name: userItems.school_name,
      })
      .then((response2) => {
        if (response2.data.status) {
          setFormData({
            Child_ID: "",
            daily_log: "",
          });
          showAlert("success", "Daily log recorded successfully");
        } else {
          showAlert("danger", response2.data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "View console for more information.");
      });
  };

  // -------------------------------
  // Handle child selection
  // -------------------------------
  const handleSelectChild = (e) => {
    const childID = e.target.value;
    setFormData((f) => ({ ...f, Child_ID: childID }));

    // Fetch existing daily log for selected child
    axios
      .post("http://localhost/api/get_log.php", {
        child_id: childID,
        school_name: userItems.school_name,
      })
      .then((response) => {
        const child = response.data.data[0];
        setFormData({
          Child_ID: child.child_id,
          art: child.art,
          nap: child.nap,
          snack: child.snack,
          learning: child.learning,
          day_mood: child.day_mood,
          final_note: child.final_note,
        });
        showAlert("success", "Daily log records found!");
      })
      .catch((err) => {
        console.error("Error:", err);
        setFormData({ Child_ID: childID });
        showAlert("warning", "No daily log records found.");
      });
  };

  // -------------------------------
  // Render component
  // -------------------------------
  return (
    <>
      <div className={styles.inline_display}>
        <Left_panel />

        {/* Alert Popup */}
        {alertData.show && (
          <AlertPopup
            show={alertData.show}
            type={alertData.type}
            message={alertData.message}
            onClose={() => setAlertData({ show: false, type: "", message: "" })}
          />
        )}

        <div className={styles2.Dashboard_mid_section}>
          <Top_panel title={"Logging"} />

          <form onSubmit={handleSubmit} className={styles2.Dashboard_main_body}>
            <div className={styles2.select_elements}>
              <Select
                label="Select Child"
                placeholder="Select"
                onChange={handleSelectChild}
                name="Child_ID"
                value={formData.Child_ID}
                select_list={child.map((c) => ({
                  value: c.Child_ID,
                  label: c.Child_name,
                }))}
              />

              <Textbox
                label={"Art"}
                placeholder={"Enter art"}
                name="art"
                onChange={handleChange}
                value={formData.art}
                style={{ width: "500px" }}
              />

              <Textbox
                label={"Nap"}
                placeholder={"Enter nap"}
                name="nap"
                onChange={handleChange}
                value={formData.nap}
                style={{ width: "490px" }}
              />

              <Textbox
                label={"Snack"}
                placeholder={"Enter snack"}
                name="snack"
                onChange={handleChange}
                value={formData.snack}
                style={{ width: "480px" }}
              />

              <Textbox
                label={"Learning"}
                placeholder={"Enter learning"}
                name="learning"
                onChange={handleChange}
                value={formData.learning}
                style={{ width: "465px" }}
              />

              <Textbox
                label={"Day Mood"}
                placeholder={"Enter mood"}
                name="day_mood"
                onChange={handleChange}
                value={formData.day_mood}
                style={{ width: "450px" }}
              />

              <Textbox
                label={"Final Note"}
                placeholder={"Enter note"}
                name="final_note"
                onChange={handleChange}
                value={formData.final_note}
                style={{ width: "450px" }}
              />

              <Update_request title="Update" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

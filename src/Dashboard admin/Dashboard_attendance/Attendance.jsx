//cleaned and commented

import styles from "../Dashboard.module.css";
import styles2 from "./Attendance.module.css";
import Right_panel from "../Right_panel";
import Left_panel from "../Left_panel";
import Top_panel from "../Top_panel";
import { Link } from "react-router-dom";
import Button from "../../Buttons/Button";
import Select from "../../Textbox/Select";
import Textarea from "../textarea";
import Update_request from "../Update_request";
import Button_manage from "../Button_manage";
import Child_card from "../Child_card";
import { useState, useEffect } from "react";
import axios from "axios";
import Textbox from "../../Textbox/Textbox";
import AlertPopup from "../../Alert";

export default function Daily_Log() {
  // -------------------------------
  // State variables
  // -------------------------------
  const [child, setChild] = useState([]); // Stores list of children
  const [userItems, setUser] = useState({}); // Stores logged-in user's details
  const [num, setNum] = useState(0); // For internal state tracking
  const [formData, setFormData] = useState({}); // Form data for attendance

  const [alertData, setAlertData] = useState({
    show: false,
    type: "",
    message: "",
  }); // Alert popup state

  // -------------------------------
  // Function to show alert popup
  // -------------------------------
  const showAlert = (type, message) => {
    // Reset first to force re-render even if same message/type
    setAlertData({ show: false, type: "", message: "" });
    setTimeout(() => {
      setAlertData({ show: true, type, message });
    }, 50);
  };

  // -------------------------------
  // Load user data from session storage
  // -------------------------------
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("useradmin"));
    setUser((u) => ({ ...u, ...user }));
    setNum(1);
  }, []);

  // -------------------------------
  // Fetch all children for this school
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
        showAlert("warning", "No children found for this school.");
      });
  }, [userItems]);

  // -------------------------------
  // Handle input field changes
  // -------------------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -------------------------------
  // Handle form submission (create/update attendance)
  // -------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost/api/add_attendance.php", {
        ...formData,
        school_name: userItems.school_name,
      })
      .then((response2) => {
        if (response2.data.status) {
          // Clear form on success
          setFormData({ present: "", absent: "" });
          showAlert("success", "Attendance recorded successfully");
        } else {
          // Show backend error message
          showAlert("danger", response2.data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "View console to understand more.");
      });
  };

  // -------------------------------
  // Handle selection of a specific child
  // -------------------------------
  const handleSelectChild = (e) => {
    const childID = e.target.value;
    setFormData((f) => ({ ...f, Child_ID: childID }));

    // Fetch that child's existing attendance
    axios
      .post("http://localhost/api/get_attendance.php", {
        child_id: childID,
        school_name: userItems.school_name,
      })
      .then((response) => {
        const child = response.data.data[0];
        setFormData({
          Child_ID: child.child_id,
          absent: child.absent,
          present: child.present,
        });
        showAlert("success", "Attendance record found!");
      })
      .catch((err) => {
        console.error("Error:", err);
        setFormData({
          Child_ID: childID,
        });
        showAlert("warning", "No attendance record found for this child.");
      });
  };

  // -------------------------------
  // JSX (UI layout)
  // -------------------------------
  return (
    <>
      <div className={styles.inline_display}>
        <Left_panel />

        {/* Alert popup for feedback messages */}
        {alertData.show && (
          <AlertPopup
            show={alertData.show}
            type={alertData.type}
            message={alertData.message}
            onClose={() => setAlertData({ show: false, type: "", message: "" })}
          />
        )}

        <div className={styles2.Dashboard_mid_section}>
          <Top_panel title={"Attendance"} />

          {/* Attendance form */}
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
                label="Days Absent"
                type="number"
                placeholder="Enter Number"
                name="absent"
                onChange={handleChange}
                value={formData.absent}
              />

              <Textbox
                label="Days Present"
                type="number"
                placeholder="Enter Number"
                name="present"
                onChange={handleChange}
                value={formData.present}
              />
            </div>

            <Update_request title="Update" type="submit" />
          </form>
        </div>
      </div>
    </>
  );
}

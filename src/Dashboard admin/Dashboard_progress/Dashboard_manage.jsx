//Cleaned and commented

import styles from "../Dashboard.module.css";
import styles2 from "./Manage.module.css";
import Right_panel from "../Right_panel";
import Left_panel from "../Left_panel";
import Top_panel from "../Top_panel";
import { Link } from "react-router-dom";
import Button from "../../Buttons/Button";
import Select2 from "../../Textbox/Select2";
import Textarea from "../textarea";
import Update_request from "../Update_request";
import { useState, useEffect } from "react";
import axios from "axios";
import AlertPopup from "../../Alert";

export default function Dasboard_progress() {
  // -------------------------------
  // State Variables
  // -------------------------------
  const [child, setChild] = useState([]); // Child list
  const [userItems, setUser] = useState({}); // Logged-in user data
  const [formData, setFormData] = useState({}); // Form fields
  const [alertData, setAlertData] = useState({
    show: false,
    type: "",
    message: "",
  });

  // -------------------------------
  // Function to show alert popup
  // -------------------------------
  const showAlert = (type, message) => {
    setAlertData({ show: false, type: "", message: "" }); // Reset before showing
    setTimeout(() => setAlertData({ show: true, type, message }), 50);
  };

  // -------------------------------
  // Load user info from session storage
  // -------------------------------
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("useradmin"));
    if (user) {
      setUser((prev) => ({ ...prev, ...user }));
      setFormData((prev) => ({ ...prev, ["school_name"]: user.school_name }));
    }
  }, []);

  // -------------------------------
  // Fetch children from backend
  // -------------------------------
  useEffect(() => {
    if (!userItems.school_name) return;

    axios
      .post("http://localhost/api/edit_child.php", {
        school_name: userItems.school_name,
      })
      .then((response) => {
        if (response.data.status) {
          setChild(response.data.data);
        } else {
          showAlert("danger", response.data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "Something went wrong while loading children.");
      });
  }, [userItems]);

  // -------------------------------
  // Handle input field change
  // -------------------------------
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // -------------------------------
  // Submit progress update form
  // -------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost/api/child_progress.php", formData)
      .then((response) => {
        if (response.data.status) {
          // Reset form after successful update
          setFormData({
            Child_ID: "",
            area_dev: "",
            current_level: "",
            recent_ach: "",
            next_steps: "",
            school_name: userItems.school_name,
          });
          showAlert("success", "Progress record updated!");
        } else {
          showAlert("danger", response.data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "Something went wrong while saving progress.");
      });
  };

  // -------------------------------
  // Handle area development selection
  // -------------------------------
  const handleSelectChild = (e) => {
    const area__dev = e.target.value;
    setFormData((prev) => ({
      ...prev,
      area_dev: area__dev,
    }));

    // Fetch existing progress for selected area
    axios
      .post("http://localhost/api/get_progress.php", {
        Child_ID: formData.Child_ID,
        area_dev: area__dev,
        school_name: userItems.school_name,
      })
      .then((response) => {
        if (response.data.status) {
          const data = response.data.data[0];
          setFormData({
            area_dev: area__dev,
            Child_ID: data.Child_ID,
            current_level: data.current_level,
            recent_ach: data.recent_ach,
            next_steps: data.next_steps,
            school_name: userItems.school_name,
          });
          showAlert("success", "Child data loaded.");
        } else {
          setFormData((c) => ({
            Child_ID: c.Child_ID,
            area_dev: area__dev,
            school_name: userItems.school_name,
          }));
          showAlert("danger", response.data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "Could not fetch progress data.");
      });
  };

  // -------------------------------
  // Area development dropdown options
  // -------------------------------
  const area_dev = [
    { value: "Child Behaviour", label: "Child Behaviour" },
    { value: "Child Progress", label: "Child Progress" },
    { value: "Child Health", label: "Child Health" },
  ];

  // -------------------------------
  // Render UI
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
          <Top_panel title="Children Management" />

          <form onSubmit={handleSubmit} className={styles2.Dashboard_main_body}>
            <div className={styles2.move_btn_right}>
              <Link to="/Dashboard admin/Dashboard_progress/Dashboard_add_child">
                <Button nameBtn="Manage Child Profile" />
              </Link>
            </div>

            {/* Select child and area */}
            <div className={styles2.select_elements}>
              <Select2
                label="Select Child"
                placeholder="Select"
                onChange={handleChange}
                name="Child_ID"
                value={formData.Child_ID}
                select_list={child.map((c) => ({
                  value: c.Child_ID,
                  label: c.Child_name,
                }))}
              />

              <Select2
                label="Select Area Development"
                placeholder="Select Area"
                name="area_dev"
                value={formData.area_dev}
                select_list={area_dev.map((c) => ({
                  value: c.value,
                  label: c.label,
                }))}
                onChange={handleSelectChild}
              />
            </div>

            {/* Textareas */}
            <Textarea
              title="How your child is doing"
              placeholder="Enter Level"
              name="current_level"
              onChange={handleChange}
              value={formData.current_level}
            />

            <Textarea
              title="What they recently did well"
              placeholder="Enter Level"
              name="recent_ach"
              onChange={handleChange}
              value={formData.recent_ach}
            />

            <Textarea
              title="What We’re Focusing on Next"
              placeholder="Enter Level"
              name="next_steps"
              onChange={handleChange}
              value={formData.next_steps}
            />

            {/* Submit button */}
            <Update_request title="Update" type="submit" />
          </form>
        </div>
      </div>
    </>
  );
}

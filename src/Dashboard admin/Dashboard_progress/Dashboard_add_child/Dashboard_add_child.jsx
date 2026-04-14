//cleaned and commented

import styles from "../../Dashboard.module.css";
import styles2 from "./Add_child.module.css";
import Right_panel from "../../Right_panel";
import Left_panel from "../../Left_panel";
import Top_panel from "../../Top_panel";
import Child_card from "../../Child_card";
import Button_manage from "../../Button_manage";
import { Link } from "react-router-dom";
import Textbox2 from "../../../Textbox/Textbox2";
import Select2 from "../../../Textbox/Select2";
import Update_request from "../../Update_request";
import { useState, useEffect } from "react";
import axios from "axios";
import AlertPopup from "../../../Alert";

export default function Dashboard_add_child() {
  const [formData, setFormData] = useState({}); // Form input state
  const [userItems, setUser] = useState({}); // Logged-in user info
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

  // Load logged-in user from session on component mount
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("useradmin"));
    if (user) setUser((u) => ({ ...u, ...user }));
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    if (!userItems.school_name) {
      showAlert("danger", "User school not found.");
      return;
    }

    // Combine formData with school_name
    const dataToSend = {
      ...formData,
      school_name: userItems.school_name,
    };

    axios
      .post("http://localhost/api/add_child.php", dataToSend)
      .then((response) => {
        if (response.data.status) {
          // Reset form after success
          setFormData({
            Child_name: "",
            DOB: "",
            Gender: "",
          });
          showAlert("success", "Child added successfully!");
        } else {
          showAlert("danger", response.data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "View console to understand more.");
      });
  }

  return (
    <div className={styles.inline_display}>
      <Left_panel />

      <div className={styles2.Dashboard_mid_section}>
        <Top_panel passage={`Add Child`} />

        {/* Alert Popup */}
        {alertData.show && (
          <AlertPopup
            show={alertData.show}
            type={alertData.type}
            message={alertData.message}
            onClose={() => setAlertData({ show: false, type: "", message: "" })}
          />
        )}

        <div className={styles2.Dashboard_main_body}>
          {/* Navigation buttons */}
          <div className={styles2.button_container}>
            <Link
              to={"/Dashboard admin/Dashboard_progress/Dashboard_Add_child"}
            >
              <Button_manage title="Add" />
            </Link>

            <Link
              to={"/Dashboard admin/Dashboard_progress/Dashboard_edit_child"}
            >
              <Button_manage title="Edit" />
            </Link>

            <Link
              to={"/Dashboard admin/Dashboard_progress/Dashboard_delete_child"}
            >
              <Button_manage title="Delete" />
            </Link>
          </div>

          {/* Add Child Form */}
          <div className={styles2.child_card_container}>
            <form
              className={styles.Child_card_container}
              onSubmit={handleSubmit}
            >
              <Textbox2
                label="Child's Name"
                placeholder="Enter Name ..."
                name="Child_name"
                value={formData.Child_name || ""}
                onChange={handleChange}
              />
              <Textbox2
                label="Child's DOB"
                type="date"
                name="DOB"
                value={formData.DOB || ""}
                onChange={handleChange}
              />
              <Select2
                label="Child's Gender"
                placeholder="Select"
                value={formData.Gender || ""}
                select_list={[
                  { value: "Male", label: "Male" },
                  { value: "Female", label: "Female" },
                ]}
                name="Gender"
                onChange={handleChange}
              />
              <Update_request
                title="Add Child"
                margin_bottom="8px"
                margin_top="8px"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

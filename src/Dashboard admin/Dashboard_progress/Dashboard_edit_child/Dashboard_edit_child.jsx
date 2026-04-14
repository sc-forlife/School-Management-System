//cleaned and comments

import styles from "../../Dashboard.module.css";
import styles2 from "./Edit_child.module.css";
import Left_panel from "../../Left_panel";
import Top_panel from "../../Top_panel";
import Button_manage from "../../Button_manage";
import { Link } from "react-router-dom";
import Select from "../../../Textbox/Select2";
import Button from "../../../Buttons/Button";
import Textbox from "../../../Textbox/Textbox2";
import Update_request from "../../Update_request";
import { useState, useEffect } from "react";
import axios from "axios";
import AlertPopup from "../../../Alert";

export default function Dashboard_edit_child() {
  // State for child form data
  const [formData, setFormData] = useState({
    Child_ID: "",
    Child_name: "",
    DOB: "",
    Gender: "",
  });

  // State for list of children
  const [childList, setChildList] = useState([]);

  // Logged-in user details
  const [userItems, setUser] = useState({});

  // State for alert popup
  const [alertData, setAlertData] = useState({
    show: false,
    type: "",
    message: "",
  });

  // Function to show alert messages
  const showAlert = (type, message) => {
    setAlertData({ show: false, type: "", message: "" });
    setTimeout(() => {
      setAlertData({ show: true, type, message });
    }, 50);
  };

  // Load user info from session storage
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("useradmin"));
    setUser(user || {});
  }, []);

  // Fetch children for the user's school
  useEffect(() => {
    if (!userItems.school_name) return;
    axios
      .post("http://localhost/api/edit_child.php", {
        school_name: userItems.school_name,
      })
      .then((response) => {
        if (response.data.status) {
          setChildList(response.data.data);
        } else {
          showAlert("danger", response.data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "View Console to understand more.");
      });
  }, [userItems]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  // Handle child selection and load details
  const handleSelectChild = (e) => {
    const childID = e.target.value;
    setFormData((f) => ({ ...f, Child_ID: childID }));

    axios
      .post("http://localhost/api/get_edit_change.php", { Child_ID: childID })
      .then((response) => {
        if (response.data.status) {
          const child = response.data.data;
          setFormData({
            Child_ID: child.Child_ID,
            Child_name: child.Child_name,
            DOB: child.dob,
            Gender: child.gender,
          });
          showAlert("success", "Child data found");
        } else {
          showAlert("danger", response.data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "View Console to understand more.");
      });
  };

  // Handle form submission to update child info
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost/api/update_child.php", formData)
      .then((response) => {
        if (response.data.status) {
          showAlert("success", "Child data updated successfully");
          setTimeout(() => window.location.reload(), 1500);
        } else {
          showAlert("danger", response.data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "View Console to understand more.");
      });
  };

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
          <Top_panel passage="Edit Child" />

          <div className={styles2.Dashboard_main_body}>
            {/* Navigation buttons */}
            <div className={styles2.button_container}>
              <Link to="/Dashboard admin/Dashboard_progress/Dashboard_Add_child">
                <Button_manage title="Add" />
              </Link>
              <Link to="/Dashboard admin/Dashboard_progress/Dashboard_edit_child">
                <Button_manage title="Edit" />
              </Link>
              <Link to="/Dashboard admin/Dashboard_progress/Dashboard_delete_child">
                <Button_manage title="Delete" />
              </Link>
            </div>

            {/* Dropdown to select child */}
            <div className={styles2.edit_container}>
              <Select
                label="Select Child"
                placeholder="Select"
                onChange={handleSelectChild}
                name="Child_ID"
                value={formData.Child_ID}
                select_list={childList.map((c) => ({
                  value: c.Child_ID,
                  label: c.Child_name,
                }))}
              />
            </div>

            {/* Form for editing child info */}
            {formData.Child_ID && (
              <div className={styles2.child_card_container}>
                <form
                  className={styles.Child_card_container}
                  onSubmit={handleSubmit}
                >
                  <Textbox
                    label="Child's Name"
                    placeholder="Enter Name..."
                    name="Child_name"
                    value={formData.Child_name}
                    onChange={handleChange}
                  />

                  <Textbox
                    label="Child's DOB"
                    type="date"
                    name="DOB"
                    value={formData.DOB}
                    onChange={handleChange}
                  />

                  <Select
                    label="Child's Gender"
                    name="Gender"
                    value={formData.Gender}
                    onChange={handleChange}
                    select_list={[
                      { value: "Male", label: "Male" },
                      { value: "Female", label: "Female" },
                    ]}
                  />

                  <Update_request
                    title="Update Child"
                    margin_bottom="8px"
                    margin_top="8px"
                  />
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

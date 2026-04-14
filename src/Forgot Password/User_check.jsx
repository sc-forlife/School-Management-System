// ================================
// Forgot Password Component
// Handles user verification using username, email, school, and reset code
// Includes alerts for success/error messages
// ================================

import styles from "./User_check.module.css";
import Nav from "../NavBar/Navbar";
import Textbox from "../Textbox/Textbox";
import Select from "../Textbox/Select";
import Button from "../Buttons/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AlertPopup from "../Alert";

export default function ForgotPass() {
  const navigate = useNavigate();

  // ------------------------------
  // State variables
  // ------------------------------
  const [schools, setSchools] = useState([]); // List of schools from backend
  const [formData, setFormData] = useState({}); // Stores form input values
  const [alertData, setAlertData] = useState({
    show: false,
    type: "",
    message: "",
  }); // Controls alert popup

  // ------------------------------
  // Function: Show alert
  // ------------------------------
  const showAlert = (type, message) => {
    // Reset first to force re-render even if same type/message
    setAlertData({ show: false, type: "", message: "" });
    setTimeout(() => {
      setAlertData({ show: true, type, message });
    }, 50);
  };

  // ------------------------------
  // Fetch schools from backend
  // ------------------------------
  useEffect(() => {
    axios
      .get("http://localhost/api/insert_parent.php")
      .then((response) => {
        if (response.data.status) {
          setSchools(response.data.schools); // Store schools in state
        } else {
          showAlert("danger", response.data.message); // Show error if fetch fails
        }
      })
      .catch((err) => {
        console.error("Error fetching schools:", err);
        showAlert("danger", "Failed to load schools");
      });
  }, []);

  // ------------------------------
  // Handle field changes
  // ------------------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ------------------------------
  // Handle form submission
  // ------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost/api/User_check.php", formData)
      .then((response) => {
        if (response.data.status) {
          // ✅ Reset form
          setFormData({
            username: "",
            EmailAddress: "",
            school_name: "",
            InviteCode: "",
          });

          // Store info in sessionStorage for next page
          sessionStorage.clear();
          sessionStorage.setItem("ID", response.data.user_id);
          sessionStorage.setItem("user_email", response.data.user_email);

          // Show success alert
          showAlert("success", "User Check Approved");

          // Navigate to Change Password page after short delay
          setTimeout(() => {
            navigate("/Forgot Password/Change_Pass");
          }, 1500);
        } else {
          // Show error alert
          showAlert("danger", response.data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "Server error. Please try again.");
      });
  };

  // ------------------------------
  // JSX Render
  // ------------------------------
  return (
    <div className={styles.parent_reg_body}>
      <Nav />

      {/* Alert popup */}
      <AlertPopup
        show={alertData.show}
        type={alertData.type}
        message={alertData.message}
        onClose={() => setAlertData({ show: false, type: "", message: "" })}
      />

      {/* Form container */}
      <div className={styles.parent_container_registration}>
        <h2>Forgot Password</h2>
        <form
          className={styles.Parent_inner_container_registration}
          onSubmit={handleSubmit}
        >
          {/* Username input */}
          <Textbox
            label="Username"
            placeholder="Enter username..."
            name="username"
            style={{ width: "300px" }}
            value={formData.username || ""}
            onChange={handleChange}
          />

          {/* Email input */}
          <Textbox
            label="Email Address"
            placeholder="Enter email..."
            name="EmailAddress"
            style={{ width: "300px" }}
            value={formData.EmailAddress || ""}
            onChange={handleChange}
          />

          {/* Reset code input */}
          <Textbox
            label="Reset Code"
            placeholder="Enter reset code..."
            name="InviteCode"
            style={{ width: "300px" }}
            value={formData.InviteCode || ""}
            onChange={handleChange}
          />

          {/* School select */}
          <Select
            label="Select School"
            placeholder="Choose school..."
            name="school_name"
            style={{ width: "300px" }}
            value={formData.school_name || ""}
            onChange={handleChange}
            select_list={schools.map((s) => ({
              value: s.school_name,
              label: s.school_name,
            }))}
          />

          {/* Submit button */}
          <div className={styles.center_button}>
            <Button nameBtn="Submit" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

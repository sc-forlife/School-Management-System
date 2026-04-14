//cleaned and commented

import styles from "./Registration.module.css";
import Nav from "../NavBar/Navbar";
import Textbox from "../Textbox/Textbox";
import Button from "../Buttons/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AlertPopup from "../Alert";

export default function School_reg() {
  const navigate = useNavigate();

  // Alert popup state
  const [alertData, setAlertData] = useState({
    show: false,
    type: "",
    message: "",
  });

  // Form data state
  const [formData, setFormData] = useState({
    school_name: "",
    username: "",
    principal_name: "",
    email_address: "",
    school_address: "",
    phone_number: "",
    password: "",
    confirm_password: "",
    school_registration_number: "",
  });

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
  // Handle input changes
  // -------------------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -------------------------------
  // Handle form submission
  // -------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check password confirmation
    if (formData.password !== formData.confirm_password) {
      showAlert("danger", "Passwords do not match!");
      return;
    }

    // Send data to backend
    axios
      .post("http://localhost/api/insert_school.php", formData)
      .then((response) => {
        if (response.data.status) {
          // Reset form after successful registration
          setFormData({
            school_name: "",
            username: "",
            principal_name: "",
            email_address: "",
            school_address: "",
            phone_number: "",
            password: "",
            confirm_password: "",
            school_registration_number: "",
          });

          // Store school info in sessionStorage for next page
          sessionStorage.clear();
          const school_id = response.data.school[0].id;
          const school_name = response.data.school[0].school_name;
          sessionStorage.setItem("school_id", school_id);
          sessionStorage.setItem("school_name", school_name);

          showAlert("success", "Registration successful");

          // Redirect to next page after short delay
          setTimeout(() => navigate("/Registration/Profile_admin"), 2000);
        } else {
          // Show backend error message
          showAlert("danger", response.data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "View console to understand more.");
      });
  };

  // -------------------------------
  // Render Registration Form
  // -------------------------------
  return (
    <div className={styles.parent_reg_body}>
      <Nav />

      {/* Alert Popup */}
      {alertData.show && (
        <AlertPopup
          show={alertData.show}
          type={alertData.type}
          message={alertData.message}
          onClose={() => setAlertData({ show: false, type: "", message: "" })}
        />
      )}

      <div className={styles.parent_container_registration}>
        <h2>School Registration</h2>

        <form
          onSubmit={handleSubmit}
          className={styles.Parent_inner_container_registration}
        >
          {/* School Details */}
          <Textbox
            label="School Name"
            placeholder="Enter School Name..."
            name="school_name"
            value={formData.school_name}
            style={{ width: "350px" }}
            onChange={handleChange}
          />
          <Textbox
            label="Username"
            placeholder="Enter Username..."
            name="username"
            style={{ width: "350px" }}
            value={formData.username}
            onChange={handleChange}
          />
          <Textbox
            label="Admin/Principal Full Name"
            placeholder="Enter Full Name..."
            name="principal_name"
            style={{ width: "350px" }}
            value={formData.principal_name}
            onChange={handleChange}
          />
          <Textbox
            label="Email Address"
            placeholder="Enter Email..."
            name="email_address"
            style={{ width: "350px" }}
            value={formData.email_address}
            onChange={handleChange}
          />
          <Textbox
            label="School Address"
            placeholder="Enter Address..."
            name="school_address"
            style={{ width: "350px" }}
            value={formData.school_address}
            onChange={handleChange}
          />
          <Textbox
            label="Phone Number"
            placeholder="Enter Phone..."
            name="phone_number"
            style={{ width: "350px" }}
            value={formData.phone_number}
            onChange={handleChange}
          />

          {/* Password Fields */}
          <Textbox
            type="password"
            label="New Password"
            placeholder="Enter Password..."
            name="password"
            style={{ width: "350px" }}
            value={formData.password}
            onChange={handleChange}
          />
          <Textbox
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password..."
            name="confirm_password"
            style={{ width: "350px" }}
            value={formData.confirm_password}
            onChange={handleChange}
          />

          {/* Registration Number */}
          <Textbox
            label="School Registration Number"
            placeholder="Enter Registration Number..."
            name="school_registration_number"
            style={{ width: "350px" }}
            value={formData.school_registration_number}
            onChange={handleChange}
          />

          {/* Submit Button */}
          <div className={styles.center_button}>
            <Button nameBtn="Create" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

//cleaned and commented

import styles from "../Registration.module.css";
import Nav from "../../NavBar/Navbar";
import Textbox from "../../Textbox/Textbox";
import Select from "../../Textbox/Select";
import Button from "../../Buttons/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AlertPopup from "../../Alert";

export default function Parent_reg() {
  const navigate = useNavigate();

  // Gender options for dropdown
  const [gender, setGender] = useState([
    { value: "Female", label: "Female" },
    { value: "Male", label: "Male" },
  ]);

  // School list and form data
  const [schools, setSchools] = useState([]);
  const [formData, setFormData] = useState({});

  // Alert popup state
  const [alertData, setAlertData] = useState({
    show: false,
    type: "",
    message: "",
  });

  // Function to show alerts dynamically
  const showAlert = (type, message) => {
    setAlertData({ show: false, type: "", message: "" });
    setTimeout(() => {
      setAlertData({ show: true, type, message });
    }, 50);
  };

  // Fetch available schools from backend on component mount
  useEffect(() => {
    axios
      .get("http://localhost/api/insert_parent.php")
      .then((response) => {
        if (response.data.status) {
          setSchools(response.data.schools);
        } else {
          showAlert("danger", response.data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "View Console to understand more.");
      });
  }, []);

  // Handle input changes in form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle registration form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password confirmation
    if (formData.Password !== formData.ConfirmPassword) {
      showAlert("danger", "Passwords do not match!");
      return;
    }

    // Send registration data to backend
    axios
      .post("http://localhost/api/insert_parent.php", formData)
      .then((response) => {
        if (response.data.status) {
          // Reset form fields after successful registration
          setFormData({
            FullName: "",
            username: "",
            EmailAddress: "",
            CellPhone: "",
            Password: "",
            ConfirmPassword: "",
            school_name: "",
            InviteCode: "",
            gender: "",
          });

          // Store parent info in sessionStorage for next page
          sessionStorage.clear();
          const parentID = response.data.parent[0].ParentID;
          const school_name = response.data.parent[0].school_name;
          sessionStorage.setItem("Parent_ID", parentID);
          sessionStorage.setItem("school_name", school_name);

          // Show success alert and redirect
          showAlert("success", "Registration successful");
          setTimeout(() => navigate("/Registration/Parent/Profile"), 2000);
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
    <div className={styles.parent_reg_body}>
      <Nav />

      {/* Alert popup display */}
      {alertData.show && (
        <AlertPopup
          show={alertData.show}
          type={alertData.type}
          message={alertData.message}
          onClose={() => setAlertData({ show: false, type: "", message: "" })}
        />
      )}

      {/* Registration form container */}
      <div className={styles.parent_container_registration}>
        <h2>Parent Registration</h2>

        <form
          className={styles.Parent_inner_container_registration}
          onSubmit={handleSubmit}
        >
          {/* Input fields */}
          <Textbox
            label="Full Name"
            placeholder="Enter full name..."
            name="FullName"
            style={{ width: "350px" }}
            value={formData.FullName}
            onChange={handleChange}
          />

          <Textbox
            label="Username"
            placeholder="Enter username..."
            name="username"
            style={{ width: "350px" }}
            value={formData.username}
            onChange={handleChange}
          />

          <Select
            label="Select Gender"
            placeholder="Select Gender"
            name="gender"
            style={{ width: "350px" }}
            value={formData.gender}
            select_list={gender}
            onChange={handleChange}
          />

          <Textbox
            label="Email Address"
            placeholder="Enter email..."
            name="EmailAddress"
            style={{ width: "350px" }}
            value={formData.EmailAddress}
            onChange={handleChange}
          />

          <Textbox
            label="Cell Phone"
            placeholder="Enter phone number..."
            name="CellPhone"
            style={{ width: "350px" }}
            value={formData.CellPhone}
            onChange={handleChange}
          />

          <Textbox
            label="Password"
            placeholder="Enter password..."
            name="Password"
            type="password"
            style={{ width: "350px" }}
            value={formData.Password}
            onChange={handleChange}
          />

          <Textbox
            label="Confirm Password"
            placeholder="Confirm password..."
            name="ConfirmPassword"
            type="password"
            style={{ width: "350px" }}
            value={formData.ConfirmPassword}
            onChange={handleChange}
          />

          <Select
            label="Select School"
            placeholder="Choose school..."
            name="school_name"
            style={{ width: "350px" }}
            value={formData.school_name}
            onChange={handleChange}
            select_list={schools.map((s) => ({
              value: s.school_name,
              label: s.school_name,
            }))}
          />

          <Textbox
            label="Invite Code"
            placeholder="Enter invite code..."
            name="InviteCode"
            style={{ width: "350px" }}
            value={formData.InviteCode}
            onChange={handleChange}
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

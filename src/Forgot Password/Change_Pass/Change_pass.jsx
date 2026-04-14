import styles from "../User_check.module.css";
import Nav from "../../NavBar/Navbar";
import Textbox from "../../Textbox/Textbox";
import Button from "../../Buttons/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AlertPopup from "../../Alert";

export default function Change_password() {
  const navigate = useNavigate();

  // -------------------------------
  // State variables
  // -------------------------------
  const [user, setUser] = useState(""); // User ID from sessionStorage
  const [email, setEmail] = useState(""); // Email from sessionStorage
  const [formData, setFormData] = useState({}); // Form input data
  const [alertData, setAlertData] = useState({
    show: false,
    type: "",
    message: "",
  }); // Alert popup data

  // -------------------------------
  // Show alert popup
  // -------------------------------
  const showAlert = (type, message) => {
    // Reset first to force re-render even if same message
    setAlertData({ show: false, type: "", message: "" });
    setTimeout(() => {
      setAlertData({ show: true, type, message });
    }, 50);
  };

  // -------------------------------
  // On component mount, get user info from sessionStorage
  // -------------------------------
  useEffect(() => {
    const storedUser = sessionStorage.getItem("ID");
    const storedEmail = sessionStorage.getItem("user_email");
    setUser(storedUser);
    setEmail(storedEmail);
  }, []);

  // -------------------------------
  // Handle form field changes
  // -------------------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -------------------------------
  // Handle form submission
  // -------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirm_password) {
      showAlert("danger", "Passwords do not match!");
      return;
    }

    // Send POST request to change password
    axios
      .post("http://localhost/api/Change_password.php", {
        ...formData,
        ID: user,
        email: email,
      })
      .then((response) => {
        if (response.data.status) {
          // Clear form and session
          setFormData({ confirm_password: "" });
          sessionStorage.clear();

          // Show success alert and navigate to login after delay
          showAlert("success", "Password Changed!");
          setTimeout(() => navigate("/Login"), 1500);
        } else {
          // Show error from backend
          showAlert("danger", response.data.message);
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  // -------------------------------
  // Render component
  // -------------------------------
  return (
    <div className={styles.parent_reg_body}>
      <Nav />

      {/* Alert Popup */}
      <AlertPopup
        show={alertData.show}
        type={alertData.type}
        message={alertData.message}
        onClose={() => setAlertData({ show: false, type: "", message: "" })}
      />

      <div className={styles.parent_container_registration}>
        <h2>Change Password</h2>

        {/* Change Password Form */}
        <form
          className={styles.Parent_inner_container_registration}
          onSubmit={handleSubmit}
        >
          <Textbox
            type="password"
            label="New Password"
            placeholder="Enter Password..."
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <Textbox
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password..."
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
          />

          <div className={styles.center_button}>
            <Button nameBtn="Change Password" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

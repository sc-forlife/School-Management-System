//cleaned and comments

import styles from "../Dashboard.module.css";
import styles2 from "./Settings.module.css";
import Right_panel from "../Right_panel";
import Left_panel from "../Left_panel";
import Top_panel from "../Top_panel";
import Textbox from "../../Textbox/Textbox";
import Button from "../../Buttons/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import User from "../../assets/User.png";
import AlertPopup from "../../Alert";
import ConfirmAlert from "../../Alert_confirm";

export default function Dashboard_main() {
  const navigate = useNavigate();

  // State for confirmation popup
  const [showConfirm, setShowConfirm] = useState(false);

  // Main form data
  const [formData, setFormData] = useState({
    id: "",
    school_name: "",
    principal_name: "",
    email_address: "",
    school_address: "",
    phone_number: "",
    password: "",
    school_registration_number: "",
    profile_pic_file: null,
  });

  // Store user data
  const [user, setUser] = useState({});
  const [preview, setPreview] = useState(User);

  // Alert popup state
  const [alertData, setAlertData] = useState({
    show: false,
    type: "",
    message: "",
  });

  // Function to show alert message
  const showAlert = (type, message) => {
    setAlertData({ show: false, type: "", message: "" });
    setTimeout(() => setAlertData({ show: true, type, message }), 50);
  };

  // Fetch admin data on page load
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("useradmin"));
    if (!storedUser) return;

    setUser(storedUser);

    axios
      .post("http://localhost/api/get_admin.php", { id: storedUser.id })
      .then((res) => {
        if (res.data.status) {
          setFormData((prev) => ({ ...prev, ...res.data.data }));
          if (res.data.data.profile_pic) {
            setPreview(
              `http://localhost/api/uploads/admin/${res.data.data.profile_pic}`
            );
          }
          showAlert("success", "Settings admin data found!");
        } else {
          showAlert("danger", res.data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "View console to understand more.");
      });
  }, []);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, profile_pic_file: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(User);
    }
  };

  // Handle save button click
  const handleSave = (e) => {
    e.preventDefault();
    const formPayload = new FormData();

    // Append form data
    for (const key in formData) {
      if (formData[key] !== undefined && formData[key] !== null) {
        formPayload.append(key, formData[key]);
      }
    }

    axios
      .post("http://localhost/api/update_admin.php", formPayload, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        showAlert(
          res.data.status ? "success" : "danger",
          res.data.status
            ? "Settings saved successfully. Image change will take effect after re-login."
            : res.data.message
        );
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "View console to understand more.");
      });
  };

  // Handle account deletion
  const handleDelete = () => {
    axios
      .post("http://localhost/api/delete_school.php", { school_id: user.id })
      .then((res) => {
        if (res.data.status) {
          showAlert("success", "Account successfully deleted");
          setTimeout(() => navigate("/"), 1500);
        } else {
          showAlert("danger", res.data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "View console to understand more.");
      });
  };

  return (
    <div className={styles.inline_display}>
      <Left_panel />

      {/* Alert popup display */}
      {alertData.show && (
        <AlertPopup
          show={alertData.show}
          type={alertData.type}
          message={alertData.message}
          onClose={() => setAlertData({ show: false, type: "", message: "" })}
        />
      )}

      {/* Confirmation popup for delete */}
      <ConfirmAlert
        show={showConfirm}
        message="Are you sure you want to delete this account?"
        onConfirm={() => {
          handleDelete();
          setShowConfirm(false);
        }}
        onCancel={() => setShowConfirm(false)}
      />

      <div className={styles2.Dashboard_mid_section}>
        <Top_panel title={`Settings`} passage="Settings Admin" />

        <div className={styles2.Dashboard_main_body}>
          {/* Settings form */}
          <form
            onSubmit={handleSave}
            className={styles2.Parent_inner_container_registration}
          >
            <Textbox
              label="Admin/Principal Full Name"
              name="principal_name"
              style={{ width: "350px" }}
              value={formData.principal_name}
              onChange={handleChange}
            />
            <Textbox
              label="Email Address"
              name="email_address"
              style={{ width: "350px" }}
              value={formData.email_address}
              onChange={handleChange}
            />
            <Textbox
              label="School Address"
              name="school_address"
              style={{ width: "350px" }}
              value={formData.school_address}
              onChange={handleChange}
            />
            <Textbox
              label="Phone Number"
              name="phone_number"
              style={{ width: "350px" }}
              value={formData.phone_number}
              onChange={handleChange}
            />
            <Textbox
              label="New Password"
              name="password"
              type="password"
              style={{ width: "350px" }}
              value={formData.password}
              onChange={handleChange}
            />

            {/* Profile picture upload */}
            <div className={styles.profile_pic}>
              <img src={preview} alt="User Image" className={styles.User} />
              <input
                type="file"
                name="profile_pic_file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            {/* Save button */}
            <div className={styles2.save_btn}>
              <Button nameBtn="Save" type="submit" />
            </div>
          </form>

          {/* Delete account button */}
          <div className={styles2.delete_btn}>
            <Button
              nameBtn="Delete School Account"
              onClick={() => setShowConfirm(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

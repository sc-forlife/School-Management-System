//cleaned and commented

import styles from "../Dashboard.module.css";
import styles2 from "./Settings.module.css";
import Right_panel from "../Right_panel";
import Left_panel from "../Left_panel";
import Top_panel from "../Top_panel";
import Textbox from "../../Textbox/Textbox";
import Button from "../../Buttons/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import User from "../../assets/User.png";
import AlertPopup from "../../Alert";
import ConfirmAlert from "../../Alert_confirm";

export default function ParentSettings() {
  const navigate = useNavigate();

  // State for confirm alert visibility
  const [showConfirm, setShowConfirm] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    ParentID: "",
    FullName: "",
    username: "",
    EmailAddress: "",
    CellPhone: "",
    Password: "",
    school_name: "",
    Child_id: "",
    InviteCode: "",
    profile_pic_file: null,
  });

  // Session user data
  const [user, setUser] = useState({});

  // Preview of profile picture
  const [preview, setPreview] = useState(User);

  // Alert popup data
  const [alertData, setAlertData] = useState({
    show: false,
    type: "",
    message: "",
  });

  // Function to show alert popup
  const showAlert = (type, message) => {
    // Reset first to force re-render even if same message/type
    setAlertData({ show: false, type: "", message: "" });
    setTimeout(() => {
      setAlertData({ show: true, type, message });
    }, 50);
  };

  // Load session data on mount
  useEffect(() => {
    const storedParent = JSON.parse(sessionStorage.getItem("userparent"));
    if (storedParent) setUser(storedParent);
  }, []);

  // Fetch parent settings from API
  useEffect(() => {
    if (!user || !user.ParentID) return;

    axios
      .post("http://localhost/api/get_parent.php", { ParentID: user.ParentID })
      .then((res) => {
        if (res.data.status) {
          // Populate form with fetched data
          setFormData((prev) => ({ ...prev, ...res.data.data }));
          // Set profile picture preview if exists
          if (res.data.data.profile_pic) {
            setPreview(
              `http://localhost/api/uploads/${res.data.data.profile_pic}`
            );
          }
          showAlert("success", "Profile data found!");
        } else {
          showAlert("danger", res.data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "View console to understand more.");
      });
  }, [user]);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile picture file input
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

  // Handle save button submit
  const handleSave = (e) => {
    e.preventDefault();
    const payload = new FormData();
    for (const key in formData) {
      if (formData[key] !== null) payload.append(key, formData[key]);
    }

    axios
      .post("http://localhost/api/update_parent.php", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        showAlert(
          res.data.status ? "success" : "danger",
          res.data.status
            ? "Settings saved successfully changes will take place after re-login."
            : res.data.message
        );
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "View console to understand more.");
      });
  };

  // Handle delete parent account
  const handleDelete = () => {
    axios
      .post("http://localhost/api/delete_parent.php", {
        Parent_ID: user.ParentID,
      })
      .then((res) => {
        if (res.data.status) {
          showAlert("success", "Account successfully deleted.");
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

      {/* Alert popup */}
      {alertData.show && (
        <AlertPopup
          show={alertData.show}
          type={alertData.type}
          message={alertData.message}
          onClose={() => setAlertData({ show: false, type: "", message: "" })}
        />
      )}

      {/* Confirm delete popup */}
      <ConfirmAlert
        show={showConfirm}
        message="Are you sure you want to delete this account?"
        onConfirm={() => {
          handleDelete();
          setShowConfirm(false);
        }}
        onCancel={() => setShowConfirm(false)}
      />

      <div className={styles.Dashboard_mid_section}>
        <Top_panel title={"Settings"} passage="Parent Settings" />

        <div className={styles.Dashboard_main_body}>
          <form
            className={styles2.Parent_inner_container_registration}
            onSubmit={handleSave}
          >
            <Textbox
              label="Full Name"
              name="FullName"
              value={formData.FullName}
              onChange={handleChange}
            />
            <Textbox
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <Textbox
              label="Email Address"
              name="EmailAddress"
              value={formData.EmailAddress}
              onChange={handleChange}
            />
            <Textbox
              label="Cell Phone"
              name="CellPhone"
              value={formData.CellPhone}
              onChange={handleChange}
            />
            <Textbox
              label="New Password"
              name="Password"
              type="password"
              value={formData.Password}
              onChange={handleChange}
            />

            {/* Profile picture */}
            <div className={styles.profile_pic}>
              <img src={preview} alt="Profile" className={styles.User} />
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

          {/* Delete button */}
          <div className={styles2.delete_btn}>
            <Button
              nameBtn="Delete Account"
              onClick={() => setShowConfirm(true)}
            />
          </div>
        </div>
      </div>

      <Right_panel />
    </div>
  );
}

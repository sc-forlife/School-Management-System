//cleaned and commented

import styles from "../Registration.module.css";
import Nav from "../../NavBar/Navbar";
import Textbox from "../../Textbox/Textbox";
import Button from "../../Buttons/Button";
import Select from "../../Textbox/Select";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import User from "../../assets/User.png";
import AlertPopup from "../../Alert";

export default function Profile() {
  const navigate = useNavigate();

  // State variables
  const [child_id_, setChild_id] = useState("");
  const [child, setChild] = useState([]);
  const [userItems, setUser] = useState({});
  const [preview, setPreview] = useState(User); // default to placeholder user image
  const [alertData, setAlertData] = useState({
    show: false,
    type: "",
    message: "",
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
  // Get session storage data on mount
  // -------------------------------
  useEffect(() => {
    const school_id__ = sessionStorage.getItem("school_id");
    const school_name = sessionStorage.getItem("school_name");
    setUser((u) => ({ ...u, school_id: school_id__, school_name }));
  }, []);

  // -------------------------------
  // Handle profile form submission
  // -------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("school_id", userItems.school_id);
    formData.append("school_name", userItems.school_name);
    if (userItems.profile_pic_file) {
      formData.append("profile_pic", userItems.profile_pic_file);
    }

    axios
      .post("http://localhost/api/profile_admin.php", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        if (response.data.status) {
          // Clear session and redirect on success
          sessionStorage.clear();
          showAlert("success", "Profile Created");
          setTimeout(() => navigate("/Login"), 2000);
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
  // Render profile setup form
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

      <div className={styles.set_up_profile_container}>
        <h2>Set Up Profile</h2>

        <form
          className={styles.set_up_profile_inner_container}
          onSubmit={handleSubmit}
        >
          {/* Profile Picture Upload */}
          <div className={styles.profile_pic}>
            <img src={preview} alt="User Image" className={styles.User} />

            <input
              type="file"
              name="profile_pic"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                setUser((u) => ({ ...u, profile_pic_file: file }));

                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPreview(reader.result); // update preview to selected file
                  };
                  reader.readAsDataURL(file);
                } else {
                  setPreview(User); // reset to default if nothing selected
                }
              }}
            />
          </div>

          {/* Submit Button */}
          <div className={styles.center_button}>
            <Button nameBtn="Set Up" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

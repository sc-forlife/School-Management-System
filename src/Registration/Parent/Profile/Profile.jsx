import styles from "../../Registration.module.css";
import Nav from "../../../NavBar/Navbar";
import Textbox from "../../../Textbox/Textbox";
import Button from "../../../Buttons/Button";
import Select from "../../../Textbox/Select";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import User from "../../../assets/User.png";
import AlertPopup from "../../../Alert";

export default function Profile() {
  const navigate = useNavigate();
  const [child_key, setchild_key] = useState("");

  // Store parent and school information
  const [userItems, setUser] = useState({});
  const [Parent_id_, setId] = useState({});

  // Default user image preview
  const [preview, setPreview] = useState(User);

  // Alert popup data
  const [alertData, setAlertData] = useState({
    show: false,
    type: "",
    message: "",
  });

  // Function to display alert popup
  const showAlert = (type, message) => {
    setAlertData({ show: false, type: "", message: "" });
    setTimeout(() => setAlertData({ show: true, type, message }), 50);
  };

  // Get parent ID and school name from sessionStorage
  useEffect(() => {
    const Parent_ID = sessionStorage.getItem("Parent_ID");
    setId((u) => ({ ...u, parent_id: Parent_ID }));

    const School_Name = sessionStorage.getItem("school_name");
    setUser((u) => ({ ...u, school_name: School_Name }));
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data object for file upload
    const formData = new FormData();
    formData.append("ParentID", Parent_id_.parent_id);
    formData.append("child_key", child_key);
    if (userItems.profile_pic_file) {
      formData.append("profile_pic", userItems.profile_pic_file);
    }

    // Send data to backend
    axios
      .post("http://localhost/api/profile.php", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        if (response.data.status) {
          sessionStorage.clear();
          showAlert(
            "success",
            "Profile Created and linked to " + response.data.child_name
          );
          setTimeout(() => navigate("/Login"), 3000);
        } else {
          showAlert(
            "danger",
            response.data.message || "Failed to create profile"
          );
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
                  reader.onloadend = () => setPreview(reader.result);
                  reader.readAsDataURL(file);
                } else {
                  setPreview(User);
                }
              }}
            />
          </div>

          {/* Child Selection */}
          <Textbox
            label="Enter Child key"
            placeholder="Key ...."
            name="child_key"
            value={child_key}
            onChange={(e) => setchild_key(e.target.value)}
          />

          {/* Submit Button */}
          <div className={styles.center_button}>
            <Button nameBtn="Set Up" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

//cleaned and commented

import styles from "./Dashboard.module.css";
import Badge from "../assets/KiddiLink.png";
import User from "../assets/User.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AlertPopup from "../Alert";
import ConfirmAlert from "../Alert_confirm";

export default function Left_panel() {
  // Manage image preview display
  const [showPreview, setShowPreview] = useState(false);

  // Store logged-in user data
  const [userItems, setUser] = useState({});

  // Navigation hook for redirect
  const navigate = useNavigate();

  // Confirm alert popup visibility
  const [showConfirm, setShowConfirm] = useState(false);

  // Alert popup state
  const [alertData, setAlertData] = useState({
    show: false,
    type: "",
    message: "",
  });

  // Function to show alert popup
  const showAlert = (type, message) => {
    setAlertData({ show: false, type: "", message: "" });
    setTimeout(() => {
      setAlertData({ show: true, type, message });
    }, 50);
  };

  // Load user data from session storage
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("userparent"));
    if (user) setUser(user);
  }, []);

  // Manual logout function
  const handleLogout = () => {
    axios
      .post("http://localhost/api/logout.php", {
        ParentID: userItems.ParentID,
      })
      .then((response) => {
        if (response.data.status) {
          showAlert("success", "Logging Out!");
          sessionStorage.clear();
          setTimeout(() => navigate("/login"), 2000);
        } else {
          showAlert("danger", response.data.message);
        }
      })
      .catch(() => {
        showAlert("danger", "Network error while logging out.");
      });
  };

  // Automatically log out user when tab/window closes (not on refresh)
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (userItems && userItems.ParentID) {
        navigator.sendBeacon(
          "http://localhost/api/logout.php",
          JSON.stringify({ ParentID: userItems.ParentID })
        );
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [userItems]);

  return (
    <>
      {/* Alert Popup */}
      {alertData.show && (
        <AlertPopup
          show={alertData.show}
          type={alertData.type}
          message={alertData.message}
          onClose={() => setAlertData({ show: false, type: "", message: "" })}
        />
      )}

      {/* Confirmation popup for logout */}
      <ConfirmAlert
        show={showConfirm}
        message="Are you sure you want to log out?"
        onConfirm={() => {
          handleLogout();
          setShowConfirm(false);
        }}
        onCancel={() => setShowConfirm(false)}
      />

      {/* Left side panel */}
      <div className={styles.main_dashboard_side_panel}>
        {/* App badge/logo */}
        <img src={Badge} alt="App Badge" className={styles.Badge} />

        {/* User profile section */}
        <div className={styles.profile_description}>
          <img
            src={
              userItems.picture
                ? `http://localhost/api/uploads/${userItems.picture}`
                : User
            }
            alt="User"
            className={styles.User}
            onClick={() => setShowPreview(true)}
            onError={(e) => (e.target.src = User)}
          />

          <h5 style={{ marginTop: "8px", marginBottom: "5px" }}>
            {userItems.FullName}
          </h5>
          <p style={{ marginBottom: "5px" }}>{userItems.EmailAddress}</p>
        </div>

        {/* Navigation menu */}
        <div className={styles.menu_buttons}>
          <div className={styles.my_element}></div>

          <Link to={"/Dashboard"} className={styles.button}>
            <button style={{ backgroundColor: "inherit", border: "none" }}>
              <i className="bi bi-house-door"></i> Dashboard
            </button>
          </Link>

          <Link to={"/Dashboard/Dashboard_sms"} className={styles.button}>
            <button style={{ backgroundColor: "inherit", border: "none" }}>
              <i className="bi bi-chat"></i> Messages
            </button>
          </Link>

          <Link to={"/Dashboard/Dashboard_progress"} className={styles.button}>
            <button style={{ backgroundColor: "inherit", border: "none" }}>
              <i className="bi bi-book"></i> School Progress
            </button>
          </Link>

          <Link to={"/Dashboard/Dashboard_behaviour"} className={styles.button}>
            <button style={{ backgroundColor: "inherit", border: "none" }}>
              <i className="bi bi-emoji-smile"></i> Child's Behaviour
            </button>
          </Link>

          <Link to={"/Dashboard/Dashboard_health"} className={styles.button}>
            <button style={{ backgroundColor: "inherit", border: "none" }}>
              <i className="bi bi-activity"></i> Child's Health
            </button>
          </Link>

          <Link to={"/Dashboard/Dashboard_settings"} className={styles.button}>
            <button style={{ backgroundColor: "inherit", border: "none" }}>
              <i className="bi bi-gear-wide-connected"></i> Profile details
            </button>
          </Link>

          {/* Logout button */}
          <button
            onClick={() => setShowConfirm(true)}
            className={styles.button}
          >
            <i className="bi bi-box-arrow-left"></i> Log Out
          </button>
        </div>
      </div>

      {/* Full image preview modal */}
      {showPreview && (
        <div
          className={styles.previewOverlay}
          onClick={() => setShowPreview(false)}
        >
          <div
            className={styles.previewContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className={styles.closeBtn}
              onClick={() => setShowPreview(false)}
            >
              ✖
            </span>
            <img
              src={
                userItems.picture
                  ? `http://localhost/api/uploads/${userItems.picture}`
                  : User
              }
              alt="Full Preview"
              className={styles.fullImage}
            />
          </div>
        </div>
      )}
    </>
  );
}

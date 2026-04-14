//cleaned and commented

import styles from "./Dashboard.module.css";
import Badge from "../assets/KiddiLink.png";
import User from "../assets/User.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AlertPopup from "../Alert";
import ConfirmAlert from "../Alert_confirm";

export default function Left_panel() {
  // Confirm alert popup visibility
  const [showConfirm, setShowConfirm] = useState(false);

  // Logged-in user data
  const [userItems, setUser] = useState({});

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

  // Profile picture preview
  const [showPreview, setShowPreview] = useState(false);

  const navigate = useNavigate();

  // Load user info from sessionStorage
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("useradmin"));
    setUser((u) => ({ ...u, ...user }));
  }, []);

  // Handle logout confirmation
  const handleLogout = () => {
    sessionStorage.clear();
    showAlert("success", "Logging out !");
    setTimeout(() => navigate("/login"), 2000);
  };

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

      {/* Logout Confirmation Popup */}
      <ConfirmAlert
        show={showConfirm}
        message="Are you sure you want to log out?"
        onConfirm={() => {
          handleLogout();
          setShowConfirm(false);
        }}
        onCancel={() => setShowConfirm(false)}
      />

      {/* Left Side Panel Layout */}
      <div className={styles.main_dashboard_side_panel}>
        {/* App Logo */}
        <img src={Badge} alt="App Badge" className={styles.Badge} />

        {/* User Info Section */}
        <div className={styles.profile_description}>
          <img
            src={
              userItems.picture
                ? `http://localhost/api/uploads/admin/${userItems.picture}`
                : User
            }
            alt="User"
            className={styles.User}
            onClick={() => setShowPreview(true)}
            onError={(e) => (e.target.src = User)}
          />
          <h5 style={{ marginTop: "8px", marginBottom: "5px" }}>
            {userItems.principal_name}
          </h5>
          <p style={{ marginBottom: "5px" }}>{userItems.email_address}</p>
        </div>

        {/* Navigation Buttons */}
        <div className={styles.menu_buttons}>
          <div className={styles.my_element}></div>
          <Link to={"/Dashboard admin"} className={styles.button}>
            {" "}
            <button style={{ backgroundColor: "inherit", border: "none" }}>
              {" "}
              <i className="bi bi-house-door"></i> Dashboard{" "}
            </button>{" "}
          </Link>{" "}
          <Link to={"/Dashboard admin/Dashboard_sms"} className={styles.button}>
            {" "}
            <button style={{ backgroundColor: "inherit", border: "none" }}>
              {" "}
              <i className="bi bi-chat"></i> Messages{" "}
            </button>{" "}
          </Link>{" "}
          <Link
            to={"/Dashboard admin/Dashboard_progress"}
            className={styles.button}
          >
            {" "}
            <button style={{ backgroundColor: "inherit", border: "none" }}>
              {" "}
              <i className="bi bi-book"></i> Manage kids{" "}
            </button>{" "}
          </Link>{" "}
          <Link
            to={"/Dashboard admin/Dashboard_notice_handler"}
            className={styles.button}
          >
            {" "}
            <button style={{ backgroundColor: "inherit", border: "none" }}>
              {" "}
              <i className="bi bi-calendar-date"></i> Notice Handler{" "}
            </button>{" "}
          </Link>{" "}
          <Link
            to={"/Dashboard admin/Dashboard_event_handling"}
            className={styles.button}
          >
            {" "}
            <button style={{ backgroundColor: "inherit", border: "none" }}>
              {" "}
              <i className="bi bi-house-gear-fill"></i> Event Handling{" "}
            </button>{" "}
          </Link>{" "}
          <Link
            to={"/Dashboard admin/Dashboard_settings"}
            className={styles.button}
          >
            {" "}
            <button style={{ backgroundColor: "inherit", border: "none" }}>
              {" "}
              <i className="bi bi-gear-wide-connected"></i> Profile details{" "}
            </button>{" "}
          </Link>{" "}
          <Link
            to={"/Dashboard admin/Dashboard_daily_log"}
            className={styles.button}
          >
            {" "}
            <button style={{ backgroundColor: "inherit", border: "none" }}>
              {" "}
              <i className="bi bi-bookmark-check-fill"></i> Daily Log{" "}
            </button>{" "}
          </Link>{" "}
          <Link
            to={"/Dashboard admin/Dashboard_attendance"}
            className={styles.button}
          >
            {" "}
            <button style={{ backgroundColor: "inherit", border: "none" }}>
              {" "}
              <i className="bi bi-journal-arrow-down"></i> Attendance{" "}
            </button>{" "}
          </Link>{" "}
          {/* */}{" "}
          <Link
            to={"/Dashboard admin/Dashboard_update_request"}
            className={styles.button}
          >
            {" "}
            <button style={{ backgroundColor: "inherit", border: "none" }}>
              {" "}
              <i className="bi bi-file-earmark-arrow-up"></i> Updates Request{" "}
            </button>{" "}
          </Link>{" "}
          <Link
            to={"/Dashboard admin/Dashboard_parent_child"}
            className={styles.button}
          >
            {" "}
            <button style={{ backgroundColor: "inherit", border: "none" }}>
              {" "}
              <i className="bi bi-file-earmark-arrow-up"></i> Parent Child List{" "}
            </button>{" "}
          </Link>{" "}
          {/* LOGOUT BUTTON */}{" "}
          <button
            onClick={() => setShowConfirm(true)}
            className={styles.button}
            style={{ border: "none" }}
          >
            {" "}
            <i className="bi bi-box-arrow-left"></i> Log Out{" "}
          </button>
        </div>
      </div>

      {/* Profile Picture Full Preview */}
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
                  ? `http://localhost/api/uploads/admin/${userItems.picture}`
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

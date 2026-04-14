import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Nav from "../NavBar/Navbar";
import Button from "../Buttons/Button";
import Button2 from "../Buttons/Button2";
import Textbox from "../Textbox/Textbox";
import Textbox2 from "../Textbox/Textbox2";
import axios from "axios";
import AlertPopup from "../Alert";

function Login() {
  const navigate = useNavigate();

  // -------------------------------
  // State variables
  // -------------------------------
  const [username, setUsername] = useState(""); // Username input
  const [password, setPassword] = useState(""); // Password input
  const [alertData, setAlertData] = useState({
    show: false,
    type: "",
    message: "",
  }); // Alert popup data

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
  // Handle login form submission
  // -------------------------------
  const handleLogin = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost/api/login.php", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        if (response.data.status) {
          // Clear sessionStorage first
          sessionStorage.clear();

          // Admin login
          if (response.data.role === "admin") {
            sessionStorage.setItem(
              "useradmin",
              JSON.stringify(response.data.user)
            );
            showAlert("success", "Login as Admin Successful");
            setTimeout(() => navigate("/dashboard admin"), 1000);
          }
          // Parent login
          else {
            sessionStorage.setItem(
              "userparent",
              JSON.stringify(response.data.user)
            );
            showAlert("success", "Login Successful");
            setTimeout(() => navigate("/dashboard"), 1500);
          }
        } else {
          // Show backend error message
          showAlert("danger", response.data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "View Console to understand more.");
      });
  };

  // -------------------------------
  // Render component
  // -------------------------------
  return (
    <div className={styles.body_background}>
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

      <div className={styles.main_container}>
        <p className={styles.welcome}>Welcome!</p>

        {/* Login Form */}
        <form onSubmit={handleLogin} className={styles.login_content}>
          <Textbox2
            label="Username"
            placeholder="Enter Username..."
            id="textbox_login_username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Textbox2
            type="password"
            label="Password"
            style={{ display: "inline" }}
            placeholder="Enter Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link to={"/Forgot Password"} className={styles.forget}>
            Forgot Password?
          </Link>

          <div className={styles.buttons}>
            <Button nameBtn="Login" type="submit" />
            <Link to={"/Sign_up"}>
              <Button2 name="Sign Up" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

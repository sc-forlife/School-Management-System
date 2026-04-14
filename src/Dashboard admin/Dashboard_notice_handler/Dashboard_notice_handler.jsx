//cleaned and commented

import styles from "../Dashboard.module.css";
import styles2 from "./Notice_handler.module.css";
import Right_panel from "../Right_panel";
import Left_panel from "../Left_panel";
import Top_panel from "../Top_panel";
import Button from "../../Buttons/Button";
import Textbox from "../../Textbox/Textbox";
import { useState, useEffect } from "react";
import axios from "axios";
import AlertPopup from "../../Alert";

export default function Dasboard_notice_handler() {
  // State for new notice input
  const [notice, setnotice] = useState({});

  // State for currently displayed notices
  const [display_notice, setdisplay_notice] = useState([]);

  // State for logged-in user info
  const [useradmin, setuseradmin] = useState({});

  // State for alert popup
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
  // Handle input changes
  // -------------------------------
  function handleChange(e) {
    setnotice((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  // -------------------------------
  // Fetch notices when page loads
  // -------------------------------
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("useradmin"));
    setuseradmin(user);

    axios
      .post("http://localhost/api/add_notice_2.php", {
        school_name: user.school_name,
      })
      .then((response) => {
        if (response.data.status) {
          setdisplay_notice(response.data.data);
        } else {
          setdisplay_notice([]);
          showAlert("warning", response.data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "View Console to understand more.");
      });
  }, []);

  // -------------------------------
  // Add a new notice
  // -------------------------------
  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost/api/add_notice.php", {
        ...notice,
        school_name: useradmin.school_name,
      })
      .then((response) => {
        if (response.data.status) {
          showAlert("success", "Notice added successfully!");

          // Add new notice to state with returned ID from backend
          setdisplay_notice((prev) => [
            ...prev,
            {
              notice_id: response.data.notice_id, // backend must return this
              notice: notice.notice,
            },
          ]);

          // Clear input field
          setnotice({ notice: "" });
        } else {
          setnotice({ notice: "" });
          showAlert("danger", response.data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "View Console to understand more.");
      });
  }

  // -------------------------------
  // Delete a notice
  // -------------------------------
  function delete_notice(id) {
    if (!id) return showAlert("warning", "No notice ID found!");

    axios
      .post("http://localhost/api/delete_notice.php", { notice_id: id })
      .then((response) => {
        if (response.data.status) {
          showAlert("success", "Notice deleted successfully!");

          // Remove deleted notice from state
          setdisplay_notice(display_notice.filter((n) => n.notice_id !== id));
        } else {
          showAlert("danger", response.data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "View Console to understand more.");
      });
  }

  return (
    <div className={styles.inline_display}>
      <Left_panel />

      {/* Alert Popup */}
      {alertData.show && (
        <AlertPopup
          show={alertData.show}
          type={alertData.type}
          message={alertData.message}
          onClose={() => setAlertData({ show: false, type: "", message: "" })}
        />
      )}

      <div className={styles2.Dashboard_mid_section}>
        <Top_panel title={"Notice Handling"} />

        <div className={styles2.Dashboard_main_body}>
          {/* ADD NOTICE FORM */}
          <form
            onSubmit={handleSubmit}
            style={{ marginLeft: "20px", width: "30%", marginTop: "20px" }}
          >
            <Textbox
              label="Noticeboard"
              placeholder="Enter Notice"
              style={{ width: "500px" }}
              name="notice"
              value={notice.notice}
              onChange={handleChange}
            />
            <br />
            <br />
            <Button nameBtn="Add Notice" type="submit" />
          </form>

          {/* DISPLAY NOTICES */}
          <br />
          <h5 style={{ marginLeft: "20px" }}>Current Notices</h5>
          <ol className={styles2.notice_list}>
            {display_notice.length > 0 ? (
              display_notice.map((e) => (
                <li key={e.notice_id} className={styles2.notice_item}>
                  <div className={styles2.notice_text}>{e.notice}</div>
                  <Button
                    nameBtn="Delete Notice"
                    type="button"
                    className={styles2.delete_btn}
                    onClick={() => delete_notice(e.notice_id)}
                  />
                </li>
              ))
            ) : (
              <li className={styles2.no_records}>No notices found</li>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}

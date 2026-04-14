//cleaned and commented

import styles from "../Dashboard.module.css";
import styles2 from "./Update_request.module.css";
import Right_panel from "../Right_panel";
import Left_panel from "../Left_panel";
import Top_panel from "../Top_panel";
import Update from "../Dashboard_progress/Updates";
import Update_request from "../Update_request";
import Textbox from "../../Textbox/Textbox";
import Textarea from "../textarea";
import Button from "../../Buttons/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import AlertPopup from "../../Alert";

export default function Dasboard_health() {
  // State for handling events and data
  const [event_handle, set_event_handle] = useState({});
  const [display_event, setdisplay_event] = useState([]);
  const [userItems, setUser] = useState([]);
  const [child_list, setchild_list] = useState({});

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
  // Load user and update requests on mount
  // -------------------------------
  useEffect(() => {
    // Get user from session storage
    const user = JSON.parse(sessionStorage.getItem("useradmin"));
    setUser((u) => ({ ...u, ...user }));

    // Fetch update requests for the school
    axios
      .post("http://localhost/api/get_updates_request.php", {
        ["school_name"]: user.school_name,
      })
      .then((response) => {
        if (response.data.status) {
          // Set update request data
          setdisplay_event(response.data.details);

          // Map child data for easy access
          response.data.child.map((e) => {
            setchild_list((c) => ({ ...c, [e.Child_ID]: e.Child_name }));
          });
        } else {
          setdisplay_event([]);
          showAlert("warning", response.data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "View console to understand more.");
      });
  }, []);

  // -------------------------------
  // Delete or approve an update request
  // -------------------------------
  function delete_event(id) {
    if (!id) return alert("No Update ID found!");

    axios
      .post("http://localhost/api/delete_update_request.php", { update_id: id })
      .then((response) => {
        if (response.data.status) {
          // Remove deleted request from state without reloading
          setdisplay_event(display_event.filter((ev) => ev.update_id !== id));
          showAlert("success", "Updated request approved");
        } else {
          showAlert("danger", response.data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "View console to understand more.");
      });
  }

  // -------------------------------
  // Render dashboard and update requests
  // -------------------------------
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

      <div className={styles2.Dashboard_mid_section}>
        <Top_panel title={"Update Request"} />
        <form className={styles2.Dashboard_main_body}>
          <h5 style={{ marginLeft: "20px", marginTop: "30px" }}>
            Current Update Request
          </h5>
          <ol className={styles2.update_list}>
            {display_event && display_event.length > 0 ? (
              display_event.map((e) => (
                <li key={e.update_id} className={styles2.update_item}>
                  <div className={styles2.update_info}>
                    Parent: {e.parent_name} | Child: {child_list[e.child_id]} |
                    Area: {e.area_dev}
                  </div>
                  <Button
                    nameBtn="Approve Request"
                    type="button"
                    className={styles2.approve_btn}
                    onClick={() => delete_event(e.update_id)}
                  />
                </li>
              ))
            ) : (
              <li className={styles2.no_records}>No update requests</li>
            )}
          </ol>
        </form>
      </div>
    </div>
  );
}

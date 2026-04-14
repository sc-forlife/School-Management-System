//cleaned and comments

import styles from "../Dashboard.module.css";
import styles2 from "./Health.module.css";
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
  // State for new event input fields
  const [event_handle, set_event_handle] = useState({});

  // State for displaying existing events
  const [display_event, setdisplay_event] = useState([]);

  // Logged-in user info
  const [userItems, setUser] = useState([]);

  // Alert popup data
  const [alertData, setAlertData] = useState({
    show: false,
    type: "",
    message: "",
  });

  // Show alert popup with a short delay to reset
  const showAlert = (type, message) => {
    setAlertData({ show: false, type: "", message: "" });
    setTimeout(() => {
      setAlertData({ show: true, type, message });
    }, 50);
  };

  // Load user session and fetch events on mount
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("useradmin"));
    setUser((u) => ({ ...u, ...user }));

    axios
      .post("http://localhost/api/add_event_2.php", {
        ["school_name"]: user.school_name,
      })
      .then((response) => {
        if (response.data.status) {
          setdisplay_event(response.data.data);
        } else {
          setdisplay_event("");
          showAlert("warning", response.data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "View Console to understand more.");
      });
  }, []);

  // Handle form input changes
  function handleChange(e) {
    set_event_handle({ ...event_handle, [e.target.name]: e.target.value });
  }

  // Submit new event
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost/api/add_event.php", {
        ...event_handle,
        ["school_name"]: userItems.school_name,
      })
      .then((response2) => {
        if (response2.data.status) {
          set_event_handle({
            date: "",
            event: "",
          });
          showAlert("success", "Event added successfully!");
          setTimeout(() => window.location.reload(), 2000);
        } else {
          showAlert("danger", response2.data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "View Console to understand more.");
      });
  }

  // Delete event by ID
  function delete_event(id) {
    if (!id) return showAlert("warning", "No event ID found!");

    axios
      .post("http://localhost/api/delete_event.php", { event_id: id })
      .then((response) => {
        if (response.data.status) {
          // Remove deleted event from the list
          setdisplay_event(display_event.filter((ev) => ev.event_id !== id));
          showAlert("success", "Event deleted successfully!");
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
    <>
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
          <Top_panel title={"Event Handling"} />

          {/* Event form */}
          <form className={styles2.Dashboard_main_body} onSubmit={handleSubmit}>
            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              <Textbox
                styles={{ marginLeft: "10px" }}
                label="Select Date"
                placeholder="Select"
                type="date"
                name="date"
                value={event_handle.date}
                onChange={handleChange}
              />
            </div>

            <Textbox
              title="Enter Event"
              label="Enter Event"
              placeholder="Enter Event"
              style={{ width: "500px" }}
              name="event"
              value={event_handle.event}
              onChange={handleChange}
            />

            <div
              style={{ marginLeft: "20px", width: "30%", marginTop: "20px" }}
            >
              <Button nameBtn="Enter Event" type="submit" />
            </div>

            <br />

            {/* Event list */}
            <h5 style={{ marginLeft: "20px" }}>Current Events</h5>
            <ol className={styles2.event_list}>
              {display_event && display_event.length > 0 ? (
                display_event.map((e) => (
                  <li key={e.event_id} className={styles2.event_item}>
                    <span className={styles2.event_info}>
                      {e.event_date} - {e.event_name}
                    </span>
                    <Button
                      nameBtn="Delete Event"
                      type="button"
                      className={styles2.delete_btn}
                      onClick={() => delete_event(e.event_id)}
                    />
                  </li>
                ))
              ) : (
                <li className={styles2.no_records}>No events found</li>
              )}
            </ol>
          </form>
        </div>
      </div>
    </>
  );
}

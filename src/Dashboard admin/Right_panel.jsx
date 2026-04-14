//cleaned and commented

import React, { useState, useEffect, useRef } from "react";
import "./RightPanel.css";
import axios from "axios";
import AlertPopup from "../Alert";

export default function RightPanel() {
  // State variables
  const [dates, setDates] = useState([]);
  const currentRef = useRef(null);
  const [userItems, setUser] = useState({});

  // Alert popup state
  const [alertData, setAlertData] = useState({
    show: false,
    type: "",
    message: "",
  });

  // -------------------------------
  // Function to display alert popups
  // -------------------------------
  const showAlert = (type, message) => {
    // Reset first to allow repeated same-type alerts
    setAlertData({ show: false, type: "", message: "" });
    setTimeout(() => {
      setAlertData({ show: true, type, message });
    }, 50);
  };

  // -------------------------------
  // Fetch events on component mount
  // -------------------------------
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("useradmin"));
    setUser((u) => ({ ...u, ...user }));

    if (user?.school_name) {
      axios
        .post("http://localhost/api/get_dates.php", {
          school_name: user.school_name,
        })
        .then((response) => {
          if (response.data.status) {
            // Format backend data for display
            const formatted = response.data.data.map((item, index) => ({
              id: item.event_id || index,
              date: new Date(item.event_date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }),
              raw_date: item.event_date,
              event: item.event_name,
            }));
            setDates(formatted);
          } else {
            // Show warning if no events found
            setTimeout(
              () =>
                showAlert(
                  "warning",
                  response.data.message || "No events found."
                ),
              10000
            );
          }
        })
        .catch(() => {
          // Show error if request fails
          showAlert("danger", "Failed to fetch events from server.");
        });
    }
  }, []);

  // -------------------------------
  // Scroll to today's or closest date when events load
  // -------------------------------
  useEffect(() => {
    if (dates.length > 0 && currentRef.current) {
      currentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [dates]);

  // Find today’s date and locate closest event
  const today = new Date().toISOString().split("T")[0]; // format YYYY-MM-DD
  const closestIndex = dates.findIndex((d) => d.raw_date === today);

  // -------------------------------
  // Render Right Panel
  // -------------------------------
  return (
    <div className="right-panel">
      <h2 className="panel-title">Event Calendar</h2>

      {/* Alert Popup */}
      {alertData.show && (
        <AlertPopup
          show={alertData.show}
          type={alertData.type}
          message={alertData.message}
          onClose={() => setAlertData({ show: false, type: "", message: "" })}
        />
      )}

      {/* Event Dates List */}
      <div className="date-list">
        {dates.length > 0 ? (
          dates.map((item, index) => (
            <div
              key={item.id}
              ref={index === closestIndex ? currentRef : null}
              className={`date-card ${index === closestIndex ? "active" : ""}`}
            >
              <p className="date-text">{item.date}</p>

              {item.event ? (
                <div className="event-box">{item.event}</div>
              ) : (
                <div className="event-empty">No event</div>
              )}
            </div>
          ))
        ) : (
          <p className="no-events">No events found</p>
        )}
      </div>
    </div>
  );
}

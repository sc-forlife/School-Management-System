//cleaned and commented

import React, { useState, useEffect, useRef } from "react";
import "./RightPanel.css";
import axios from "axios";
import AlertPopup from "../Alert";

export default function RightPanel() {
  // Store list of events
  const [dates, setDates] = useState([]);
  // Reference for scrolling to the current event
  const currentRef = useRef(null);
  // Store logged-in user info
  const [userItems, setUser] = useState({});
  // Manage alert popup state
  const [alertData, setAlertData] = useState({
    show: false,
    type: "",
    message: "",
  });

  // Function to display alert popups
  const showAlert = (type, message) => {
    // Reset first to allow repeated same-type alerts
    setAlertData({ show: false, type: "", message: "" });
    setTimeout(() => {
      setAlertData({ show: true, type, message });
    }, 50);
  };

  // Load user info and fetch events for their school
  useEffect(() => {
    const fetchDates = () => {
      const user = JSON.parse(sessionStorage.getItem("userparent"));
      if (user) setUser((prev) => ({ ...prev, ...user }));

      if (user?.school_name) {
        axios
          .post("http://localhost/api/get_dates.php", {
            school_name: user.school_name,
          })
          .then((response) => {
            if (response.data.status) {
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
              // showAlert("warning", response.data.message || "No events found.");
            }
          })
          .catch(() => {
            showAlert("danger", "Failed to fetch events from server.");
          });
      }
    };

    // Run immediately
    fetchDates();

    // Run every 2 seconds
    const interval = setInterval(fetchDates, 5000);

    // Cleanup when component unmounts
    return () => clearInterval(interval);
  }, []);

  // Scroll to today's or closest event after data loads
  useEffect(() => {
    if (dates.length > 0 && currentRef.current) {
      currentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [dates]);

  // Get today’s date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];
  // Find the index of today’s event
  const closestIndex = dates.findIndex((d) => d.raw_date === today);

  return (
    <div className="right-panel">
      {/* Alert Popup */}
      {alertData.show && (
        <AlertPopup
          show={alertData.show}
          type={alertData.type}
          message={alertData.message}
          onClose={() => setAlertData({ show: false, type: "", message: "" })}
        />
      )}

      {/* Title */}
      <h2 className="panel-title">Event Calendar</h2>

      {/* Event List */}
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

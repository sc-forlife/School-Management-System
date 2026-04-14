//cleaned and commented

import styles from "./Dashboard.module.css";
import Right_panel from "./Right_panel";
import Left_panel from "./Left_panel";
import Top_panel from "./Top_panel";
import Task_card from "./Task_card";
import { useState, useEffect } from "react";
import axios from "axios";
import AlertPopup from "../Alert";

export default function Dasboard_main() {
  // Get current date and time formatted nicely
  const now = new Date();
  const formatted = now.toLocaleString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // State for alert popup
  const [alertData, setAlertData] = useState({
    show: false,
    type: "",
    message: "",
  });

  // State for user info
  const [userItems, setUser] = useState({});

  // States for fetched data
  const [notices, setNotices] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [logs, setLog] = useState([]);

  // Function to show alert popup
  const showAlert = (type, message) => {
    setAlertData({ show: false, type: "", message: "" });
    setTimeout(() => {
      setAlertData({ show: true, type, message });
    }, 50);
  };

  useEffect(() => {
    // function to run every 2 seconds
    const fetchData = () => {
      const user = JSON.parse(sessionStorage.getItem("userparent"));
      setUser((u) => ({ ...u, ...user }));

      // Fetch notices
      axios
        .post("http://localhost/api/get_notice.php", {
          school_name: user.school_name,
        })
        .then((response) => {
          if (response.data.success) {
            setNotices(response.data.data);
          } else {
            setNotices([]);
            // showAlert("warning", "No notices found for this school.");
          }
        })
        .catch(() => {
          showAlert("danger", "View Console to understand more.");
        });

      // Fetch attendance
      axios
        .post("http://localhost/api/get_attendance.php", {
          child_id: user.Child_id,
          school_name: user.school_name,
        })
        .then((response2) => {
          if (response2.data.success) {
            setAttendance(response2.data.data[0]);
          } else {
            setAttendance([]);
            // showAlert("warning", "No attendance records found.");
          }
        })
        .catch(() => {
          showAlert("danger", "View Console to understand more.");
        });

      // Fetch daily logs
      axios
        .post("http://localhost/api/get_log.php", {
          child_id: user.Child_id,
          school_name: user.school_name,
        })
        .then((response3) => {
          if (response3.data.success) {
            setLog(response3.data.data[0]);
          } else {
            setLog([]);
            // showAlert("warning", "No daily logs found.");
          }
        })
        .catch(() => {
          showAlert("danger", "View Console to understand more.");
        });
    };

    // run immediately
    fetchData();

    // run every 2 seconds
    const interval = setInterval(fetchData, 2000);

    // cleanup
    return () => clearInterval(interval);
  }, []);

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

        <div className={styles.Dashboard_mid_section}>
          {/* Top panel greeting */}
          <Top_panel
            title={`Hello ${userItems.username} `}
            passage={`Today is ${formatted}`}
          />

          <div className={styles.Dashboard_main_body}>
            {/* Noticeboard section */}
            <div className={styles.kiddilink}>
              <h5>KiddiLink name: {userItems.child_name}</h5>
            </div>
            <div className={styles.noticeboard}>
              <h5>Noticeboard</h5>
              <ul className={styles.ul}>
                {notices.length > 0 ? (
                  notices.map((item) => (
                    <li key={item.notice_id}>📢 {item.notice}</li>
                  ))
                ) : (
                  <li>No notices available</li>
                )}
              </ul>
            </div>

            {/* Lower section containing logs and attendance */}
            <div className={styles.lower_container}>
              <div className={styles.task_list}>
                <h2>Daily Log</h2>

                <div className={styles.log_card}>
                  {logs ? (
                    <>
                      <div className={styles.log_header}>
                        <span className={styles.log_date}>
                          {new Date().toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <span className={styles.log_status}>
                          Mood: {logs.day_mood || "Not recorded"}
                        </span>
                      </div>

                      <ul className={styles.log_activities}>
                        <li>🧩Learning: {logs.learning || "No info"}</li>
                        <li>🍎Snack: {logs.snack || "No info"}</li>
                        <li>💤Nap: {logs.nap || "No info"}</li>
                        <li>🎨Art: {logs.art || "No info"}</li>
                      </ul>

                      <p className={styles.log_notes}>
                        {logs.final_note || "No notes for today."}
                      </p>
                    </>
                  ) : (
                    <div className={styles.no_log}>
                      <p>No log data available for today.💤</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Attendance section */}
              <div className={styles.attendance_container}>
                {attendance &&
                attendance.present != null &&
                attendance.absent != null ? (
                  <>
                    <div className={styles.attendance_summary}>
                      <div className={styles.days_attended}>
                        <h6>{attendance.present} Days</h6>
                        <p>Attended</p>
                      </div>

                      <div className={styles.days_absent}>
                        <h6>{attendance.absent} Days</h6>
                        <p>Absent</p>
                      </div>
                    </div>

                    <div className={styles.attend_percent}>
                      <h3>Attendance Summary</h3>
                      <p>
                        The child has{" "}
                        <span className={styles.attend_value}>
                          {((attendance.present / 15) * 100).toFixed(1)}%
                        </span>{" "}
                        attendance
                      </p>

                      <div className={styles.attend_bar_bg}>
                        <div
                          className={styles.attend_bar_fill}
                          style={{
                            width: `${(attendance.present / 15) * 100}%`,
                          }}
                        ></div>
                      </div>

                      <small>
                        ({attendance.present} out of 15 days present)
                      </small>
                    </div>
                  </>
                ) : (
                  <div className={styles.no_attendance}>
                    <p>📅 No attendance data available yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Right_panel />
      </div>
    </>
  );
}

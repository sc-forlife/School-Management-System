//cleaned and commmented

import styles from "./Dashboard.module.css";
import Right_panel from "./Right_panel";
import Left_panel from "./Left_panel";
import Top_panel from "./Top_panel";
import Task_card from "./Task_card";
import Task_child_card from "./Task_child_card";
import { useState, useEffect } from "react";
import axios from "axios";
import AlertPopup from "../Alert";

export default function Dasboard_main() {
  // Get current date and format it
  const now = new Date();
  const formatted = now.toLocaleString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // State variables
  const [userItems, setUser] = useState({});
  const [online_user, setOnline] = useState("");
  const [totalusers, settotaluser] = useState([]);
  const [child, setchild] = useState([]);
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);

  // Alert popup state
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
  // Function to generate invite code
  // -------------------------------
  const generateInviteCode = async () => {
    setLoading(true);
    try {
      const response = await axios
        .post("http://localhost/api/generate_invite.php", {
          school_name: userItems.school_name,
        })
        .then((response) => {
          if (response.data.status) {
            setInviteCode(response.data.code);
            showAlert("success", "Code Generated !");
          } else {
            showAlert("danger", response.data.message);
          }
        });
    } catch (error) {
      console.error("Error generating code:", error);
      setTimeout(
        () => showAlert("danger", "Failed to generate invite code"),
        2000
      );
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // Load user data and fetch stats on mount
  // -------------------------------
  useEffect(() => {
    const fetchData = () => {
      const user = JSON.parse(sessionStorage.getItem("useradmin"));
      setUser((u) => ({ ...u, ...user }));

      // Fetch number of online parents
      axios
        .post("http://localhost/api/get_online.php", {
          school_name: user.school_name,
        })
        .then((response) => {
          if (response.data.status) {
            setOnline(response.data.online_count);
          } else {
            setOnline("");
          }
        })
        .catch(() => {
          showAlert("danger", "View console to understand more.");
        });

      // Parent list
      axios
        .post("http://localhost/api/get_parent_list.php", {
          school_name: user.school_name,
        })
        .then((response) => {
          if (response.data.status) {
            settotaluser(response.data.parents);
          } else {
            settotaluser([]);
          }
        })
        .catch(() => {
          showAlert("danger", "View console to understand more.");
        });

      // Children list
      axios
        .post("http://localhost/api/get_children_list.php", {
          school_name: user.school_name,
        })
        .then((response) => {
          if (response.data.status) {
            setchild(response.data.children);
          } else {
            setchild([]);
          }
        })
        .catch(() => {
          showAlert("danger", "View console to understand more.");
        });
    };

    // run once immediately
    fetchData();

    // run every 2 seconds
    const interval = setInterval(fetchData, 5000);

    // cleanup — stop interval when leaving the page
    return () => clearInterval(interval);
  }, []);

  // -------------------------------
  // Render dashboard
  // -------------------------------
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

      <div className={styles.Dashboard_mid_section}>
        <Top_panel
          title={`Hello ${userItems.username}`}
          passage={`Today is ${formatted}`}
        />

        <div className={styles.Dashboard_main_body}>
          {/* Stats Section */}
          <div className={styles.stats_section}>
            <div className={styles.stat_card}>
              <h5>Parents Online</h5>
              <span>{online_user}</span>
            </div>
            <div className={styles.stat_card}>
              <h5>Total Children</h5>
              <span>{child.length}</span>
            </div>
            <div className={styles.stat_card}>
              <h5>Total Parents</h5>
              <span>{totalusers.length ? totalusers.length : "0"}</span>
            </div>
          </div>

          {/* Bottom Section */}
          <div className={styles.bottom_section}>
            {/* Users List */}
            <div className={styles.user_list_section}>
              <h4>Parents</h4>
              <div className={styles.user_list}>
                {totalusers.length > 0 ? (
                  totalusers.map((user, index) => (
                    <Task_card key={index} passage={user.FullName} />
                  ))
                ) : (
                  <p className={styles.no_user_text}>No users found...</p>
                )}
              </div>
            </div>

            {/* Invite Code Section */}
            <div className={styles.invite_container}>
              <h4>School Codes</h4>
              <p className={styles.invite_subtext}>
                Generate a unique code here.
              </p>

              <div className={styles.invite_code_box}>
                <span className={styles.invite_code_text}>
                  {inviteCode ? inviteCode : "------"}
                </span>
                {inviteCode && (
                  <button
                    className={styles.copy_btn}
                    onClick={() => {
                      navigator.clipboard.writeText(inviteCode);
                      window.location.reload();
                    }}
                  >
                    Copy
                  </button>
                )}
              </div>

              <button
                className={styles.generate_btn}
                onClick={generateInviteCode}
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Code"}
              </button>
            </div>
          </div>
          <div>
            <div className={styles.user_list_section2}>
              <h4 className={styles.section_title}>Children</h4>

              {child.length > 0 ? (
                <div className={styles.user_grid}>
                  {child.map((c, index) => (
                    <Task_child_card
                      key={index}
                      passage1={`👶 Name: ${c.Child_name}`}
                      passage2={`🚻 Gender: ${c.gender}`}
                      passage3={`🎂 DOB: ${c.dob}`}
                      passage4={`🔑 Child Key: ${c.child_key}`}
                    />
                  ))}
                </div>
              ) : (
                <div className={styles.empty_state}>
                  <p>No children found yet.</p>
                  <small>Once a child is added, they’ll appear here.</small>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Right_panel />
    </div>
  );
}

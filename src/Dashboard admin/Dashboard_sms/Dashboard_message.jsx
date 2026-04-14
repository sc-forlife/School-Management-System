import styles from "../Dashboard.module.css";
import styles2 from "./Dash_sms.module.css";
import Right_panel from "../Right_panel";
import Left_panel from "../Left_panel";
import Top_panel from "../Top_panel";
import { useState, useEffect } from "react";
import axios from "axios";
import AlertPopup from "../../Alert";

export default function Dasboard_main() {
  const [userItems, setUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [formData, setformData] = useState({});
  const [parent_list, set_parent_list] = useState([]);
  const [select_parent, set_select_parent] = useState(null);

  // Track unread notifications + last message preview
  const [newMsgAlert, setNewMsgAlert] = useState({});
  const [lastMessages, setLastMessages] = useState({});
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

  // Load user from sessionStorage
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("useradmin"));
    if (user) setUser(user);

    setformData({
      school_name: user?.school_name,
      sender_id: user?.id,
      username: user?.username,
      sender_role: "school",
      message: "",
    });

    axios
      .post("http://localhost/api/get_parents_list.php", {
        school_name: user?.school_name,
      })
      .then((res) => set_parent_list(res.data.parents))
      .catch((err) => console.error(err));
  }, []);

  // ✅ AUTO FETCH MESSAGES WHEN A CHAT IS OPENED
  useEffect(() => {
    if (!select_parent || !userItems.id) return;

    const fetchMessages = () => {
      axios
        .post("http://localhost/api/get_message.php", {
          sender_id: select_parent,
          school_name: userItems.school_name,
          school_id: userItems.id,
          sender_role: "parent",
        })
        .then((res2) => {
          if (res2.data.status && res2.data.message.length > 0) {
            const received = res2.data.message;
            const latest = received[received.length - 1];
            setMessages(received);

            const parentId = latest.sender_id;

            // Update last message preview
            setLastMessages((prev) => ({
              ...prev,
              [parentId]: latest.message,
            }));
          } else {
            setMessages([]);
          }
        })
        .catch((err) => console.error(err));
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 1500);
    return () => clearInterval(interval);
  }, [select_parent, userItems]);

  // ✅ GLOBAL CHECK FOR NEW MESSAGES (FOR ALL PARENTS)
  useEffect(() => {
    // stop if no user ID or no parents
    if (
      !userItems.id ||
      !Array.isArray(parent_list) ||
      parent_list.length === 0
    )
      return;

    const checkNewMessages = () => {
      // double-check inside too
      if (!Array.isArray(parent_list) || parent_list.length === 0) return;

      parent_list.forEach((p) => {
        axios
          .post("http://localhost/api/get_message.php", {
            sender_id: p.ParentID,
            school_name: userItems.school_name,
            school_id: userItems.id,
            sender_role: "parent",
          })
          .then((res3) => {
            if (
              res3.data.status &&
              Array.isArray(res3.data.message) &&
              res3.data.message.length > 0
            ) {
              const all = res3.data.message;
              const latest = all[all.length - 1];

              // save last message preview
              setLastMessages((prev) => ({
                ...prev,
                [p.ParentID]: latest.message,
              }));

              // if not currently viewing that parent and message is from parent -> show alert
              if (
                p.ParentID !== select_parent &&
                latest.sender_role === "parent"
              ) {
                setNewMsgAlert((prev) => ({
                  ...prev,
                  [p.ParentID]: true,
                }));
              }
            }
          })
          .catch((err) => console.log("Error fetching messages:", err));
      });
    };

    checkNewMessages();

    // check for new messages every 2 seconds
    const interval = setInterval(checkNewMessages, 2000);
    return () => clearInterval(interval);
  }, [userItems, parent_list, select_parent]);

  // ✅ remove alert when entering that chat
  useEffect(() => {
    if (select_parent) {
      setNewMsgAlert((prev) => ({
        ...prev,
        [select_parent]: false,
      }));
    }
  }, [select_parent]);

  const handleChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const handleSend = (e) => {
    e.preventDefault();
    if (!formData.message) return;

    axios
      .post("http://localhost/api/send_messages_school.php", {
        ...formData,
        receiver_id: select_parent,
      })
      .then((res4) => {
        if (res4.data.status) {
          setMessages(res4.data.new_messages || []);
          setformData((prev) => ({ ...prev, message: "" }));
          showAlert("success", "Message sent !");
        } else {
          showAlert("danger", res4.data.message);
        }
      })
      .catch((err) => console.error(err));
  };

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
        <Top_panel title={"Messaging Admin"} passage={"Caregiver Salem"} />

        <div className={styles2.chatLayout}>
          {/* === USER LIST === */}
          <div className={styles2.userList}>
            <h4>Parents</h4>
            <div className={styles2.userScroll}>
              {Array.isArray(parent_list) && parent_list.length > 0 ? (
                parent_list.map((p) => (
                  <div
                    key={p.ParentID}
                    className={`${styles2.userItem} ${
                      select_parent === p.ParentID ? styles2.activeUser : ""
                    }`}
                    onClick={() => set_select_parent(p.ParentID)}
                  >
                    <div className={styles2.avatar}>
                      {p.username?.[0]?.toUpperCase() || "?"}
                    </div>
                    <div className={styles2.userInfo}>
                      <div className={styles2.userName}>{p.username}</div>
                      <div className={styles2.lastMsg}>
                        {newMsgAlert[p.ParentID] ? (
                          <span style={{ color: "red", fontWeight: "bold" }}>
                            New message
                          </span>
                        ) : (
                          lastMessages[p.ParentID]?.slice(0, 20) || ""
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles2.emptyList}>No parents found</div>
              )}
            </div>
          </div>

          {/* === CHAT WINDOW === */}
          <div className={styles2.chatSection}>
            {select_parent ? (
              <>
                <div className={styles2.selectedUserHeader}>
                  Chat with{" "}
                  {parent_list.find((p) => p.ParentID === select_parent)
                    ?.username || "Parent"}
                </div>

                <div className={styles2.chatWrapper}>
                  <div className={styles2.chatWindow}>
                    {messages.length > 0 ? (
                      messages.map((m) => (
                        <div
                          key={m.id}
                          className={`${styles2.messageBubble} ${
                            m.sender_name === userItems.username
                              ? styles2.user
                              : styles2.bot
                          }`}
                        >
                          <strong>
                            {m.sender_name === userItems.username
                              ? "You"
                              : m.sender_name}
                            :
                          </strong>{" "}
                          {m.message}{" "}
                          <span style={{ fontSize: "0.7rem", opacity: 0.6 }}>
                            {m.created_at.slice(0, 16)}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "50px",
                          color: "#888",
                        }}
                      >
                        No conversations yet. Start messaging!
                      </div>
                    )}
                  </div>

                  <form className={styles2.inputArea} onSubmit={handleSend}>
                    <input
                      type="text"
                      name="message"
                      placeholder="Type a message..."
                      value={formData.message || ""}
                      onChange={handleChange}
                      className={styles2.inputBox}
                    />
                    <button type="submit" className={styles2.sendBtn}>
                      Send
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div
                style={{ padding: "50px", textAlign: "center", color: "#888" }}
              >
                Select a parent to start chatting
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

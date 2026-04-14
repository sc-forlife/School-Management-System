//cleaned and commented

import styles from "../Dashboard.module.css";
import styles2 from "./Dash_sms.module.css";
import Right_panel from "../Right_panel";
import Left_panel from "../Left_panel";
import Top_panel from "../Top_panel";
import { useState, useEffect } from "react";
import axios from "axios";
import AlertPopup from "../../Alert";

export default function ParentChat() {
  // Store user info from session
  const [userItems, setUser] = useState({});
  // Form data for sending messages
  const [formData, setFormData] = useState({});
  // Messages list
  const [messages, setMessages] = useState([]);
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
    // Reset first to force re-render
    setAlertData({ show: false, type: "", message: "" });
    setTimeout(() => {
      setAlertData({ show: true, type, message });
    }, 50);
  };

  // Load parent session data
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("userparent"));
    if (user) {
      setUser(user);
      setFormData({
        school_name: user.school_name,
        parent_id: user.ParentID,
        username: user.username,
        sender_role: "parent",
        message: "",
      });
    }
  }, []);

  // Fetch messages and auto-refresh
  useEffect(() => {
    if (!userItems.ParentID) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.post(
          "http://localhost/api/get_message_parents.php",
          {
            sender_id: userItems.ParentID,
            school_name: userItems.school_name,
          }
        );

        if (res.data.status) {
          // Ensure messages have required fields
          const safeMessages = res.data.message.map((m) => ({
            id: m.id || Math.random(),
            sender_name: m.sender_name || "Unknown",
            message: m.message || "",
            created_at: m.created_at || new Date().toISOString(),
          }));
          setMessages(safeMessages);
        } else {
          setMessages([]); // clear if no messages
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages(); // initial load
    const interval = setInterval(fetchMessages, 1500); // refresh every 1.5s
    return () => clearInterval(interval);
  }, [userItems]);

  // Update form data when typing
  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // Send message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!formData.message) return; // prevent empty messages

    try {
      const res = await axios.post(
        "http://localhost/api/send_messages_parent.php",
        formData
      );

      if (res.data.status) {
        // Append the new message
        const newMsg = {
          id: res.data.new_message?.id || Math.random(),
          sender_name: res.data.new_message?.sender_name || formData.username,
          message: res.data.new_message?.message || formData.message,
          created_at:
            res.data.new_message?.created_at || new Date().toISOString(),
        };
        setMessages((prev) => [...prev, newMsg]);
        setFormData((prev) => ({ ...prev, message: "" })); // clear input
        showAlert("success", "Message sent !");
      } else {
        showAlert("danger", res.data.message);
      }
    } catch (err) {
      console.error("Error sending message:", err);
      showAlert("danger", "View Console to understand more.");
    }
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
        <Top_panel
          title={"Messaging"}
          passage={`School: ${userItems.school_name || "Loading..."}`}
        />

        <div className={styles2.chatContainer}>
          {/* Chat window */}
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

          {/* Input area */}
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
      </div>

      <Right_panel />
    </div>
  );
}

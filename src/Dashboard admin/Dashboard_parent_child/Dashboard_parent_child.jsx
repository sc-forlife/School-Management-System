import styles from "../Dashboard.module.css";
import styles2 from "./Parent_child.module.css";
import Right_panel from "../Right_panel";
import Left_panel from "../Left_panel";
import Top_panel from "../Top_panel";
import Textbox from "../../Textbox/Textbox";
import Textarea from "../textarea";
import Button from "../../Buttons/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import AlertPopup from "../../Alert";

export default function DashboardParentChild() {
  const [parentList, setParentList] = useState([]); // List of parents
  const [childList, setChildList] = useState({}); // Map of child IDs to names
  const [userItems, setUserItems] = useState({}); // Current logged-in user info
  const [alertData, setAlertData] = useState({
    show: false,
    type: "",
    message: "",
  }); // Alert popup data

  // Function to show alert popup
  const showAlert = (type, message) => {
    // Reset first to force re-render even if same message/type
    setAlertData({ show: false, type: "", message: "" });
    setTimeout(() => {
      setAlertData({ show: true, type, message });
    }, 50);
  };

  // Fetch parent and child data when component mounts
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("useradmin"));
    setUserItems(user);

    axios
      .post("http://localhost/api/parent_child_list.php", {
        school_name: user.school_name,
      })
      .then((response) => {
        if (response.data.status) {
          // Set parent list
          setParentList(response.data.details);

          // Map child IDs to names
          response.data.child.forEach((child) => {
            setChildList((prev) => ({
              ...prev,
              [child.Child_ID]: child.Child_name,
            }));
          });
        } else {
          setParentList([]);
          showAlert("warning", response.data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "View console for more details.");
      });
  }, []);

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
        <Top_panel title="Parent and Child" />

        <form className={styles2.Dashboard_main_body}>
          <h5 style={{ marginLeft: "20px", marginTop: "30px" }}>
            Current Parent and Child List
          </h5>

          <ol className={styles2.parent_child_list}>
            {parentList.length > 0 ? (
              parentList.map((parent) => (
                <li key={parent.ParentID} className={styles2.parent_child_item}>
                  <span className={styles2.parent_name}>
                    Parent: {parent.FullName}
                  </span>
                  <span className={styles2.child_name}>
                    Child: {childList[parent.Child_id] || "Unknown"}
                  </span>
                </li>
              ))
            ) : (
              <li className={styles2.no_records}>
                No Parent / Child records found!
              </li>
            )}
          </ol>
        </form>
      </div>
    </div>
  );
}

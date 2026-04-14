//cleaned and comments

import styles from "../../Dashboard.module.css";
import styles2 from "./Delete_child.module.css";
import Right_panel from "../../Right_panel";
import Left_panel from "../../Left_panel";
import Top_panel from "../../Top_panel";
import Child_card from "../../Child_card";
import Button_manage from "../../Button_manage";
import { Link } from "react-router-dom";
import Select from "../../../Textbox/Select2";
import Button from "../../../Buttons/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import AlertPopup from "../../../Alert";

export default function Dashboard_delete_child() {
  // State to store children list
  const [child, setChild] = useState([]);
  // State to store current user info
  const [userItems, setUser] = useState({});
  // State to trigger reload or re-render
  const [num, setNum] = useState(0);
  // State to store selected child for deletion
  const [id_edit, setid_edit] = useState({});
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

  // Load user info from sessionStorage
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("useradmin"));
    setUser((u) => ({ ...u, ...user }));
    setNum(1);
  }, []);

  // Fetch children data when userItems are loaded
  useEffect(() => {
    if (!userItems.school_name) return; // wait for school_name
    axios
      .post("http://localhost/api/edit_child.php", {
        school_name: userItems.school_name,
      })
      .then((response) => {
        if (response.data.status) {
          setChild(response.data.data);
        } else {
          showAlert("warning", response.data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        showAlert("danger", "View Console to understand more.");
      });
  }, [userItems]);

  // Handle select input changes for child to delete
  const handleChange_edit = (e) => {
    setid_edit({ [e.target.name]: e.target.value });
  };

  // Delete selected child
  function handleDelete(e) {
    e.preventDefault();
    axios
      .post("http://localhost/api/delete_child_2.php", id_edit)
      .then((response2) => {
        if (response2.data.status) {
          showAlert("success", "Child Deleted Successfully");
          // Reload page after deletion
          setTimeout(() => window.location.reload(), 1500);
        } else {
          showAlert("danger", response2.data.message);
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
          <Top_panel passage={`Delete Child`} />

          <div className={styles2.Dashboard_main_body}>
            {/* Navigation Buttons */}
            <div className={styles2.button_container}>
              <Link
                to={"/Dashboard admin/Dashboard_progress/Dashboard_Add_child"}
              >
                <Button_manage title="Add" />
              </Link>

              <Link
                to={"/Dashboard admin/Dashboard_progress/Dashboard_edit_child"}
              >
                <Button_manage title="Edit" />
              </Link>

              <Link
                to={
                  "/Dashboard admin/Dashboard_progress/Dashboard_delete_child"
                }
              >
                <Button_manage title="Delete" />
              </Link>
            </div>

            {/* Select which child to delete */}
            <form onSubmit={handleDelete} className={styles2.edit_container}>
              <Select
                label="Select Child"
                placeholder="Select"
                onChange={handleChange_edit}
                name="Child_ID"
                value={id_edit.Child_ID}
                select_list={child.map((c) => ({
                  value: c.Child_ID,
                  label: c.Child_name,
                }))}
              />
              <Button nameBtn="Delete" type="submit" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

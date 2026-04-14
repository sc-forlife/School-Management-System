import Home from "./Home/Home";
import About from "./About/about";
import Login from "./Login/Login";
import Sign_up from "./Sign Up/Sign_up";
import School_reg from "./Registration/School_registration";
import Parent_reg from "./Registration/Parent/Parent_registration";
import Nav from "./NavBar/Navbar";
import Profile from "./Registration/Parent/Profile/Profile";
import Dashboard_main from "./Dashboard/Dashboard_main";
import Dashboard_message from "./Dashboard/Dashboard_sms/Dashboard_message";
import Dashboard_progress from "./Dashboard/Dashboard_progress/Dashboard_progress";
import Dashboard_behaviour from "./Dashboard/Dashboard_behaviour/Dashboard_behaviour";
import Dashboard_health from "./Dashboard/Dashboard_health/Dashboard_health";
import Dashboard_settings from "./Dashboard/Dashboard_settings/Dashboard_settings";
import Dashboard_admin_main from "./Dashboard admin/Dashboard_main";
import Dashboard_admin_message from "./Dashboard admin/Dashboard_sms/Dashboard_message";
import Dashboard_notice_handler from "./Dashboard admin/Dashboard_notice_handler/Dashboard_notice_handler";
import Dashboard_admin_settings from "./Dashboard admin/Dashboard_settings/Dashboard_settings";
import Dashboard_event_handling from "./Dashboard admin/Dashboard_event_handling/Dashboard_event_handling";
import Dashboard_admin_progress from "./Dashboard admin/Dashboard_progress/Dashboard_manage";
import Dashboard_add_child from "./Dashboard admin/Dashboard_progress/Dashboard_add_child/Dashboard_add_child";
import Dashboard_edit_child from "./Dashboard admin/Dashboard_progress/Dashboard_edit_child/Dashboard_edit_child";
import Dashboard_delete_child from "./Dashboard admin/Dashboard_progress/Dashboard_delete_child/Dashboard_delete_child";
import Dashboard_daily_log from "./Dashboard admin/Dashboard_daily_log/Dashboard_log";
import Dashboard_attend from "./Dashboard admin/Dashboard_attendance/Attendance";
import Dashboard_update_request from "./Dashboard admin/Dashboard_update_request/Dashboard_update_request";
import User_check from "./Forgot Password/User_check";
import Change_pass from "./Forgot Password/Change_Pass/Change_pass";
import Profile_admin from "./Registration/Profile_admin/Profile";
import Dashboard_parent_child from "./Dashboard admin/Dashboard_parent_child/Dashboard_parent_child";

import { Fragment } from "react";
import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Sign_up" element={<Sign_up />} />
          <Route path="/Registration" element={<School_reg />} />
          <Route path="/Registration/Parent" element={<Parent_reg />} />
          <Route path="/Registration/Parent/Profile" element={<Profile />} />
          <Route path="/Dashboard" element={<Dashboard_main />} />
          <Route
            path="/Dashboard/Dashboard_sms"
            element={<Dashboard_message />}
          />
          <Route
            path="/Dashboard/Dashboard_progress"
            element={<Dashboard_progress />}
          />
          <Route
            path="/Dashboard/Dashboard_behaviour"
            element={<Dashboard_behaviour />}
          />
          <Route
            path="/Dashboard/Dashboard_health"
            element={<Dashboard_health />}
          />
          <Route
            path="/Dashboard/Dashboard_settings"
            element={<Dashboard_settings />}
          />
          <Route
            path="/Dashboard/Dashboard_settings"
            element={<Dashboard_settings />}
          />
          <Route path="/Dashboard admin" element={<Dashboard_admin_main />} />
          <Route
            path="/Dashboard admin/Dashboard_sms"
            element={<Dashboard_admin_message />}
          />
          <Route
            path="/Dashboard admin/Dashboard_progress"
            element={<Dashboard_admin_progress />}
          />
          <Route
            path="/Dashboard admin/Dashboard_notice_handler"
            element={<Dashboard_notice_handler />}
          />
          <Route
            path="/Dashboard admin/Dashboard_settings"
            element={<Dashboard_admin_settings />}
          />
          <Route
            path="/Dashboard admin/Dashboard_progress/Dashboard_edit_child"
            element={<Dashboard_edit_child />}
          />
          <Route
            path="/Dashboard admin/Dashboard_progress/Dashboard_add_child"
            element={<Dashboard_add_child />}
          />
          <Route
            path="/Dashboard admin/Dashboard_progress/Dashboard_delete_child"
            element={<Dashboard_delete_child />}
          />
          <Route
            path="/Dashboard admin/Dashboard_event_handling"
            element={<Dashboard_event_handling />}
          />
          <Route
            path="/Dashboard admin/Dashboard_daily_log"
            element={<Dashboard_daily_log />}
          />
          <Route
            path="/Dashboard admin/Dashboard_attendance"
            element={<Dashboard_attend />}
          />
          <Route
            path="/Dashboard admin/Dashboard_update_request"
            element={<Dashboard_update_request />}
          />
          <Route path="/Forgot Password" element={<User_check />} />
          <Route
            path="/Forgot Password/Change_Pass"
            element={<Change_pass />}
          />
          <Route
            path="/Registration/Profile_admin"
            element={<Profile_admin />}
          />
          <Route
            path="Dashboard admin/Dashboard_parent_child"
            element={<Dashboard_parent_child />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

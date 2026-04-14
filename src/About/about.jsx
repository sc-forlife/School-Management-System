import { useState } from "react";
import { Link } from "react-router-dom";
import Hero_section from "./Hero_section";
import Nav from "../NavBar/Navbar";
import Passage from "./Passage";
import Info_display from "../Home/Info_display";
import Pic from "../assets/4931098.jpg";
import Pic2 from "../assets/4916746.jpg";
import Pic3 from "../assets/hugs_kids_04.jpg";
import Sign_up from "../Sign Up/Sign_up";
import Footer from "../Home/Footer";
import styles from "./About.module.css";

function about() {
  return (
    <>
      <div className={styles.About_container_body}>
        <Nav />
        <Hero_section />
        <Passage
          title={"Our Story"}
          passage={`At Kiddilink, we saw how many parents in Windhoek struggle to stay connected with their children’s early learning. Most updates happen through paper notes, quick chats at pick-up time, or not at all. This creates a gap — parents miss important milestones, and teachers don’t always have the right tools to share progress.

That’s why we built Kiddilink: a simple, free, and reliable platform that keeps schools, caregivers, and families connected in real-time.`}
        />
        <Info_display
          title={"Our Mission"}
          content={
            "To strengthen parent–teacher communication, support children’s growth, and simplify kindergarten management — all in one platform."
          }
          text_type={"passage"}
          image={Pic}
        />

        <Info_display
          title={"Our Values"}
          content={[
            ["1.Transparency"],
            ["2.Community"],
            ["3.Simplicity"],
            ["4.Care"],
          ]}
          text_type="list"
          image={Pic2}
          image_side="right"
        />

        <Info_display
          title="How It Works"
          content={[
            ["1.Schools register and set up their classes."],
            ["2.Teachers add daily logs, progress reports, and updates."],
            [
              "3.Parents connect to their child’s profile and receive real-time notifications.",
            ],
          ]}
          image={Pic3}
          image_side="left"
        />
        <Passage
          title={"Our Team"}
          passage={`Kiddilink is proudly developed in Namibia, for Windhoek kindergartens and families. We understand the challenges of early education locally, and we’re committed to building tools that truly make a difference.`}
        />
        <Sign_up nav={false} />
        <Footer />
      </div>
    </>
  );
}

export default about;

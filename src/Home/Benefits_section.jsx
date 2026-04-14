import styles from "./Home.module.css";
import Benefits_card from "./Benefits_card";
import Health_image from "../assets/remove background fr.png";
import Noticeboard_image from "../assets/make a more modern a.png";
import Event_image from "../assets/make a 3D calendar w.png";
import Daily_image from "../assets/open the log book an.png";
import Progress_image from "../assets/3D image indicating .png";

export default function Benefits_section() {
  return (
    <>
      <div className={styles.benefits_main_container}>
        <h1>Benefits of KiddiLink</h1>
        <br></br>
        <div className={styles.cards_benefit_section}>
          <Benefits_card
            title="Messaging"
            title_description="Secure chats between parents and teachers for instant communication."
            color={{
              background: "linear-gradient(0deg, #FFFFFF 10% ,#00FFEE 100%)",
            }}
          />
          <Benefits_card
            title="Health Notes"
            title_description="Receive information on wellness, medication, or accidents right away."
            color={{
              background: "linear-gradient(0deg, #FFFFFF 10% ,#00FFEE 100%)",
            }}
            image={Health_image}
          />
          <Benefits_card
            title="Noticeboard"
            title_description="Read important announcements, and school updates easily."
            color={{
              background: "linear-gradient(0deg, #FFFFFF 10% ,#00FFEE 100%)",
            }}
            image={Noticeboard_image}
          />
          <Benefits_card
            title="Event Calendar"
            title_description="Stay updated on meetings, trips, and school activities in one place."
            color={{
              background: "linear-gradient(0deg, #FFFFFF 10% ,#00FFEE 100%)",
            }}
            image={Event_image}
          />
          <Benefits_card
            title="Daily Logs"
            title_description="Get a description of meals, naps, moods, and activities every day."
            color={{
              background: "linear-gradient(0deg, #FFFFFF 10% ,#00FFEE 100%)",
            }}
            image={Daily_image}
          />
          <Benefits_card
            title="Progress"
            title_description="Receive information on milestones, learning goals, and behavior updates with ease."
            color={{
              background: "linear-gradient(0deg, #FFFFFF 10% ,#00FFEE 100%)",
            }}
            image={Progress_image}
          />
        </div>
      </div>
    </>
  );
}

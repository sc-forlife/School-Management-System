import styles from "./Home.module.css";
import Sign_up from "../Sign Up/Sign_up";
import Login from "../Login/Login";
import Nav from "../NavBar/Navbar";
import Hero_section from "./Hero_section";
import { Link } from "react-router-dom";
import { useState } from "react";
import Benefits_section from "./Benefits_section";
import Benefits_card from "./Benefits_card";
import Info_display from "./Info_display";
import What_you_see from "./What_you_see";
import Why_choose from "./Why_choose";
import Pricing from "./Pricing";
import Faq_section from "./Faq_section";
import Footer from "./Footer";
import Get_connected from "./Get_connected";

export default function Main_home() {
  return (
    <>
      <div className={styles.home_background}>
        <Nav />
        <br></br>
        <Hero_section />
        <br></br>
        <Get_connected />
        <br></br>
        <br></br>
        <Benefits_section />
        <br></br>
        <br></br>
        <Why_choose />
        <br></br>
        <What_you_see />
        <br></br>
        <Pricing />
        <br></br>
        <br></br>
        <br></br>
        <Faq_section />
        <br></br>
        <br></br>
        <br></br>
        <Sign_up nav={false} />
        <Footer />
      </div>
    </>
  );
}

import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import Button from "../Buttons/Button";
import Button2 from "../Buttons/Button2";
import Logo from "../assets/KiddiLink.png";

function Nav() {
  return (
    <>
      <div className={styles.navbar}>
        <div>
          <img className={styles.logo} src={Logo} alt="App Logo" />
        </div>
        <div>
          <ul className={styles.link}>
            <li>
              <Link className={styles.line} to={"/"}>
                <Button nameBtn={"Home"} />
              </Link>
            </li>
            <li>
              <Link className={styles.line} to={"/about"}>
                <Button2 name={"About"} />
              </Link>
            </li>
            <li>
              <Link className={styles.line} to={"/Sign_up"}>
                <Button nameBtn={"Sign Up"} />
              </Link>
            </li>
            <li>
              <Link className={styles.line} to={"/Login"}>
                <Button2 name={"Login"} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Nav;

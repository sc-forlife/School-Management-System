import styles from "./Dashboard.module.css";
import Textbox from "../Textbox/Textbox";
import Select from "../Textbox/Select";
import Update_request from "./Update_request";

export default function Child_card({
  title = "Update Request",
  onSUBMIT = () => {},
}) {
  return (
    <>
      <form className={styles.Child_card_container} onSubmit={onSUBMIT}>
        <Textbox label="Child's Name" placeholder="Enter Name ..." />
        <Textbox
          label="Child's DOB"
          placeholder="Enter Name ..."
          value=""
          input={"date"}
        />
        <Select label="Child's Gender" placeholder="Select" />
        <Update_request
          title="Add Child"
          margin_bottom="8px"
          margin_top="8px"
        />
      </form>
    </>
  );
}

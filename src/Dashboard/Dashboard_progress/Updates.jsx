import style2 from "./Progress.module.css";

export default function Update({
  content = [
    ["Is Good at what he/she does"],
    ["The lord is taking good care of him day in and out"],
  ],
  title = "Current Level:",
  color = "#FF00FF",
}) {
  return (
    <div className={style2.update_container} style={{ "--cardColor": color }}>
      <div className={style2.update_header}>
        <h5>{title}</h5>
      </div>

      <ul className={style2.update_list}>
        {content.map((e, i) => (
          <li key={i}>
            <span className={style2.bullet}></span>
            {e[0]}
          </li>
        ))}
      </ul>
    </div>
  );
}

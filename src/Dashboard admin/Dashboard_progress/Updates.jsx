import style2 from "./Manage.module.css";

export default function Update({
  content = [
    ["Is Good at what he/she does"],
    ["The lord is taking good care of him day in and out"],
  ],
  title = "Current Level:",
  color = "#FF00FF",
}) {
  return (
    <>
      <div
        className={style2.update_container}
        style={{ backgroundColor: `${color}` }}
      >
        <h5>{title}</h5>
        <ul>
          {content.map((e, i) => (
            <li key={i}>{e[0]}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

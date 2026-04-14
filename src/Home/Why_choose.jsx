import Info_display from "./Info_display";

export default function Why_choose() {
  let title_content = [
    ["Designed for Windhoek kindergartens and pre-schools."],
    ["Easy to use, even for non-tech-savvy teachers."],
    ["Keeps you in sync , with your little one at school."],
    ["No subscription costs."],
  ];

  return (
    <>
      <Info_display title="Why Choose KiddiLink" content={title_content} />
    </>
  );
}

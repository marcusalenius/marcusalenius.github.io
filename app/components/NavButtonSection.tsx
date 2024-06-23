import Card from "./Card";

function NavButtonSection({ name }: { name: string }) {
  const nameLowerDashed = name.toLowerCase().replace(" ", "-");

  return (
    <Card
      className="navbutton card-region-child"
      id={`navbutton-${nameLowerDashed}`}
      tabIndex={0}
      individualEffect={false}
      onClick={() => {
        const section = document.getElementById(nameLowerDashed);
        if (!section) {
          return;
        }
        window.scrollTo({
          top: section.offsetTop - 100,
          behavior: "smooth",
        });
      }}
    >
      <div className="button-text">{name}</div>
    </Card>
  );
}

export default NavButtonSection;

import Card from "./Card";

function NavButtonSection({ name }: { name: string }) {
  return (
    <Card
      className="navbutton card-region-child"
      id={`navbutton-${name.toLowerCase()}`}
      tabIndex={0}
      individualEffect={false}
    >
      <div className="button-text">{name}</div>
    </Card>
  );
}

export default NavButtonSection;

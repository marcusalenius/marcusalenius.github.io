import CardRegion from "./CardRegion";
import Card from "./Card";
import NavButtonAppearance from "./NavButtonAppearance";
import AppearanceDropDown from "./NavAppearanceDropDown";

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

function NavRight() {
  return (
    <CardRegion id="nav-right">
      <NavButtonSection name="Projects" />
      <NavButtonSection name="Work" />
      <NavButtonSection name="Contact" />
      <NavButtonAppearance />
      <AppearanceDropDown />
    </CardRegion>
  );
}

export default NavRight;

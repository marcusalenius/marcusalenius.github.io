import CardRegion from "./CardRegion";
import NavButtonAppearance from "./NavButtonAppearance";
import AppearanceDropDown from "./NavAppearanceDropDown";

function NavButtonSection({ name }: { name: string }) {
  return (
    <div
      className="navbutton"
      id={`navbutton-${name.toLowerCase()}`}
      tabIndex={0}
    >
      <div className="card-border"></div>
      <div className="button-text">{name}</div>
    </div>
  );
}

function NavRight() {
  return (
    <CardRegion id="nav-right" childCardsClassName="navbutton">
      <NavButtonSection name="Projects" />
      <NavButtonSection name="Work" />
      <NavButtonSection name="Contact" />
      <NavButtonAppearance />
      <AppearanceDropDown />
    </CardRegion>
  );
}

export default NavRight;

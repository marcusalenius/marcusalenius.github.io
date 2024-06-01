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
    <div id="nav-right">
      <NavButtonSection name="Projects" />
      <NavButtonSection name="Work" />
      <NavButtonSection name="Contact" />
      <NavButtonAppearance />
      <AppearanceDropDown />
    </div>
  );
}

export default NavRight;

function NavMenuItem({
  option,
  isDefault = false,
}: {
  option: string;
  isDefault?: boolean;
}) {
  const optionLowerDashed = option.toLowerCase().replace(" ", "-");

  return (
    <div
      className={`navmenu-item ${isDefault ? "selected" : "hidden"}`}
      id={`navmenu-item-${optionLowerDashed}`}
      tabIndex={0}
    >
      <div className="button-text">{option}</div>
    </div>
  );
}

function NavMobile() {
  return (
    <div className="hidden" id="navmenu-mobile">
      <div className="card-border"></div>
      <NavMenuItem option="About Me" isDefault={true} />
      <NavMenuItem option="Projects" />
      <NavMenuItem option="Work" />
      <NavMenuItem option="Contact" />
    </div>
  );
}

export default NavMobile;

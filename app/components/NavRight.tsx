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

function NavButtonAppearance() {
  return (
    <div
      className="navbutton drop-down-hidden"
      id="navbutton-appearance"
      tabIndex={0}
    >
      <div className="card-border"></div>
      <img
        src="icons/appearance-icon-light-mode.svg"
        alt=""
        draggable="false"
        className="appearance-icon"
        id="appearance-icon-light-mode"
      />
      <img
        src="icons/appearance-icon-dark-mode.svg"
        alt=""
        draggable="false"
        className="appearance-icon"
        id="appearance-icon-dark-mode"
      />
      <img
        src="icons/appearance-cross-icon-light-mode.svg"
        alt=""
        draggable="false"
        className="appearance-cross-icon"
        id="appearance-cross-icon-light-mode"
      />
      <img
        src="icons/appearance-cross-icon-dark-mode.svg"
        alt=""
        draggable="false"
        className="appearance-cross-icon"
        id="appearance-cross-icon-dark-mode"
      />
    </div>
  );
}

function AppearanceDropDownItem({
  option,
  isDefault = false,
}: {
  option: string;
  isDefault?: boolean;
}) {
  const optionLower = option.toLowerCase();

  return (
    <div
      className={`appearance-drop-down-item ${isDefault ? "selected" : ""}`}
      id={`appearance-drop-down-item-${optionLower}`}
      tabIndex={0}
    >
      <img
        src={`icons/appearance-drop-down-icon-${optionLower}-light-mode.svg`}
        alt=""
        draggable="false"
        className="appearance-drop-down-icon appearance-drop-down-icon-light-mode"
      />
      <img
        src={`icons/appearance-drop-down-icon-${optionLower}-dark-mode.png`}
        alt=""
        draggable="false"
        className="appearance-drop-down-icon appearance-drop-down-icon-dark-mode"
      />
      <div className="button-text">{option}</div>
    </div>
  );
}

function AppearanceDropDown() {
  return (
    <div className="hidden" id="appearance-drop-down">
      <div className="card-border"></div>
      <AppearanceDropDownItem option="System" isDefault={true} />
      <AppearanceDropDownItem option="Light" />
      <AppearanceDropDownItem option="Dark" />
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

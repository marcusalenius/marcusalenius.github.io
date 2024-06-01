import { useContext } from "react";
import { AppearanceContext } from "./View";
import { toggleAppearanceDropdown } from "./utils";

function NavButtonAppearance() {
  const appearanceContextRef = useContext(AppearanceContext);

  return (
    <div
      className="navbutton drop-down-hidden"
      id="navbutton-appearance"
      tabIndex={0}
      onClick={() => toggleAppearanceDropdown(appearanceContextRef)}
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

export default NavButtonAppearance;

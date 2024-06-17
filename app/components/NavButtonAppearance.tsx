import "./NavButtonAppearance.css";

import { useContext } from "react";
import ThemedImage from "./ThemedImage";
import { AppearanceContext } from "./View";
import { toggleAppearanceDropdown } from "./utils";

function NavButtonAppearance() {
  const appearanceContextRef = useContext(AppearanceContext);

  return (
    <div
      className="navbutton card-region-child drop-down-hidden"
      id="navbutton-appearance"
      tabIndex={0}
      onClick={() => toggleAppearanceDropdown(appearanceContextRef)}
    >
      <div className="card-border"></div>
      <ThemedImage
        lightSrc="icons/appearance-icon-light-mode.svg"
        darkSrc="icons/appearance-icon-dark-mode.svg"
        lightId="appearance-icon-light-mode"
        darkId="appearance-icon-dark-mode"
        className="appearance-icon"
        alt=""
        draggable={false}
      />
      <ThemedImage
        lightSrc="icons/appearance-cross-icon-light-mode.svg"
        darkSrc="icons/appearance-cross-icon-dark-mode.svg"
        className="appearance-cross-icon"
        alt=""
        draggable={false}
      />
    </div>
  );
}

export default NavButtonAppearance;

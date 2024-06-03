import { useRef, useContext } from "react";
import { AppearanceContext } from "./View";
import {
  toggleAppearanceDropdown,
  setSystemAppearance,
  setLightMode,
  setDarkMode,
} from "./utils";

function AppearanceDropDownItem({
  option,
  isDefault = false,
}: {
  option: string;
  isDefault?: boolean;
}) {
  const preferredAppearance =
    localStorage.getItem("preferredAppearance") || "system";

  // if (preferredAppearance.current === "light") {
  //   setLightMode();
  // } else if (preferredAppearance.current === "dark") {
  //   setDarkMode();
  // } else {
  //   setSystemAppearance();
  // }

  // Add event listener to respond to system appearance changes
  // window
  //   .matchMedia("(prefers-color-scheme: dark)")
  //   .addEventListener("change", (event) => {
  //     if (preferredAppearance.current === "system") {
  //       const body = document.body;
  //       // enable dark mode
  //       if (event.matches) {
  //         body.classList.remove("light-mode");
  //         body.classList.add("dark-mode");
  //       }
  //       // enable dark mode
  //       else {
  //         body.classList.remove("dark-mode");
  //         body.classList.add("light-mode");
  //       }
  //     }
  //   });

  const appearanceContextRef = useContext(AppearanceContext);
  const optionLower = option.toLowerCase();

  const handleAppearanceChange = () => {
    const preferredAppearance =
      localStorage.getItem("preferredAppearance") || "system";
    if (preferredAppearance === optionLower) return;
    localStorage.setItem("preferredAppearance", optionLower);
    if (optionLower === "system") {
      setSystemAppearance();
    } else if (optionLower === "light") {
      setLightMode();
    } else {
      setDarkMode();
    }
    toggleAppearanceDropdown(appearanceContextRef);
  };

  return (
    <div
      className={`appearance-drop-down-item ${isDefault ? "selected" : ""}`}
      id={`appearance-drop-down-item-${optionLower}`}
      tabIndex={0}
      onClick={handleAppearanceChange}
    >
      <img
        src={`icons/appearance-drop-down-icon-${optionLower}-light-mode.svg`}
        alt=""
        draggable="false"
        className="appearance-drop-down-icon appearance-drop-down-icon-light-mode"
      />
      <img
        src={
          optionLower === "system"
            ? `icons/appearance-drop-down-icon-${optionLower}-dark-mode.png`
            : `icons/appearance-drop-down-icon-${optionLower}-dark-mode.svg`
        }
        alt=""
        draggable="false"
        className="appearance-drop-down-icon appearance-drop-down-icon-dark-mode"
      />
      <div className="button-text">{option}</div>
    </div>
  );
}

export default AppearanceDropDownItem;

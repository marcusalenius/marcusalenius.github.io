import { useRef, useContext } from "react";
import { useTheme } from "next-themes";
import ThemedImage from "./ThemedImage";
import { AppearanceContext } from "./View";
import { toggleAppearanceDropdown } from "./utils";

function AppearanceDropDownItem({ option }: { option: string }) {
  // const preferredAppearance =
  //   localStorage.getItem("preferredAppearance") || "system";

  // if (preferredAppearance === "light") {
  //   setLightMode();
  // } else if (preferredAppearance === "dark") {
  //   setDarkMode();
  // } else {
  //   setSystemAppearance();
  // }

  // Add event listener to respond to system appearance changes
  // window
  //   .matchMedia("(prefers-color-scheme: dark)")
  //   .addEventListener("change", (event) => {
  //     if (preferredAppearance === "system") {
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

  const { theme, setTheme } = useTheme();

  const handleAppearanceChange = (optionLower: string) => {
    console.log("current theme:", theme);
    // const preferredAppearance =
    //   localStorage.getItem("preferredAppearance") || "system";
    // if (preferredAppearance === optionLower) return;
    // localStorage.setItem("preferredAppearance", optionLower);
    if (optionLower === "system") {
      setTheme("system");
    } else if (optionLower === "light") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
    toggleAppearanceDropdown(appearanceContextRef);
  };

  return (
    <div
      className={`appearance-drop-down-item ${
        theme === optionLower ? "selected" : ""
      }`}
      id={`appearance-drop-down-item-${optionLower}`}
      tabIndex={0}
      onClick={() => handleAppearanceChange(optionLower)}
    >
      <ThemedImage
        lightSrc={`/icons/appearance-drop-down-icon-${optionLower}-light-mode.svg`}
        darkSrc={`icons/appearance-drop-down-icon-${optionLower}-dark-mode.svg`}
        alt=""
        draggable={false}
        className="appearance-drop-down-icon"
        lightId={`appearance-drop-down-icon-${optionLower}-light-mode`}
        darkId={`appearance-drop-down-icon-${optionLower}-dark-mode`}
      />
      <div className="button-text">{option}</div>
    </div>
  );
}

export default AppearanceDropDownItem;

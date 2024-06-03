import { useContext } from "react";
import { useTheme } from "next-themes";
import ThemedImage from "./ThemedImage";
import { AppearanceContext } from "./View";
import { toggleAppearanceDropdown } from "./utils";

function AppearanceDropDownItem({ option }: { option: string }) {
  const appearanceContextRef = useContext(AppearanceContext);
  const optionLower = option.toLowerCase();
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={`appearance-drop-down-item ${
        theme === optionLower ? "selected" : ""
      }`}
      id={`appearance-drop-down-item-${optionLower}`}
      tabIndex={0}
      onClick={() => {
        setTheme(optionLower);
        toggleAppearanceDropdown(appearanceContextRef);
      }}
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

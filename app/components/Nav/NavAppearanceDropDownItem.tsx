"use client";

import { useTheme } from "next-themes";

import ThemedImage from "../Media/ThemedImage";

type Props = {
  option: string;
  toggleAppearanceDropdown: () => void;
};

function AppearanceDropDownItem({ option, toggleAppearanceDropdown }: Props) {
  const optionLower = option.toLowerCase();
  const { theme, setTheme } = useTheme();
  console.log("theme:", theme, "optionLower:", optionLower);

  return (
    <div
      className={`appearance-drop-down-item ${
        theme === optionLower ? "selected" : ""
      }`}
      id={`appearance-drop-down-item-${optionLower}`}
      tabIndex={0}
      onClick={() => {
        setTheme(optionLower);
        toggleAppearanceDropdown();
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

import "./NavAppearanceDropDown.css";

import { useEffect } from "react";

import Card from "../Card/Card";
import AppearanceDropDownItem from "./NavAppearanceDropDownItem";

type Props = {
  yUnhideAppearanceDropdown: number;
  toggleAppearanceDropdown: () => void;
};

function AppearanceDropDown({
  yUnhideAppearanceDropdown,
  toggleAppearanceDropdown,
}: Props) {
  // For some reason, the following line is necessary to prevent
  // the client and server from getting out of sync.
  window.addEventListener("click", () => {});

  // Hook for scroll event to auto-hide appearance dropdown
  useEffect(function mount() {
    function onScroll() {
      const appearanceDropdown = document.getElementById(
        "appearance-drop-down"
      );
      const navbuttonAppearance = document.getElementById(
        "navbutton-appearance"
      );
      if (!appearanceDropdown || !navbuttonAppearance) {
        return;
      }
      if (
        yUnhideAppearanceDropdown !== -1 &&
        Math.abs(yUnhideAppearanceDropdown - window.scrollY) >= 200
      ) {
        // hide
        appearanceDropdown.classList.add("hidden");
        navbuttonAppearance.classList.remove("drop-down-visible");
        navbuttonAppearance.classList.add("drop-down-hidden");
      }
    }

    window.addEventListener("scroll", onScroll);

    return function unMount() {
      window.removeEventListener("scroll", onScroll);
    };
  });

  // Hook for click outside to hide appearance dropdown
  useEffect(function mount() {
    function onClick(event: MouseEvent) {
      const appearanceDropdown = document.getElementById(
        "appearance-drop-down"
      );
      const navbuttonAppearance = document.getElementById(
        "navbutton-appearance"
      );
      if (!appearanceDropdown || !navbuttonAppearance || !event.target) {
        return;
      }
      if (!appearanceDropdown.classList.contains("hidden")) {
        if (
          event.target != appearanceDropdown &&
          event.target != navbuttonAppearance &&
          (event.target as HTMLElement).parentNode != navbuttonAppearance
        ) {
          // hide
          appearanceDropdown.classList.add("hidden");
          navbuttonAppearance.classList.remove("drop-down-visible");
          navbuttonAppearance.classList.add("drop-down-hidden");
        }
      }
    }

    document.addEventListener("click", onClick);

    return function unMount() {
      document.removeEventListener("click", onClick);
    };
  });

  return (
    <Card
      className="hidden card-region-child"
      id="appearance-drop-down"
      individualEffect={false}
    >
      <AppearanceDropDownItem
        option="System"
        toggleAppearanceDropdown={toggleAppearanceDropdown}
      />
      <AppearanceDropDownItem
        option="Light"
        toggleAppearanceDropdown={toggleAppearanceDropdown}
      />
      <AppearanceDropDownItem
        option="Dark"
        toggleAppearanceDropdown={toggleAppearanceDropdown}
      />
    </Card>
  );
}

export default AppearanceDropDown;

"use client";

import { useState } from "react";
import NavButtonAppearance from "./NavButtonAppearance";
import AppearanceDropDown from "./NavAppearanceDropDown";

function AppearanceComponents() {
  const [yUnhideAppearanceDropdown, setYUnhideAppearanceDropdown] =
    useState(-1); // -1 means not set

  const toggleAppearanceDropdown = () => {
    const appearanceDropdown = document.getElementById("appearance-drop-down");
    const navbuttonAppearance = document.getElementById("navbutton-appearance");
    if (!appearanceDropdown || !navbuttonAppearance) {
      return;
    }
    // unhide appearance dropdown
    if (appearanceDropdown.classList.contains("hidden")) {
      // set yUnhideAppearanceDropdown
      setYUnhideAppearanceDropdown(window.scrollY);
      appearanceDropdown.classList.remove("hidden");
      navbuttonAppearance.classList.remove("drop-down-hidden");
      navbuttonAppearance.classList.add("drop-down-visible");
    }
    // hide
    else {
      // unset yUnhideAppearanceDropdown
      setYUnhideAppearanceDropdown(-1);
      appearanceDropdown.classList.add("hidden");
      navbuttonAppearance.classList.remove("drop-down-visible");
      navbuttonAppearance.classList.add("drop-down-hidden");
    }
  };

  return (
    <>
      <NavButtonAppearance
        toggleAppearanceDropdown={toggleAppearanceDropdown}
      />
      <AppearanceDropDown
        yUnhideAppearanceDropdown={yUnhideAppearanceDropdown}
        toggleAppearanceDropdown={toggleAppearanceDropdown}
      />
    </>
  );
}

export default AppearanceComponents;

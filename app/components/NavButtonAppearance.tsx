"use client";

import { useRef } from "react";

function NavButtonAppearance() {
  const isAppearanceScrollListenerRunning = useRef(false);
  const yUnhideAppearanceDropdown = useRef(0);

  // Toggles the appearance dropdown and adds scroll listener when unhidden
  const toggleAppearanceDropdown = () => {
    const appearanceDropdown = document.getElementById("appearance-drop-down");
    const navbuttonAppearance = document.getElementById("navbutton-appearance");
    if (!appearanceDropdown || !navbuttonAppearance) {
      return;
    }
    // cancel scroll listener if it is running
    if (isAppearanceScrollListenerRunning) {
      window.removeEventListener("scroll", appearanceScrollListener);
      isAppearanceScrollListenerRunning.current = false;
    }
    // unhide appearance dropdown
    if (appearanceDropdown.classList.contains("hidden")) {
      appearanceDropdown.classList.remove("hidden");
      navbuttonAppearance.classList.remove("drop-down-hidden");
      navbuttonAppearance.classList.add("drop-down-visible");
      // auto hide on scroll of more tha 200px
      yUnhideAppearanceDropdown.current = window.scrollY;
      window.addEventListener("scroll", appearanceScrollListener);
      isAppearanceScrollListenerRunning.current = true;
    }
    // hide
    else {
      appearanceDropdown.classList.add("hidden");
      navbuttonAppearance.classList.remove("drop-down-visible");
      navbuttonAppearance.classList.add("drop-down-hidden");
    }
  };

  // Closes the appearance dropdown if user scrolls more than 200px
  const appearanceScrollListener = () => {
    const appearanceDropdown = document.getElementById("appearance-drop-down");
    const navbuttonAppearance = document.getElementById("navbutton-appearance");
    if (!appearanceDropdown || !navbuttonAppearance) {
      return;
    }
    if (Math.abs(yUnhideAppearanceDropdown.current - window.scrollY) >= 200) {
      // hide
      appearanceDropdown.classList.add("hidden");
      navbuttonAppearance.classList.remove("drop-down-visible");
      navbuttonAppearance.classList.add("drop-down-hidden");
    }
  };

  return (
    <div
      className="navbutton drop-down-hidden"
      id="navbutton-appearance"
      tabIndex={0}
      onClick={toggleAppearanceDropdown}
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

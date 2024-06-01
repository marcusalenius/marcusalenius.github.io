// Toggles the appearance dropdown and adds scroll listener when unhidden
export function toggleAppearanceDropdown(appearanceContextRef: any) {
  const appearanceDropdown = document.getElementById("appearance-drop-down");
  const navbuttonAppearance = document.getElementById("navbutton-appearance");
  if (!appearanceDropdown || !navbuttonAppearance) {
    return;
  }
  // cancel scroll listener if it is running
  if (appearanceContextRef.current.isAppearanceScrollListenerRunning) {
    window.removeEventListener("scroll", () =>
      appearanceScrollListener(appearanceContextRef)
    );
    appearanceContextRef.current.isAppearanceScrollListenerRunning = false;
  }
  // unhide appearance dropdown
  if (appearanceDropdown.classList.contains("hidden")) {
    appearanceDropdown.classList.remove("hidden");
    navbuttonAppearance.classList.remove("drop-down-hidden");
    navbuttonAppearance.classList.add("drop-down-visible");
    // auto hide on scroll of more tha 200px
    appearanceContextRef.current.yUnhideAppearanceDropdown = window.scrollY;
    window.addEventListener("scroll", () =>
      appearanceScrollListener(appearanceContextRef)
    );
    appearanceContextRef.current.isAppearanceScrollListenerRunning = true;
  }
  // hide
  else {
    appearanceDropdown.classList.add("hidden");
    navbuttonAppearance.classList.remove("drop-down-visible");
    navbuttonAppearance.classList.add("drop-down-hidden");
  }
}

// Closes the appearance dropdown if user scrolls more than 200px
export function appearanceScrollListener(appearanceContextRef: any) {
  const appearanceDropdown = document.getElementById("appearance-drop-down");
  const navbuttonAppearance = document.getElementById("navbutton-appearance");
  if (!appearanceDropdown || !navbuttonAppearance) {
    return;
  }
  console.log(appearanceContextRef.current);
  if (
    Math.abs(
      appearanceContextRef.current.yUnhideAppearanceDropdown - window.scrollY
    ) >= 200
  ) {
    // hide
    appearanceDropdown.classList.add("hidden");
    navbuttonAppearance.classList.remove("drop-down-visible");
    navbuttonAppearance.classList.add("drop-down-hidden");
  }
}

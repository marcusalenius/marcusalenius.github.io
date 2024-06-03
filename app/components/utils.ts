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

// Function that sets the appearance to system
export function setSystemAppearance() {
  console.log("setSystemAppearance");
  const body = document.body;
  const dropDownItems = document.querySelectorAll(".appearance-drop-down-item");
  const dropDownItemSystem = document.getElementById(
    "appearance-drop-down-item-system"
  );
  if (!body || !dropDownItemSystem || !dropDownItems) {
    return;
  }
  // enable system appearance
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
  }
  // make the system item selected
  dropDownItems.forEach((dropDownItem) => {
    if (dropDownItem.classList.contains("selected")) {
      dropDownItem.classList.remove("selected");
    }
  });
  dropDownItemSystem.classList.add("selected");
}

// Function that sets the appearance to light
export function setLightMode() {
  console.log("setLightMode");
  const body = document.body;
  const dropDownItems = document.querySelectorAll(".appearance-drop-down-item");
  const dropDownItemLight = document.getElementById(
    "appearance-drop-down-item-light"
  );
  if (!body || !dropDownItemLight || !dropDownItems) {
    return;
  }
  // enable light mode
  body.classList.remove("dark-mode");
  body.classList.add("light-mode");
  // make the light item selected
  dropDownItems.forEach((dropDownItem) => {
    if (dropDownItem.classList.contains("selected")) {
      dropDownItem.classList.remove("selected");
    }
  });
  dropDownItemLight.classList.add("selected");
}

// Function that sets the appearance to dark
export function setDarkMode() {
  console.log("setDarkMode");
  const body = document.body;
  const dropDownItems = document.querySelectorAll(".appearance-drop-down-item");
  const dropDownItemDark = document.getElementById(
    "appearance-drop-down-item-dark"
  );
  if (!body || !dropDownItemDark || !dropDownItems) {
    return;
  }
  // enable dark mode
  body.classList.remove("light-mode");
  body.classList.add("dark-mode");
  // make this item selected
  dropDownItems.forEach((dropDownItem) => {
    if (dropDownItem.classList.contains("selected")) {
      dropDownItem.classList.remove("selected");
    }
  });
  dropDownItemDark.classList.add("selected");
}

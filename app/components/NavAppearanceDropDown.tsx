import AppearanceDropDownItem from "./NavAppearanceDropDownItem";

function AppearanceDropDown() {
  // Close the appearance dropdown if click outside
  window.addEventListener("click", (event) => {
    const appearanceDropdown = document.getElementById("appearance-drop-down");
    const navbuttonAppearance = document.getElementById("navbutton-appearance");
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
  });

  return (
    <div className="hidden" id="appearance-drop-down">
      <div className="card-border"></div>
      <AppearanceDropDownItem option="System" />
      <AppearanceDropDownItem option="Light" />
      <AppearanceDropDownItem option="Dark" />
    </div>
  );
}

export default AppearanceDropDown;

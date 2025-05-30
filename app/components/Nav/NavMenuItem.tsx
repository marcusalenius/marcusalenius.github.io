type Props = {
  name: string;
  hideNavmenu: () => void;
  unhideNavmenu: () => void;
  isDefault?: boolean;
};

export default function NavMenuItem({
  name,
  hideNavmenu,
  unhideNavmenu,
  isDefault = false,
}: Props) {
  const nameLowerDashed = name.toLowerCase().replace(" ", "-");

  function onClick(nameLowerDashed: string) {
    const sectionName =
      nameLowerDashed === "about-me" ? "hero" : nameLowerDashed;
    const navmenu = document.getElementById("navmenu-mobile");
    if (!navmenu) {
      return;
    }
    if (navmenu.classList.contains("hidden")) {
      unhideNavmenu();
    } else {
      if (!document.getElementById(sectionName)) {
        return;
      }
      const section = document.getElementById(sectionName) as HTMLElement;
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
      hideNavmenu();
    }
  }

  return (
    <div
      className={`navmenu-item ${isDefault ? "selected" : "hidden"}`}
      id={`navmenu-item-${nameLowerDashed}`}
      tabIndex={0}
      onClick={() => onClick(nameLowerDashed)}
    >
      <div className="button-text">{name}</div>
    </div>
  );
}

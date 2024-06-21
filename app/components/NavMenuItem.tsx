type Props = {
  name: string;
  isDefault?: boolean;
};

function NavMenuItem({ name, isDefault = false }: Props) {
  const nameLowerDashed = name.toLowerCase().replace(" ", "-");

  return (
    <div
      className={`navmenu-item ${isDefault ? "selected" : "hidden"}`}
      id={`navmenu-item-${nameLowerDashed}`}
      tabIndex={0}
    >
      <div className="button-text">{name}</div>
    </div>
  );
}

export default NavMenuItem;

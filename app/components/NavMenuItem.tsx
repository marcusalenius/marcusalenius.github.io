type Props = {
  name: string;
  isDefault?: boolean;
};

function NavMenuItem({ name, isDefault = false }: Props) {
  const optionLowerDashed = name.toLowerCase().replace(" ", "-");

  return (
    <div
      className={`navmenu-item ${isDefault ? "selected" : "hidden"}`}
      id={`navmenu-item-${optionLowerDashed}`}
      tabIndex={0}
    >
      <div className="button-text">{name}</div>
    </div>
  );
}

export default NavMenuItem;

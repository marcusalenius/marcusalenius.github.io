import Card from "./Card";
import NavMenuItem from "./NavMenuItem";

type Props = {
  data: { [key: string]: any };
};

function NavMobile({ data }: Props) {
  return (
    <Card className="hidden" id="navmenu-mobile">
      <NavMenuItem name="About Me" isDefault={true} />
      {Object.keys(data.sections).map((sectionName: string) => (
        <NavMenuItem name={sectionName} />
      ))}
    </Card>
  );
}

export default NavMobile;

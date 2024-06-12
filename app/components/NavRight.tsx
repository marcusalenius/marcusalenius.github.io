import CardRegion from "./CardRegion";
import NavButtonSection from "./NavButtonSection";
import NavButtonAppearance from "./NavButtonAppearance";
import AppearanceDropDown from "./NavAppearanceDropDown";

type Props = {
  data: { [key: string]: any };
};

function NavRight({ data }: Props) {
  return (
    <CardRegion id="nav-right">
      {Object.keys(data.sections).map((sectionName: string) => (
        <NavButtonSection name={sectionName} />
      ))}
      <NavButtonAppearance />
      <AppearanceDropDown />
    </CardRegion>
  );
}

export default NavRight;

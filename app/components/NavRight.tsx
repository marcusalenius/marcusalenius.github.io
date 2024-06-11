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
      {data.sections.map((section: string) => (
        <NavButtonSection name={section} />
      ))}
      <NavButtonAppearance />
      <AppearanceDropDown />
    </CardRegion>
  );
}

export default NavRight;

import CardRegion from "./CardRegion";
import NavButtonSection from "./NavButtonSection";
import AppearanceComponents from "./NavAppearanceComponents";

type Props = {
  data: { [key: string]: any };
};

function NavRight({ data }: Props) {
  return (
    <CardRegion id="nav-right">
      {Object.keys(data.sections).map((sectionName: string) => (
        <NavButtonSection
          name={sectionName}
          key={data.sections[sectionName].id}
        />
      ))}
      <AppearanceComponents />
    </CardRegion>
  );
}

export default NavRight;

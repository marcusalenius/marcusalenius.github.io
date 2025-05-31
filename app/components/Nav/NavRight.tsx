import CardRegion from "../Card/CardRegion";
import NavButtonSection from "./NavButtonSection";
import AppearanceComponents from "./NavAppearanceComponents";

type Props = {
  data: { [key: string]: any };
  homePage: boolean;
};

export default function NavRight({ data, homePage }: Props) {
  if (homePage) {
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
  } else {
    return (
      <CardRegion id="nav-right">
        <AppearanceComponents />
      </CardRegion>
    );
  }
}

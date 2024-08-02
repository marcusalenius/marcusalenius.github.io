import Hero from "../Hero/Hero";
import Section from "./Section";

type Props = {
  data: { [key: string]: any };
};

function HomeContainer({ data }: Props) {
  return (
    <div id="container">
      <Hero data={data} />
      {Object.keys(data.sections).map((sectionName: string) => (
        <Section
          sectionData={data.sections[sectionName]}
          name={sectionName}
          key={data.sections[sectionName].id}
        />
      ))}
    </div>
  );
}

export default HomeContainer;

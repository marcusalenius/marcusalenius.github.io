import Hero from "../Hero/Hero";
import Section from "./Section";

import ScrollView from "../Modal/Modal";

type Props = {
  data: { [key: string]: any };
};

function HomeContainer({ data }: Props) {
  return (
    <div id="container">
      <Hero data={data} />
      {Object.keys(data.sections).map((sectionName: string) => (
        <Section sectionData={data.sections[sectionName]} name={sectionName} />
      ))}
      <ScrollView />
    </div>
  );
}

export default HomeContainer;

import CardRegion from "./CardRegion";
import ActordentifyCard from "./ActordentifyCard";

type Props = {
  sectionData: { [key: string]: any };
  name: string;
};

function Section({ sectionData, name }: Props) {
  console.log(sectionData.cards.Actordentify);

  const cardMap: { [key: string]: any } = {
    Actordentify: ActordentifyCard,
  };

  return (
    <div id={name.toLowerCase()}>
      <h2>{name}</h2>
      <CardRegion>
        {sectionData.cards.map((cardData: { [key: string]: any }) => {
          const ThisCard = cardMap[cardData.title];
          return <ThisCard cardData={cardData} />;
        })}
      </CardRegion>
    </div>
  );
}

export default Section;

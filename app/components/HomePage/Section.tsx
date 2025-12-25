import CardRegion from "../Card/CardRegion";
import NeedleCard from "../CustomCards/NeedleCard";
import SpeechTransformerCard from "../CustomCards/SpeechTransformerCard";
import ActordentifyCard from "../CustomCards/ActordentifyCard";
import AttentionCard from "../CustomCards/AttentionCard";
import CategoryCard from "../CategoryCard/CategoryCard";
import AdditionalCard from "../AdditionalCard/AdditionalCard";
import PublicationCard from "../PublicationCard/PublicationCard";
import ExperienceCard from "../ExperienceCard/ExperienceCard";

type Props = {
  sectionData: { [key: string]: any };
  name: string;
};

export default function Section({ sectionData, name }: Props) {
  const customCardMap: { [key: string]: any } = {
    "Attention From Scratch": AttentionCard,
    Needle: NeedleCard,
    "Speech Transformer": SpeechTransformerCard,
    Actordentify: ActordentifyCard,
  };

  return (
    <div id={name.toLowerCase()}>
      <h2>{name}</h2>
      <CardRegion className="card-layout">
        {sectionData.cards.map((cardData: { [key: string]: any }) => {
          if (name === "Projects" || name === "Explainers") {
            const ThisCard = customCardMap[cardData.title];
            return <ThisCard cardData={cardData} key={cardData.id} />;
          } else if (name === "Publications") {
            return <PublicationCard cardData={cardData} key={cardData.id} />;
          } else if (name === "Experience") {
            return <ExperienceCard cardData={cardData} key={cardData.id} />;
          }
        })}
        {sectionData.additional ? (
          <AdditionalCard additionalData={sectionData.additional} key={0} />
        ) : null}
      </CardRegion>
    </div>
  );
}

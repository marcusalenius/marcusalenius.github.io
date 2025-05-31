import CardRegion from "../Card/CardRegion";
import ActordentifyCard from "../CustomCards/ActordentifyCard";
import CategoryCard from "../CategoryCard/CategoryCard";
import PublicationCard from "../PublicationCard/PublicationCard";
import ExperienceCard from "../ExperienceCard/ExperienceCard";

type Props = {
  sectionData: { [key: string]: any };
  name: string;
};

export default function Section({ sectionData, name }: Props) {
  const customCardMap: { [key: string]: any } = {
    Actordentify: ActordentifyCard,
  };

  return (
    <div id={name.toLowerCase()}>
      <h2>{name}</h2>
      <CardRegion className="card-layout">
        {sectionData.cards.map((cardData: { [key: string]: any }) => {
          if (name === "Projects") {
            const ThisCard = customCardMap[cardData.title];
            return <ThisCard cardData={cardData} key={cardData.id} />;
          } else if (name === "Publications") {
            return <PublicationCard cardData={cardData} key={cardData.id} />;
          } else if (name === "Experience") {
            return <ExperienceCard cardData={cardData} key={cardData.id} />;
          }
        })}
        {sectionData.categories
          ? sectionData.categories.map(
              (categoryData: { [key: string]: any }) => {
                return (
                  <CategoryCard
                    categoryData={categoryData}
                    key={categoryData.id}
                  />
                );
              }
            )
          : null}
      </CardRegion>
    </div>
  );
}

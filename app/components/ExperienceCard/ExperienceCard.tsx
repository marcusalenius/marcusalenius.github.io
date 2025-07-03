import "./ExperienceCard.css";

import Card from "../Card/Card";

type Props = {
  cardData: { [key: string]: any };
};

export default function ExperienceCard({ cardData }: Props) {
  return (
    <Card className="experience-card card card-region-child">
      <h4>{cardData.title}</h4>
      <p className="paragraph-small experience-organization">
        {cardData.organization}
      </p>
      <h5>
        {cardData.location}, {cardData.start} &ndash; {cardData.end}
      </h5>
      {cardData.description && (
        <p className="paragraph-small experience-description">
          {cardData.description}
        </p>
      )}
    </Card>
  );
}

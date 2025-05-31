import "./ExperienceCard.css";

import Card from "../Card/Card";

type Props = {
  cardData: { [key: string]: any };
};

export default function ExperienceCard({ cardData }: Props) {
  return (
    <Card className="experience-card card card-region-child">
      <h3>{cardData.title}</h3>
      <p className="paragraph-small">
        {cardData.organization}, {cardData.start} &ndash; {cardData.end},{" "}
        {cardData.location}
      </p>
    </Card>
  );
}

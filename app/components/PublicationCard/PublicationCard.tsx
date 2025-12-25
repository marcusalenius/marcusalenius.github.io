import "./PublicationCard.css";

import Card from "../Card/Card";
import ExternalLink from "../Links/ExternalLink";

type Props = {
  cardData: { [key: string]: any };
};

export default function PublicationCard({ cardData }: Props) {
  return (
    <Card
      className="publication-card card card-region-child"
      href={cardData.link}
    >
      <h4>{cardData.title}</h4>
      <p className="small-header">{cardData.authors}</p>
      <h5>
        {cardData.conference} ({cardData.year})
      </h5>
      <ExternalLink href="">
        <p className="card-link">View Paper</p>
      </ExternalLink>
    </Card>
  );
}

import "./PublicationCard.css";

import Card from "../Card/Card";
import ExternalLink from "../Links/ExternalLink";

type Props = {
  cardData: { [key: string]: any };
};

export default function PublicationCard({ cardData }: Props) {
  return (
    <Card className="publication-card card card-region-child">
      <p className="paragraph-small">{cardData.title}</p>
      <p className="small-header">{cardData.authors}</p>
      <p className="small-header">
        {cardData.conference} ({cardData.year})
      </p>
      <ExternalLink href={cardData.link}>
        <p className="card-link">View Paper</p>
      </ExternalLink>
    </Card>
  );
}

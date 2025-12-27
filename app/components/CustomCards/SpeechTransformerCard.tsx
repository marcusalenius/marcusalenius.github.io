"use client";

import "./SpeechTransformerCard.css";

import Card from "../Card/Card";
import InternalLink from "../Links/InternalLink";
import SpeechTransformerCardSvg from "./SpeechTransformerCardSvg";

type Props = {
  cardData: { [key: string]: any };
};

export default function SpeechTransformerCard({ cardData }: Props) {
  return (
    <Card
      className="card card-region-child"
      id="speech-transformer-card"
      individualEffect={false}
      href={cardData.link}
    >
      <div className="card-images">
        <h3>{cardData.title}</h3>
        <p className="paragraph-small">{cardData.subtitle}</p>
        {/* href empty so that InternalLink gets rendered as a div */}
        <InternalLink href="">
          <p className="card-link">Learn more</p>
        </InternalLink>
        <SpeechTransformerCardSvg />
      </div>
    </Card>
  );
}

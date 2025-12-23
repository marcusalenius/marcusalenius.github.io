"use client";

import "./NeedleCard.css";

import Card from "../Card/Card";
import InternalLink from "../Links/InternalLink";
import NeedleCardSvg from "./NeedleCardSvg";

type Props = {
  cardData: { [key: string]: any };
};

export default function NeedleCard({ cardData }: Props) {
  return (
    <Card
      className="card card-region-child"
      id="needle-card"
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
        <NeedleCardSvg />
      </div>
    </Card>
  );
}

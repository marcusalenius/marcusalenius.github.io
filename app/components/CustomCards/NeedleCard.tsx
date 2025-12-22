"use client";

import "./NeedleCard.css";

import dynamic from "next/dynamic";
import Image from "next/image";

import Card from "../Card/Card";
import InternalLink from "../Links/InternalLink";
import NeedleCardSvg from "./NeedleCardSvg";

const Video = dynamic(() => import("../Media/Video"), {
  ssr: false,
});

type Props = {
  cardData: { [key: string]: any };
};

export default function NeedleCard({ cardData }: Props) {
  function formatSubtitle(subtitle?: string): string {
    if (!subtitle) return "";
    const normalized = subtitle.toLowerCase().replace(/\bai\b/g, "AI");
    return normalized.charAt(0).toUpperCase() + normalized.slice(1);
  }
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

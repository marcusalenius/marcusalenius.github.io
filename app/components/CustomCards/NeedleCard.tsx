"use client";

import "./NeedleCard.css";

import dynamic from "next/dynamic";

import Card from "../Card/Card";
import InternalLink from "../Links/InternalLink";

const Video = dynamic(() => import("../Media/Video"), {
  ssr: false,
});

type Props = {
  cardData: { [key: string]: any };
};

export default function NeedleCard({ cardData }: Props) {
  const needlePostLink = "/needle";
  function formatSubtitle(subtitle?: string): string {
    if (!subtitle) return "";
    const normalized = subtitle.toLowerCase().replace(/\bai\b/g, "AI");
    return normalized.charAt(0).toUpperCase() + normalized.slice(1);
  }
  return (
    <Card
      className="card card-region-child"
      id="attention-card"
      individualEffect={false}
      href={needlePostLink}
    >
      <div className="card-images">
        <div className="frosted-pane">
          <h3>{cardData.title}</h3>
          <p className="paragraph-small">{formatSubtitle(cardData.subtitle)}</p>
          {/* href empty so that InternalLink gets rendered as a div */}
          <InternalLink href="">
            <p className="card-link">Learn more</p>
          </InternalLink>
        </div>
      </div>
    </Card>
  );
}

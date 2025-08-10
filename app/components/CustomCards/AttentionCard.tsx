"use client";

import "./AttentionCard.css";

import dynamic from "next/dynamic";

import Card from "../Card/Card";
import InternalLink from "../Links/InternalLink";

const Video = dynamic(() => import("../Media/Video"), {
  ssr: false,
});

type Props = {
  cardData: { [key: string]: any };
};

export default function AttentionCard({ cardData }: Props) {
  const attentionPostLink = "/attention";
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
      href={attentionPostLink}
    >
      <div className="card-images">
        <Video
          src="videos/attention-hero.mp4"
          id="attention-card-video-bkg"
          className="attention-card-video"
        />
        <Video
          src="videos/attention-hero.mp4"
          id="attention-card-video"
          className="attention-card-video"
        />
        <div className="frosted-pane">
          <h3>{cardData.title}</h3>
          <p className="paragraph-small">{formatSubtitle(cardData.subtitle)}</p>
          {/* href empty so that InternalLink gets rendered as a div */}
          <InternalLink href="">
            <p className="card-link">Read</p>
          </InternalLink>
        </div>
      </div>
    </Card>
  );
}

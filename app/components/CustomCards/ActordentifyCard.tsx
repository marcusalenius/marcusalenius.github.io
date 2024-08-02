import "./ActordentifyCard.css";

import dynamic from "next/dynamic";

import Card from "../Card/Card";
import InternalLink from "../Links/InternalLink";
// import Video from "../Media/Video";
const Video = dynamic(() => import("../Media/Video"), {
  ssr: false,
});

type Props = {
  cardData: { [key: string]: any };
};

function ActordentifyCard({ cardData }: Props) {
  const actordentifyPostLink = "/actordentify";
  return (
    <Card
      className="card card-region-child"
      id="actordentify-card"
      individualEffect={false}
      href={actordentifyPostLink}
    >
      <div className="card-images">
        <Video
          src="videos/actordentify-hero.mp4"
          id="actordentify-card-video-bkg"
          className="actordentify-card-video"
        />
        <Video
          src="videos/actordentify-hero.mp4"
          id="actordentify-card-video"
          className="actordentify-card-video"
        />
        <div className="frosted-pane">
          <h3>{cardData.title}</h3>
          <p className="paragraph-small">{cardData.subtitle}</p>
          {/* href empty so that InternalLink gets rendered as a div */}
          <InternalLink href="">
            <p className="card-link">Learn more</p>
          </InternalLink>
        </div>
      </div>
    </Card>
  );
}

export default ActordentifyCard;

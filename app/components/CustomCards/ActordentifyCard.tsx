import "./ActordentifyCard.css";

import Card from "../Card/Card";
import InternalLink from "../Links/InternalLink";
import Video from "../Media/Video";

type Props = {
  cardData: { [key: string]: any };
};

function ActordentifyCard({ cardData }: Props) {
  return (
    <Card
      className="card card-region-child"
      id="actordentify-card"
      individualEffect={false}
      href="https://google.com/"
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
          <InternalLink href="">
            <p className="card-link">Learn more</p>
          </InternalLink>
        </div>
      </div>
    </Card>
  );
}

export default ActordentifyCard;

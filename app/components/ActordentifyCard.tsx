import Card from "./Card";
import NavLink from "./NavLink";
import "./ActordentifyCard.css";
import Video from "./Video";

type Props = {
  cardData: { [key: string]: any };
};

function ActordentifyCard({ cardData }: Props) {
  return (
    <Card
      className="card card-region-child"
      id="actordentify-card"
      individualEffect={false}
    >
      <div className="card-images">
        <Video
          src="videos/actordentify-hero.mp4"
          id="actordentify-card-video-bkg"
        />
        <Video
          src="videos/actordentify-hero.mp4"
          id="actordentify-card-video"
        />
        <div className="frosted-pane">
          <h3>{cardData.title}</h3>
          <p className="paragraph-small">{cardData.subtitle}</p>
          <NavLink href={cardData.link}>
            <p className="card-link">Learn more</p>
          </NavLink>
        </div>
      </div>
    </Card>
  );
}

export default ActordentifyCard;

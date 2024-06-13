import Card from "./Card";
import NavLink from "./NavLink";
import "./ActordentifyCard.css";

type Props = {
  cardData: { [key: string]: any };
};

function ActordentifyCard({ cardData }: Props) {
  return (
    <Card id="actordentify-card" individualEffect={false}>
      <div className="card-images">
        <video
          src="videos/actordentify-hero.mp4"
          // autoPlay temporary until I write autoplay on scroll
          autoPlay
          playsInline
          muted
          loop
          id="actordentify-card-video-bkg"
        />
        <video
          src="videos/actordentify-hero.mp4"
          // autoPlay temporary until I write autoplay on scroll
          autoPlay
          playsInline
          muted
          loop
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

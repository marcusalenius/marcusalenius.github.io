import Card from "./Card";

function HeroCard() {
  return (
    <Card id="hero-card" href="https://www.google.com/">
      <img
        src="images/hero-image-desktop.png"
        alt="large image of Marcus Alenius"
        draggable="false"
        className="hero-image"
        id="hero-image-desktop"
      />
      <img
        src="images/hero-image-tablet.png"
        alt="large image of Marcus Alenius"
        draggable="false"
        className="hero-image"
        id="hero-image-tablet"
      />
      <img
        src="images/hero-image-medium-skinny.png"
        alt="large image of Marcus Alenius"
        draggable="false"
        className="hero-image"
        id="hero-image-medium-skinny"
      />
      <img
        src="images/hero-image-skinny.png"
        alt="large image of Marcus Alenius"
        draggable="false"
        className="hero-image"
        id="hero-image-skinny"
      />
      <img
        src="images/hero-image-mobile.png"
        alt="large image of Marcus Alenius"
        draggable="false"
        className="hero-image"
        id="hero-image-mobile"
      />
      <img
        src="images/hero-image-mobile-small.png"
        alt="large image of Marcus Alenius"
        draggable="false"
        className="hero-image"
        id="hero-image-mobile-small"
      />
    </Card>
  );
}

export default HeroCard;

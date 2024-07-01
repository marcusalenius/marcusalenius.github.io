import Card from "../Card/Card";

function HeroCard() {
  return (
    <Card id="hero-card" href="https://www.google.com/">
      <img
        src="/images/hero-image.jpg"
        id="hero-image"
        alt="Marcus Alenius"
        draggable={false}
      />
    </Card>
  );
}

export default HeroCard;

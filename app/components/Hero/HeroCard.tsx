import Card from "../Card/Card";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (arg: boolean) => void;
};

function HeroCard({ isModalOpen, setIsModalOpen }: Props) {
  return (
    <Card id="hero-card" onClick={() => setIsModalOpen(!isModalOpen)}>
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

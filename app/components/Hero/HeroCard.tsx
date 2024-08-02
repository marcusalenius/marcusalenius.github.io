import Card from "../Card/Card";

import Image from "next/image";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (arg: boolean) => void;
};

function HeroCard({ isModalOpen, setIsModalOpen }: Props) {
  return (
    <Card id="hero-card" onClick={() => setIsModalOpen(!isModalOpen)}>
      <Image
        src="/images/hero-image.jpg"
        id="hero-image"
        alt="Marcus Alenius"
        width={0}
        height={0}
        draggable={false}
        unoptimized={true}
      />
    </Card>
  );
}

export default HeroCard;

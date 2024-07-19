import "./HeroButton.css";

import Card from "../Card/Card";
import PlusCrossButton from "../PlusCrossButton/PlusCrossButton";

type Props = {
  buttonData: { [key: string]: any };
};

function HeroButton({ buttonData }: Props) {
  return (
    <Card className="card hero-button card-region-child" tabIndex={0}>
      <div className="hero-button-content">
        <div className="button-text">{buttonData.text}</div>
        <PlusCrossButton />
      </div>
    </Card>
  );
}

export default HeroButton;

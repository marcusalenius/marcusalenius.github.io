import "./Hero.css";

import CardRegion from "../Card/CardRegion";
import HeroButton from "./HeroButton";
import HeroCard from "./HeroCard";

type Props = {
  data: { [key: string]: any };
};

function Hero({ data }: Props) {
  return (
    <div id="hero">
      <div id="hero-left">
        <h1>
          Hello,
          <br />
          I’m Marcus
        </h1>
        <p className="paragraph-large">{data.brief}</p>
        <CardRegion id="hero-buttons-container">
          {data.heroButtons.map((buttonData: { [key: string]: any }) => {
            return <HeroButton buttonData={buttonData} key={buttonData.id} />;
          })}
        </CardRegion>
      </div>
      <div id="hero-right">
        <HeroCard />
      </div>
    </div>
  );
}

export default Hero;

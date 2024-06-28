import "./Hero.css";

import NavLink from "../NavLink";
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
        <NavLink href="/">
          <p className="paragraph-large">Learn more about me</p>
        </NavLink>
      </div>
      <div id="hero-right">
        <HeroCard />
      </div>
    </div>
  );
}

export default Hero;

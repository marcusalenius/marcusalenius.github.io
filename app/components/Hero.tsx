import './Hero.css';
import './Card.css';

import HeroLocations from './HeroLocations';

type Props = {
  data: { [key:string]: any};
};

function Hero({data}: Props) {
  return (
    <div id="hero">
      <div id="hero-left">
        <h1>Hello,<br/>I’m Marcus</h1>
        <p className="paragraph-large">{data.brief}</p>
        <HeroLocations locations={data.locations}/>
      </div>
      <div id="hero-right">
        <div className="card" id="hero-card">
          <div className="card-border"></div>
          <img src="images/hero-image-desktop.png" alt="large image of Marcus Alenius" draggable="false" className="hero-image" id="hero-image-desktop"/>
          <img src="images/hero-image-tablet.png" alt="large image of Marcus Alenius" draggable="false" className="hero-image" id="hero-image-tablet"/>
          <img src="images/hero-image-medium-skinny.png" alt="large image of Marcus Alenius" draggable="false" className="hero-image" id="hero-image-medium-skinny"/>
          <img src="images/hero-image-skinny.png" alt="large image of Marcus Alenius" draggable="false" className="hero-image" id="hero-image-skinny"/>
          <img src="images/hero-image-mobile.png" alt="large image of Marcus Alenius" draggable="false" className="hero-image" id="hero-image-mobile"/>
          <img src="images/hero-image-mobile-small.png" alt="large image of Marcus Alenius" draggable="false" className="hero-image" id="hero-image-mobile-small"/>
        </div>
      </div>
    </div>
  );
}

export default Hero;
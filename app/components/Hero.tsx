import '../typography.css';
import './Hero.css';

import HeroLocations from './HeroLocations';

export default function Hero() {
  return (
    <div id="hero">
      <div id="hero-left">
        <h1>Hello,<br/>I’m Marcus</h1>
        <p className="paragraph-large">I’m a sophomore at Carnegie Mellon studying information systems and artificial intelligence. I am passionate about creating technology that unlocks our full potential while making it less obtrusive, almost invisible to us.</p>
        <HeroLocations />
      </div>
    </div>
  );
}
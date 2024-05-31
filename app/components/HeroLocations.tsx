
type Props = {
  locations: { [key:string]: string}[];
};

function HeroLocations({locations}: Props) {
  return (
    <div id="locations-container">
      {locations.map((location) => (
        <a href={location.link} target="_blank">
          <div className="location">
            <img src="icons/location-icon-light-mode.svg" alt="" draggable="false" className="location-icon location-icon-light-mode"/>
            <img src="icons/location-icon-dark-mode.svg" alt="" draggable="false" className="location-icon location-icon-dark-mode"/>
            <div className="location-text">{location.name}</div>
          </div>
        </a>
      ))}
    </div>
  );
}

export default HeroLocations;
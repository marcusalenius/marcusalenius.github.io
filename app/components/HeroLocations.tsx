
export default function HeroLocations() {

  const locations = [
    { name: "Pittsburgh, PA", link: "https://goo.gl/maps/bNiQi64BXmRpJvmT6" },
    { name: "Gävle, Sweden", link: "https://goo.gl/maps/P4SXTrr1t84QU3kj7" },
  ]

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
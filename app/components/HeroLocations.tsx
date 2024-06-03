import ThemedImage from "./ThemedImage";

type Props = {
  locations: { [key: string]: string }[];
};

function HeroLocations({ locations }: Props) {
  return (
    <div id="locations-container">
      {locations.map((location) => (
        <a href={location.link} target="_blank">
          <div className="location">
            <ThemedImage
              lightSrc="/icons/location-icon-light-mode.svg"
              darkSrc="/icons/location-icon-dark-mode.svg"
              draggable={false}
              className="location-icon"
            />
            <div className="location-text">{location.name}</div>
          </div>
        </a>
      ))}
    </div>
  );
}

export default HeroLocations;

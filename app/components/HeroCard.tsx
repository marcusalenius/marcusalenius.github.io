"use client";

function HeroCard() {
  return (
    <div
      className="card"
      id="hero-card"
      onMouseMove={(event) => {
        const card = event.target as HTMLElement;
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        card.style.setProperty("--mouseX", `${x}px`);
        card.style.setProperty("--mouseY", `${y}px`);
      }}
    >
      <div className="card-border"></div>
      <img
        src="images/hero-image-desktop.png"
        alt="large image of Marcus Alenius"
        draggable="false"
        className="hero-image"
        id="hero-image-desktop"
      />
      <img
        src="images/hero-image-tablet.png"
        alt="large image of Marcus Alenius"
        draggable="false"
        className="hero-image"
        id="hero-image-tablet"
      />
      <img
        src="images/hero-image-medium-skinny.png"
        alt="large image of Marcus Alenius"
        draggable="false"
        className="hero-image"
        id="hero-image-medium-skinny"
      />
      <img
        src="images/hero-image-skinny.png"
        alt="large image of Marcus Alenius"
        draggable="false"
        className="hero-image"
        id="hero-image-skinny"
      />
      <img
        src="images/hero-image-mobile.png"
        alt="large image of Marcus Alenius"
        draggable="false"
        className="hero-image"
        id="hero-image-mobile"
      />
      <img
        src="images/hero-image-mobile-small.png"
        alt="large image of Marcus Alenius"
        draggable="false"
        className="hero-image"
        id="hero-image-mobile-small"
      />
    </div>
  );
}

export default HeroCard;

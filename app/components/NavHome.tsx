"use client";

function NavHome() {
  return (
    <div
      id="navbutton-home"
      tabIndex={0}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <div className="card-border"></div>
      <img
        src="images/navbar-headshot.png"
        alt=""
        draggable="false"
        id="navbar-headshot"
      />
    </div>
  );
}

export default NavHome;

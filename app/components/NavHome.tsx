function NavHome() {
  return (
    <div id="navbutton-home" tabIndex={0}>
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

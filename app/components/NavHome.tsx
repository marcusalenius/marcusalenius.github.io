import Image from "next/image";

function NavHome() {
  return (
    <div
      id="navbutton-home"
      tabIndex={0}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <div className="card-border"></div>
      <Image
        src="/images/navbar-headshot.png"
        width={56}
        height={56}
        alt=""
        draggable="false"
        id="navbar-headshot"
      />
    </div>
  );
}

export default NavHome;

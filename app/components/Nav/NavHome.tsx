import "./NavHome.css";

import Image from "next/image";
import Card from "../Card/Card";

type Props = {
  homePage: boolean;
};

function NavHome({ homePage }: Props) {
  return (
    <Card
      id="navbutton-home"
      tabIndex={0}
      href={homePage ? "" : "/"}
      onClick={
        homePage
          ? () => window.scrollTo({ top: 0, behavior: "smooth" })
          : () => {}
      }
    >
      <Image
        src="/images/navbar-headshot.png"
        width={56}
        height={56}
        alt=""
        draggable="false"
        id="navbar-headshot"
      />
    </Card>
  );
}

export default NavHome;

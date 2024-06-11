"use client";

import "./Nav.css";

import NavHome from "./NavHome";
import NavMobile from "./NavMobile";
import NavRight from "./NavRight";

type Props = {
  data: { [key: string]: any };
};

function Nav({ data }: Props) {
  return (
    <nav>
      <NavHome />
      <NavMobile />
      <NavRight data={data} />
    </nav>
  );
}

export default Nav;

"use client";

import "./Nav.css";

import NavHome from "./NavHome";
import NavMobile from "./NavMobile";
import NavRight from "./NavRight";

type Props = {
  data: { [key: string]: any };
  homePage: boolean;
};

export default function Nav({ data, homePage }: Props) {
  return (
    <nav>
      <NavHome homePage={homePage} />
      {homePage ? <NavMobile data={data} /> : null}
      <NavRight data={data} homePage={homePage} />
    </nav>
  );
}

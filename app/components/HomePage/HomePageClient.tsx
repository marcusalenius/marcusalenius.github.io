"use client";

import dynamic from "next/dynamic";
import HomeContainer from "../HomePage/HomeContainer";
import Footer from "../Footer/Footer";

const Nav = dynamic(() => import("../Nav/Nav"), { ssr: false });

export default function HomePageClient({ data }: { data: any }) {
  return (
    <>
      <Nav data={data} homePage={true} />
      <HomeContainer data={data} />
      <Footer />
    </>
  );
}

import "./typography.css";

import type { Metadata } from "next";

import HomePageClient from "./components/HomePage/HomePageClient";
import data from "../data.json";

export const metadata: Metadata = {
  description: data.brief,
  openGraph: {
    description: data.brief,
  },
  twitter: {
    description: data.brief,
  },
};

export default function HomePage() {
  return <HomePageClient data={data} />;
}

"use client";

import "./Hero.css";

import { useState } from "react";

import CardRegion from "../Card/CardRegion";
import HeroButton from "./HeroButton";
import HeroCard from "./HeroCard";

type Props = {
  data: { [key: string]: any };
};

function Hero({ data }: Props) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  return (
    <div id="hero">
      <div id="hero-left">
        <h1>
          Hello,
          <br />
          I’m Marcus
        </h1>
        <p className="paragraph-large">{data.brief}</p>
        <CardRegion id="hero-buttons-container">
          {data.heroButtons.map((buttonData: { [key: string]: any }) => {
            return (
              <HeroButton
                buttonData={buttonData}
                isModalOpen={
                  buttonData.id === 0 ? isContactModalOpen : isAboutModalOpen
                }
                setIsModalOpen={
                  buttonData.id === 0
                    ? setIsContactModalOpen
                    : setIsAboutModalOpen
                }
                key={buttonData.id}
              />
            );
          })}
        </CardRegion>
      </div>
      <div id="hero-right">
        <HeroCard
          isModalOpen={isAboutModalOpen}
          setIsModalOpen={setIsAboutModalOpen}
        />
      </div>
    </div>
  );
}

export default Hero;

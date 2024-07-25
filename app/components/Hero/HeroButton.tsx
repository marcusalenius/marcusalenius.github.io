"use client";

import "./HeroButton.css";

import { useState } from "react";

import Card from "../Card/Card";
import PlusCrossButton from "../PlusCrossButton/PlusCrossButton";
import Modal from "../Modal/Modal";

type Props = {
  buttonData: { [key: string]: any };
};

function HeroButton({ buttonData }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card
        className="card hero-button card-region-child"
        individualEffect={false}
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <div className="hero-button-content">
          <div className="button-text">{buttonData.text}</div>
          <PlusCrossButton />
        </div>
      </Card>
      <Modal
        modalData={buttonData.modal}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}

export default HeroButton;

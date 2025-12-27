"use client";

import "./AdditionalCard.css";

import { useState } from "react";
import dynamic from "next/dynamic";

import Card from "../Card/Card";
import PlusCrossButton from "../PlusCrossButton/PlusCrossButton";

const Modal = dynamic(() => import("../Modal/Modal"), {
  ssr: false,
});

type Props = {
  additionalData: { [key: string]: any };
};

export default function AdditionalCard({ additionalData }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card
        className="card additional-card card-region-child"
        individualEffect={false}
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <div className="additional-card-content">
          <h4>{additionalData.title}</h4>
          <PlusCrossButton />
        </div>
      </Card>
      <Modal
        modalData={additionalData}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}

"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import "./CategoryCard.css";

import Card from "../Card/Card";
import PlusCrossButton from "../PlusCrossButton/PlusCrossButton";
// import Modal from "../Modal/Modal";
const Modal = dynamic(() => import("../Modal/Modal"), {
  ssr: false,
});

type Props = {
  categoryData: { [key: string]: any };
};

export default function CategoryCard({ categoryData }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Card
        className="card category-card card-region-child"
        individualEffect={false}
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        <div className="category-card-content">
          <h4>{categoryData.title}</h4>
          <PlusCrossButton />
        </div>
      </Card>
      <Modal
        modalData={categoryData}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}

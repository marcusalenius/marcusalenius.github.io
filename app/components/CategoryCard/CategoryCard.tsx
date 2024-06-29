"use client";

import { useState } from "react";

import "./CategoryCard.css";

import Card from "../Card/Card";
import PlusCrossButton from "../PlusCrossButton/PlusCrossButton";
import Modal from "../Modal/Modal";

type Props = {
  categoryData: { [key: string]: any };
};

function CategoryCard({ categoryData }: Props) {
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
      <Modal categoryData={categoryData} isModalOpen={isModalOpen} />
    </>
  );
}

export default CategoryCard;

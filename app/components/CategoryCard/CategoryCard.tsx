import "./CategoryCard.css";

import Card from "../Card/Card";
import PlusCrossButton from "../PlusCrossButton/PlusCrossButton";

type Props = {
  categoryData: { [key: string]: any };
};

function CategoryCard({ categoryData }: Props) {
  return (
    <Card
      className="card category-card card-region-child"
      individualEffect={false}
    >
      <div className="category-card-content">
        <h4>{categoryData.title}</h4>
        <PlusCrossButton />
      </div>
    </Card>
  );
}

export default CategoryCard;

import "./CategoryCard.css";

import Card from "../Card/Card";
import ThemedImage from "../ThemedImage";

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
        <div className="plus-container">
          <ThemedImage
            lightSrc="icons/plus-icon-light-mode.svg"
            darkSrc="icons/plus-icon-dark-mode.svg"
            className="plus-icon"
          />
        </div>
      </div>
    </Card>
  );
}

export default CategoryCard;

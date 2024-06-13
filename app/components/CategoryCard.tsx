import "./CategoryCard.css";

import Card from "./Card";
import ThemedImage from "./ThemedImage";

type Props = {
  categoryData: { [key: string]: any };
};

function CategoryCard({ categoryData }: Props) {
  return (
    <Card className="card category-card" individualEffect={false}>
      <div className="category-card-content">
        <h3>{categoryData.title}</h3>
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

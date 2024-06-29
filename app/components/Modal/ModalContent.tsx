import "./ModalContentCard.css";

import CardRegion from "../Card/CardRegion";
import Card from "../Card/Card";

type Props = {
  categoryData: { [key: string]: any };
};

function ModalContent({ categoryData }: Props) {
  return (
    <div className="modal-content">
      <h2>{categoryData.title} Projects</h2>
      <CardRegion className="card-layout">
        {categoryData.projects.map((projectData: { [key: string]: any }) => {
          return (
            <Card
              className="modal-content-card card-region-child"
              individualEffect={false}
            >
              <h3>{projectData.title}</h3>
              <p className="paragraph-small">{projectData.description}</p>
            </Card>
          );
        })}
      </CardRegion>
    </div>
  );
}

export default ModalContent;
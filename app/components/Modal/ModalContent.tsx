import CardRegion from "../Card/CardRegion";
import ModalContentCard from "./ModalContentCard";

type Props = {
  categoryData: { [key: string]: any };
};

function ModalContent({ categoryData }: Props) {
  return (
    <div className="modal-content">
      <h2>{categoryData.title} Projects</h2>
      <div className="modal-cards-container">
        <CardRegion className="card-layout">
          {categoryData.projects.map((projectData: { [key: string]: any }) => {
            return <ModalContentCard projectData={projectData} />;
          })}
        </CardRegion>
        <div className="modal-cards-overlay"></div>
      </div>
    </div>
  );
}

export default ModalContent;

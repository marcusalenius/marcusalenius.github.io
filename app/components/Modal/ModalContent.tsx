import CardRegion from "../Card/CardRegion";
import ModalContentCard from "./ModalContentCard";

type Props = {
  categoryData: { [key: string]: any };
};

function ModalContent({ categoryData }: Props) {
  return (
    <div className="modal-content">
      <h2>{categoryData.title} Projects</h2>
      <CardRegion className="card-layout">
        {categoryData.projects.map((projectData: { [key: string]: any }) => {
          return <ModalContentCard projectData={projectData} />;
        })}
      </CardRegion>
    </div>
  );
}

export default ModalContent;

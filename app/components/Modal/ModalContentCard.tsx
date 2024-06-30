import "./ModalContentCard.css";

import Card from "../Card/Card";
import ReadMore from "../ReadMore/ReadMore";

type Props = {
  projectData: { [key: string]: any };
};

function ModalContentCard({ projectData }: Props) {
  return (
    <Card
      className="modal-content-card card-region-child"
      individualEffect={false}
    >
      <h3>{projectData.title}</h3>
      <p className="paragraph-small">
        <ReadMore>{projectData.description}</ReadMore>
      </p>
    </Card>
  );
}

export default ModalContentCard;

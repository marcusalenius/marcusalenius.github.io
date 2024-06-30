import { useState } from "react";

import "./ModalContentCard.css";

import Card from "../Card/Card";
import ReadMoreLineCount from "../ReadMore/ReadMore";

type Props = {
  projectData: { [key: string]: any };
};

function ModalContentCard({ projectData }: Props) {
  const [isShowingAll, setIsShowingAll] = useState(false);

  return (
    <Card
      className="modal-content-card card-region-child"
      individualEffect={false}
      // temp (only link should be clickable)?
      onClick={() => setIsShowingAll(!isShowingAll)}
    >
      <h3>{projectData.title}</h3>
      <p className="paragraph-small">
        <ReadMoreLineCount isShowingAll={isShowingAll}>
          {projectData.description}
        </ReadMoreLineCount>
      </p>
    </Card>
  );
}

export default ModalContentCard;

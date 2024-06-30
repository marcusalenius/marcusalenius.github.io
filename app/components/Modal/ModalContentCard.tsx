import { useState } from "react";

import "./ModalContentCard.css";

import Card from "../Card/Card";
import ReadMore from "../ReadMore/ReadMore";
import NavLink from "../NavLink/NavLink";
import ExpandCollapseButton from "../ExpandCollapseButton/ExpandCollapseButton";

type Props = {
  projectData: { [key: string]: any };
};

function ModalContentCard({ projectData }: Props) {
  const [isShowingAll, setIsShowingAll] = useState(false);

  return (
    <Card
      className="modal-content-card card-region-child"
      individualEffect={false}
    >
      <h3>{projectData.title}</h3>
      <p className="paragraph-small">
        <ReadMore isShowingAll={isShowingAll}>
          {projectData.description}
        </ReadMore>
      </p>
      {projectData.link && isShowingAll ? (
        <NavLink href={projectData.link}>
          <p>Learn More</p>
        </NavLink>
      ) : null}
      <ExpandCollapseButton
        collapse={isShowingAll} // collapse-button if showing all
        onClick={() => setIsShowingAll(!isShowingAll)}
      />
    </Card>
  );
}

export default ModalContentCard;

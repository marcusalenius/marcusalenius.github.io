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

  // Set container height to height of card when collapsed

  function getCollapsedCardHeight() {
    const cards = Array.from(
      document.querySelectorAll(".modal-content-card")
    ) as HTMLElement[];

    for (const card of cards) {
      const readMore = card.querySelector(".read-more");
      if (!readMore) {
        continue;
      }
      if (readMore.classList.contains("closed")) {
        return card.clientHeight;
      }
    }
    return -1;
  }

  const cardHeight = getCollapsedCardHeight();

  const style = {
    height: isShowingAll && cardHeight !== -1 ? "auto" : `${cardHeight}px`,
  };

  return (
    <div className="modal-content-card-container" style={style}>
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
            <p className="card-link">Learn More</p>
          </NavLink>
        ) : null}
        <ExpandCollapseButton
          collapse={isShowingAll} // collapse-button if showing all
          onClick={() => setIsShowingAll(!isShowingAll)}
        />
      </Card>
    </div>
  );
}

export default ModalContentCard;

import { useState, useEffect, useRef } from "react";

import "./ModalContentCard.css";

import Card from "../Card/Card";
import ReadMore from "../ReadMore/ReadMore";
import ModalLinks from "./ModalLinks";
import ExpandCollapseButton from "../ExpandCollapseButton/ExpandCollapseButton";

type Props = {
  projectData: { [key: string]: any };
};

function ModalContentCard({ projectData }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  // Hook for click outside (on modal overlay) to close modal
  useEffect(function mount() {
    function onClick(event: MouseEvent) {
      if (!isExpanded) {
        return;
      }

      const thisCardContainer = cardContainerRef.current;
      if (!thisCardContainer) {
        return;
      }

      if (!thisCardContainer.contains(event.target as HTMLElement)) {
        setIsExpanded(false);
      }
    }

    document.addEventListener("click", onClick);

    return function unMount() {
      document.removeEventListener("click", onClick);
    };
  });

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
    height: cardHeight === -1 ? "auto" : `${cardHeight}px`,
  };

  return (
    <div
      className="modal-content-card-container"
      style={style}
      ref={cardContainerRef}
    >
      <Card
        className="card modal-content-card card-region-child"
        individualEffect={false}
      >
        <div className="modal-content-card-content">
          <h4>
            <span className="title">{projectData.title}</span>
            <span className="short-title">{projectData.short_title}</span>
          </h4>
          <h5>{projectData.date}</h5>
          {/* <p>{projectData.date}</p> */}
          <ReadMore isExpanded={isExpanded}>{projectData.description}</ReadMore>
          <ModalLinks projectData={projectData} />
          <ExpandCollapseButton
            collapse={isExpanded} // collapse-button if expanded
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </div>
      </Card>
    </div>
  );
}

export default ModalContentCard;

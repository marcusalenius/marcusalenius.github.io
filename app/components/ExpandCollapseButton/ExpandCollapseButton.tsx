import "./ExpandCollapseButton.css";

import ThemedImage from "../Media/ThemedImage";

type Props = {
  collapse: boolean;
  onClick: () => void;
};

function ExpandCollapseButton({ collapse, onClick }: Props) {
  return (
    <div className="expand-collapse-button" onClick={onClick}>
      <p className="card-link">{collapse ? "Collapse" : "Expand"}</p>
      <ThemedImage
        lightSrc="/icons/expand-chevron-light-mode.svg"
        darkSrc="/icons/expand-chevron-dark-mode.svg"
        draggable={false}
        className={collapse ? "expand-chevron collapse" : "expand-chevron"}
      />
    </div>
  );
}

export default ExpandCollapseButton;

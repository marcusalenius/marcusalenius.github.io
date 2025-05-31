"use client";

import "./PlusCrossButton.css";

import ThemedImage from "../Media/ThemedImage";

type Props = {
  cross?: boolean;
  onClick?: () => void;
};

export default function PlusCrossButton({
  cross = false,
  onClick = () => {},
}: Props) {
  return (
    <div className="plus-cross-container" onClick={onClick}>
      <ThemedImage
        lightSrc="icons/plus-icon-light-mode.svg"
        darkSrc="icons/plus-icon-dark-mode.svg"
        className={cross ? "plus-cross-icon cross" : "plus-cross-icon plus"}
      />
    </div>
  );
}

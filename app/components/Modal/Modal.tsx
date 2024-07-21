import { useEffect } from "react";

import "./Modal.css";

import PlusCrossButton from "../PlusCrossButton/PlusCrossButton";
import ModalContent from "./ModalContent";

type Props = {
  modalData: { [key: string]: any };
  isModalOpen: boolean;
  setIsModalOpen: (arg: boolean) => void;
};

function Modal({ modalData, isModalOpen, setIsModalOpen }: Props) {
  // Hook for click outside (on modal overlay) to close modal
  useEffect(function mount() {
    function onClick(event: MouseEvent) {
      const modalOverlays = Array.from(
        document.querySelectorAll(".modal-overlay")
      ) as HTMLElement[];
      const modalCards = Array.from(
        document.querySelectorAll(".modal-card")
      ) as HTMLElement[];
      if (
        isModalOpen &&
        modalOverlays.includes(event.target as HTMLElement) &&
        !modalCards.includes(event.target as HTMLElement)
      ) {
        setIsModalOpen(!isModalOpen);
      }
    }

    document.addEventListener("click", onClick);

    return function unMount() {
      document.removeEventListener("click", onClick);
    };
  });

  const titleLowerDashed = modalData.title.toLowerCase().replace(" ", "-");
  return (
    <div
      className={isModalOpen ? "modal-overlay" : "modal-overlay hidden"}
      id={`${titleLowerDashed}-modal`}
    >
      <div className="modal-card">
        <PlusCrossButton
          cross={true}
          onClick={() => setIsModalOpen(!isModalOpen)}
        />
        <ModalContent modalData={modalData} />
      </div>
    </div>
  );
}

export default Modal;

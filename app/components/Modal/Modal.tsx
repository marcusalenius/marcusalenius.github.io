import "./Modal.css";

import PlusCrossButton from "../PlusCrossButton/PlusCrossButton";
import ModalContent from "./ModalContent";

type Props = {
  categoryData: { [key: string]: any };
  isModalOpen: boolean;
};

function Modal({ categoryData, isModalOpen }: Props) {
  const titleLowerDashed = categoryData.title.toLowerCase().replace(" ", "-");
  return (
    <div
      className={isModalOpen ? "modal-overlay" : "modal-overlay hidden"}
      id={`${titleLowerDashed}-modal`}
    >
      <div className="modal-card">
        <PlusCrossButton cross={true} />
        <ModalContent categoryData={categoryData} />
      </div>
    </div>
  );
}

export default Modal;

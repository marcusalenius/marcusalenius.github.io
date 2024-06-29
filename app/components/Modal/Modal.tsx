import "./Modal.css";

import PlusCrossButton from "../PlusCrossButton/PlusCrossButton";
import ModalContent from "./ModalContent";

type Props = {
  categoryData: { [key: string]: any };
  isModalOpen: boolean;
  setIsModalOpen: (arg: boolean) => void;
};

function Modal({ categoryData, isModalOpen, setIsModalOpen }: Props) {
  const titleLowerDashed = categoryData.title.toLowerCase().replace(" ", "-");
  return (
    <div
      className={isModalOpen ? "modal-overlay open" : "modal-overlay"}
      id={`${titleLowerDashed}-modal`}
    >
      <div className="modal-card">
        <PlusCrossButton
          cross={true}
          onClick={() => setIsModalOpen(!isModalOpen)}
        />
        <ModalContent categoryData={categoryData} />
      </div>
    </div>
  );
}

export default Modal;

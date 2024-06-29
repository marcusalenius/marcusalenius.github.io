type Props = {
  categoryData: { [key: string]: any };
};

function ModalContent({ categoryData }: Props) {
  return (
    <div className="modal-content">
      <h2>{categoryData.title} Projects</h2>
    </div>
  );
}

export default ModalContent;

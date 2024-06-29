import "./Modal.css";

function ModalOverlay({ children }: { children: React.ReactNode }) {
  return <div className="modal-overlay">{children}</div>;
}

function ModalCard({ children }: { children: React.ReactNode }) {
  return <div className="modal-card">{children}</div>;
}

function ModalContent() {
  return (
    <div className="modal-content">
      <h1>Foo</h1>
      <h1>Foo</h1>
      <h1>Foo</h1>
      <h1>Foo</h1>
      <h1>Foo</h1>
      <h1>Foo</h1>
      <h1>Foo</h1>
      <h1>Foo</h1>
      <h1>Foo</h1>
      <h1>Foo</h1>
      <h1>Foo</h1>
      <h1>Foo</h1>
      <h1>Foo</h1>
      <h1>Foo</h1>
      <h1>Foo</h1>
      <h1>Foo</h1>
    </div>
  );
}

function Modal() {
  return (
    <ModalOverlay>
      <ModalCard>
        <ModalContent />
      </ModalCard>
    </ModalOverlay>
  );
}

export default Modal;

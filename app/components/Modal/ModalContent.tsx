import CardRegion from "../Card/CardRegion";
import ModalContentCard from "./ModalContentCard";

type Props = {
  modalData: { [key: string]: any };
};

function ModalContent({ modalData }: Props) {
  if (modalData.title === "Contact and Links") {
    return (
      <div className="modal-content">
        <h2>{modalData.title}</h2>
        {modalData.content.map((contentData: { [key: string]: any }) => {
          return (
            <div className="contact-link" key={contentData.id}>
              <p className="small-header">{contentData.title.toUpperCase()}</p>
              <a href={contentData.link} target="_blank">
                <p className="paragraph-large">{contentData.text}</p>
              </a>
            </div>
          );
        })}
      </div>
    );
  } else if (modalData.title === "About Me") {
    return (
      <div className="modal-content">
        <h2>{modalData.title}</h2>
      </div>
    );
  } else {
    return (
      <div className="modal-content">
        <h2>{modalData.title} Projects</h2>
        <CardRegion className="card-layout">
          {modalData.projects.map((projectData: { [key: string]: any }) => {
            return (
              <ModalContentCard
                projectData={projectData}
                key={projectData.id}
              />
            );
          })}
        </CardRegion>
      </div>
    );
  }
}

export default ModalContent;

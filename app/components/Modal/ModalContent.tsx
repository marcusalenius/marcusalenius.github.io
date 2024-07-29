import CardRegion from "../Card/CardRegion";
import ModalContentCard from "./ModalContentCard";
import ContactLink from "../ContactLink/ContactLink";
import AboutMeModal from "./AboutMeModal";

type Props = {
  modalData: { [key: string]: any };
};

function ModalContent({ modalData }: Props) {
  if (modalData.title === "Contact and Links") {
    return (
      <div className="modal-content">
        <h2>{modalData.title}</h2>
        {modalData.content.map((contentData: { [key: string]: any }) => {
          return <ContactLink contactData={contentData} key={contentData.id} />;
        })}
      </div>
    );
  } else if (modalData.title === "About Me") {
    return <AboutMeModal modalData={modalData} />;
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

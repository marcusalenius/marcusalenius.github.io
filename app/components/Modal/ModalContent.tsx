import ContactLink from "../ContactLink/ContactLink";
import AboutMeModal from "./AboutMeModal";
import AdditionalProjectsModal from "./AdditionalProjectsModal";
import AdditionalExperienceModal from "./AdditionalExperienceModal";
import AdditionalPublicationsModal from "./AdditionalPublicationsModal";

type Props = {
  modalData: { [key: string]: any };
};

export default function ModalContent({ modalData }: Props) {
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
  } else if (modalData.title === "Additional Projects") {
    return <AdditionalProjectsModal modalData={modalData} />;
  } else if (modalData.title === "Additional Experience") {
    return <AdditionalExperienceModal modalData={modalData} />;
  } else if (modalData.title === "Additional Publications") {
    return <AdditionalPublicationsModal modalData={modalData} />;
  } else {
    return <></>;
  }
}

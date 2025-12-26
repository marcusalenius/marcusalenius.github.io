import CardRegion from "../Card/CardRegion";
import ExperienceCard from "../ExperienceCard/ExperienceCard";

type Props = {
  modalData: { [key: string]: any };
};

export default function AdditionalExperienceModal({ modalData }: Props) {
  return (
    <div className="modal-content">
      <h2>{modalData.title}</h2>
      <CardRegion className="card-layout">
        {modalData.experience.map((experienceData: { [key: string]: any }) => {
          return (
            <ExperienceCard cardData={experienceData} key={experienceData.id} />
          );
        })}
      </CardRegion>
    </div>
  );
}

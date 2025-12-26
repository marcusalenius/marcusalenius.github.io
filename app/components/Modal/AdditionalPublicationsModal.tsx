import CardRegion from "../Card/CardRegion";
import PublicationCard from "../PublicationCard/PublicationCard";

type Props = {
  modalData: { [key: string]: any };
};

export default function AdditionalPublicationsModal({ modalData }: Props) {
  return (
    <div className="modal-content">
      <h2>{modalData.title}</h2>
      <CardRegion className="card-layout">
        {modalData.publications.map(
          (publicationData: { [key: string]: any }) => {
            return (
              <PublicationCard
                cardData={publicationData}
                key={publicationData.id}
              />
            );
          }
        )}
      </CardRegion>
    </div>
  );
}

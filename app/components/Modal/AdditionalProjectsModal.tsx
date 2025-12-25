import { Fragment } from "react";

import CardRegion from "../Card/CardRegion";
import ModalContentCard from "./ModalContentCard";

type Props = {
  modalData: { [key: string]: any };
};

export default function AdditionalProjectsModal({ modalData }: Props) {
  return (
    <div className="modal-content">
      {modalData.categories.map((categoryData: { [key: string]: any }) => {
        return (
          <Fragment key={categoryData.id}>
            <h2>{categoryData.title}</h2>
            <CardRegion className="card-layout">
              {categoryData.projects.map(
                (projectData: { [key: string]: any }) => {
                  return (
                    <ModalContentCard
                      projectData={projectData}
                      key={projectData.id}
                    />
                  );
                }
              )}
            </CardRegion>
          </Fragment>
        );
      })}
    </div>
  );
}

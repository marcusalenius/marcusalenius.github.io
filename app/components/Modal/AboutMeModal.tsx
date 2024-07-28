import "./AboutMeModal.css";

type Props = {
  modalData: { [key: string]: any };
};

function AboutMeModal({ modalData }: Props) {
  return (
    <div className="modal-content">
      <h2>{modalData.title}</h2>
      <div className="about-me-row">
        <div className="about-me-text">
          <p className="paragraph-small">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nulla
            ante, sollicitudin et felis non, elementum placerat arcu. Etiam arcu
            enim, porttitor in congue et, tincidunt ac mauris. Nullam porttitor,
            est ac luctus vehicula, dui justo pharetra arcu, id interdum risus
            lorem sed erat. Duis at lectus id ex sagittis gravida tristique ac
            libero. Fusce faucibus turpis sed porttitor sagittis. Curabitur arcu
            risus, egestas in dignissim nec, ullamcorper sit amet lorem. Quisque
            in dui ultrices, viverra odio a, viverra sem. Aliquam iaculis ac
            augue at ornare.
          </p>
        </div>
        <div className="about-me-image">Image</div>
      </div>
      <div className="about-me-row">
        <div className="about-me-image">Image</div>
        <div className="about-me-text">
          <p className="paragraph-small">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nulla
            ante, sollicitudin et felis non, elementum placerat arcu. Etiam arcu
            enim, porttitor in congue et, tincidunt ac mauris. Nullam porttitor,
            est ac luctus vehicula, dui justo pharetra arcu, id interdum risus
            lorem sed erat. Duis at lectus id ex sagittis gravida tristique ac
            libero. Fusce faucibus turpis sed porttitor sagittis. Curabitur arcu
            risus, egestas in dignissim nec, ullamcorper sit amet lorem. Quisque
            in dui ultrices, viverra odio a, viverra sem. Aliquam iaculis ac
            augue at ornare.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutMeModal;

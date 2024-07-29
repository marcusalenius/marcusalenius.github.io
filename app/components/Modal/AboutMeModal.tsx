import "./AboutMeModal.css";

type Props = {
  modalData: { [key: string]: any };
};

function AboutMeModal({ modalData }: Props) {
  return (
    <div className="modal-content">
      <h2>{modalData.title}</h2>
      <div className="about-me-row" id="about-me-row-0">
        <div className="about-me-text">
          {modalData.content.row_0.map((paragraph: string) => (
            <p className="paragraph-small">{paragraph}</p>
          ))}
        </div>
        <div className="about-me-image">
          <img
            src="images/about-me-sweden.jpg"
            alt="Image of me in Sweden"
            draggable={false}
          />
        </div>
      </div>
      <div className="about-me-row" id="about-me-row-1">
        <div className="about-me-image">
          <img
            src="images/about-me-swim.jpg"
            alt="Image of me in swimming"
            draggable={false}
          />
        </div>
        <div className="about-me-text">
          {modalData.content.row_1.map((paragraph: string) => (
            <p className="paragraph-small">{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="about-me-row" id="about-me-row-2"></div>
      <div className="about-me-text">
        {/* I don't love that this is hardcoded */}
        <p className="paragraph-small">
          Feel free to reach out to me at{" "}
          <a href="mailto:alenius@cmu.edu" target="_blank">
            alenius@cmu.edu
          </a>{" "}
          or connect with me on{" "}
          <a href="https://www.linkedin.com/in/marcusalenius/" target="_blank">
            LinkedIn
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default AboutMeModal;

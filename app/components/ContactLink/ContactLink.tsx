import "./ContactLink.css";

type Props = {
  contactData: { [key: string]: any };
};

export default function ContactLink({ contactData }: Props) {
  return (
    <div className="contact-link" key={contactData.id}>
      {/* <p className="small-header">{contactData.title.toUpperCase()}</p> */}
      <h5>{contactData.title.toUpperCase()}</h5>
      <a href={contactData.link} target="_blank">
        <p className="paragraph-large">{contactData.text}</p>
      </a>
    </div>
  );
}

import "./ModalLinks.css";

import NavLink from "../NavLink/NavLink";

type Props = {
  projectData: { [key: string]: any };
};

function ModalLinks({ projectData }: Props) {
  const links: { [key: string]: any } = {
    "Learn More": projectData.post_link,
    "View on GitHub": projectData.github_link,
  };
  return (
    <div className="modal-links">
      {Object.keys(links).map((linkText: string) => {
        if (links[linkText]) {
          return (
            <NavLink href={links[linkText]}>
              <p className="card-link">{linkText}</p>
            </NavLink>
          );
        }
        return null;
      })}
    </div>
  );
}

export default ModalLinks;

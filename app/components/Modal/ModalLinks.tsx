import "./ModalLinks.css";

import InternalLink from "../Links/InternalLink";
import ExternalLink from "../Links/ExternalLink";

type Props = {
  projectData: { [key: string]: any };
};

function ModalLinks({ projectData }: Props) {
  const post_link = projectData.post_link;
  const github_link = projectData.github_link;
  return (
    <div className="modal-links">
      {post_link ? (
        <InternalLink href={post_link}>
          <p className="card-link">Learn More</p>
        </InternalLink>
      ) : null}
      {github_link ? (
        <ExternalLink href={github_link}>
          <p className="card-link">View on GitHub</p>
        </ExternalLink>
      ) : null}
    </div>
  );
}

export default ModalLinks;

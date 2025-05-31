import "./ModalLinks.css";

import InternalLink from "../Links/InternalLink";
import ExternalLink from "../Links/ExternalLink";

type Props = {
  projectData: { [key: string]: any };
};

export default function ModalLinks({ projectData }: Props) {
  const postLink = projectData.post_link;
  const githubLink = projectData.github_link;
  return (
    <div className="modal-links">
      {postLink ? (
        <InternalLink href={postLink}>
          <p className="card-link">Learn More</p>
        </InternalLink>
      ) : null}
      {githubLink ? (
        <ExternalLink href={githubLink}>
          <p className="card-link">View on GitHub</p>
        </ExternalLink>
      ) : null}
    </div>
  );
}

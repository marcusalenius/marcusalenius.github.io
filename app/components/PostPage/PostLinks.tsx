import "./PostLinks.css";

import ExternalLink from "../Links/ExternalLink";

type Props = {
  postLinkData: { [key: string]: any };
};

export default function PostLinks({ postLinkData }: Props) {
  const github_link = postLinkData.github_link;
  return (
    <div className="post-links">
      {github_link ? (
        <ExternalLink href={github_link}>
          <p className="card-link">View on GitHub</p>
        </ExternalLink>
      ) : null}
    </div>
  );
}

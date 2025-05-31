import "./Post.css";

import PostImage from "./PostImage";
import PostBody from "./PostBody";
import PostLinks from "./PostLinks";

type Props = {
  postData: { [key: string]: any };
  postName: string; // This is the name of the post, e.g., "actordentify"
  markdown: string; // This should be the markdown content as a string
};

export default function Post({ postData, postName, markdown }: Props) {
  return (
    <div id="container">
      <div className="post">
        <PostImage post={postName} />
        <h2>{postData.title}</h2>
        <div className="post-intro">
          <p className="paragraph-small">{postData.intro}</p>
          {postData.links ? <PostLinks postLinkData={postData.links} /> : null}
          <div className="post-date">
            <p>{postData.date}</p>
          </div>
          {postData.youtube_link ? (
            <iframe
              src={postData.youtube_link}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : null}
        </div>
        <PostBody markdown={markdown} />
      </div>
    </div>
  );
}

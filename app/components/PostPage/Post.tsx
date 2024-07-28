import "./Post.css";

import Video from "../Media/Video";
import PostBody from "./PostBody";
import PostLinks from "./PostLinks";

type Props = {
  post: string;
  postData: { [key: string]: any };
};

function Post({ post, postData }: Props) {
  return (
    <div id="container">
      <div className="post">
        <div className="post-image">
          {postData.image_type === "image" ? (
            <img
              src={`images/${postData.image}`}
              alt=""
              id={postData.image.split(".")[0]}
            />
          ) : (
            <Video
              src={`videos/${postData.image}`}
              id={postData.image.split(".")[0]}
            />
          )}
        </div>
        <h2>{postData.title}</h2>
        <div className="post-intro">
          <p className="paragraph-small">{postData.intro}</p>
        </div>
        {postData.links ? <PostLinks postLinkData={postData.links} /> : null}
        <div className="post-date">
          <p>{postData.date}</p>
        </div>
        <PostBody post={post} />
      </div>
    </div>
  );
}

export default Post;

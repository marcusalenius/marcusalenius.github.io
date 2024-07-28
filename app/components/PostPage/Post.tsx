import "./Post.css";

import Video from "../Media/Video";
import PostBody from "./PostBody";
import PostLinks from "./PostLinks";

type Props = {
  postData: { [key: string]: any };
};

function Post({ postData }: Props) {
  return (
    <div id="container">
      <div className="post">
        <div className="post-image">
          {/* {postData.image_type === "image" ? (
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
          )} */}
        </div>
        <h2>{postData.title}</h2>
        <div className="post-intro">
          <p className="paragraph-small">{postData.intro}</p>
          {postData.links ? <PostLinks postLinkData={postData.links} /> : null}
          <div className="post-date">
            <p>{postData.date}</p>
          </div>
          {postData.youtube_link ? (
            <iframe
              src="https://www.youtube.com/embed/GL7kLWBDsWU"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : null}
        </div>

        <PostBody markdown={postData.markdown} />
      </div>
    </div>
  );
}

export default Post;

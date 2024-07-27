import "./Post.css";

import Video from "../Media/Video";

type Props = {
  postData: { [key: string]: any };
};

function Post({ postData }: Props) {
  return (
    <div id="container">
      <div className="post">
        <div className="post-image">
          {postData.image_type === "image" ? (
            <></>
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
      </div>
    </div>
  );
}

export default Post;

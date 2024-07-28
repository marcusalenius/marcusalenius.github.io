import "./PostImage.css";

import Video from "../Media/Video";

type Props = {
  post: string;
};

function PostImage({ post }: Props) {
  const content: { [key: string]: JSX.Element } = {
    actordentify: (
      <Video src="videos/actordentify-hero.mp4" id="actordentify-hero" />
    ),
    kenboard: (
      <>
        <img
          src="images/kenboard-demo-full-length.png"
          alt=""
          id="kenboard-demo-image-full-length"
        />
        <Video src="videos/kenboard-demo.mp4" id="kenboard-demo-video" />
        <img src="images/kenboard-splash.png" alt="" id="kenboard-splash" />
        <img src="images/kenboard-debug.png" alt="" id="kenboard-debug" />
      </>
    ),
  };

  return <div className="post-image">{content[post]}</div>;
}

export default PostImage;

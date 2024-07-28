import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { readFileSync } from "fs";

import Video from "../Media/Video";

type Props = {
  post: string;
};

function PostBody({ post }: Props) {
  const markdown = readFileSync(`markdown/${post}.md`, "utf-8");
  const markdownComponents = {
    video(props: any) {
      const { node, src, ...rest } = props;
      return <Video src={`videos/${src}`} id={src.split(".")[0]} {...rest} />;
    },
    img(props: any) {
      const { node, src, ...rest } = props;
      return <img src={`images/${src}`} id={src.split(".")[0]} {...rest} />;
    },
  };

  return (
    <div className="post-body">
      <Markdown rehypePlugins={[rehypeRaw]} components={markdownComponents}>
        {markdown}
      </Markdown>
    </div>
  );
}

export default PostBody;

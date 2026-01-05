import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import remarkSmartypants from "remark-smartypants";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // import KaTeX CSS
import dynamic from "next/dynamic";
import Image from "next/image";

const Video = dynamic(() => import("../Media/Video"), {
  ssr: false,
});

type Props = {
  markdown: string; // This should be the markdown content as a string
};

export default function PostBody({ markdown }: Props) {
  const markdownComponents = {
    video(props: any) {
      const { node, src, ...rest } = props;
      return (
        <Video
          src={`videos/${src}`}
          id={src.split(".")[0]}
          className={src.split("-")[0] + "-video"}
          {...rest}
        />
      );
    },
    img(props: any) {
      const { node, src, ...rest } = props;
      return (
        <Image
          src={`/images/${src}`}
          id={src.split(".")[0]}
          className={src.split("-")[0] + "-image"}
          width={0}
          height={0}
          unoptimized={true}
          style={{ height: "auto" }}
          {...rest}
        />
      );
    },
    a(props: any) {
      const { node, ...rest } = props;
      return <a {...rest} target="_blank" />;
    },
  };

  return (
    <div className="post-body">
      <Markdown
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        remarkPlugins={[remarkMath, remarkSmartypants]}
        components={markdownComponents}
      >
        {markdown}
      </Markdown>
    </div>
  );
}

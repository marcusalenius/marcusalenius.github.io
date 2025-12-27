import "./PostImage.css";

import dynamic from "next/dynamic";
import Image from "next/image";

import NeedleCardSvg from "../CustomCards/NeedleCardSvg";
import SpeechTransformerCardSvg from "../CustomCards/SpeechTransformerCardSvg";

const Video = dynamic(() => import("../Media/Video"), {
  ssr: false,
});

type Props = {
  post: string;
};

export default function PostImage({ post }: Props) {
  const content: { [key: string]: JSX.Element } = {
    attention: <Video src="videos/attention-hero.mp4" id="attention-hero" />,
    needle: <NeedleCardSvg />,
    "speech-transformer": <SpeechTransformerCardSvg />,
    actordentify: (
      <Video src="videos/actordentify-hero.mp4" id="actordentify-hero" />
    ),
    kenboard: (
      <>
        <Image
          src="images/kenboard-demo-full-length.png"
          alt=""
          id="kenboard-demo-image-full-length"
          width={0}
          height={0}
          unoptimized={true}
          style={{ height: "auto" }}
        />
        <Video src="videos/kenboard-demo.mp4" id="kenboard-demo-video" />
        <Image
          src="images/kenboard-splash.png"
          alt=""
          id="kenboard-splash"
          width={0}
          height={0}
          unoptimized={true}
          style={{ height: "auto" }}
        />
        <Image
          src="images/kenboard-debug.png"
          alt=""
          id="kenboard-debug"
          width={0}
          height={0}
          unoptimized={true}
          style={{ height: "auto" }}
        />
      </>
    ),
  };

  return <div className="post-image">{content[post]}</div>;
}

"use client";

import { useEffect } from "react";

type Props = {
  src: string;
  id?: string;
  restartOnScrollIntoView?: boolean;
};

function Video({ src, id = "", restartOnScrollIntoView = true }: Props) {
  useEffect(function mount() {
    function onScroll() {
      const viewportTop = window.scrollY;
      const viewportBottom = window.scrollY + window.innerHeight;
      const video = document.getElementById(
        "actordentify-card-video"
      ) as HTMLVideoElement;
      if (!video) {
        return;
      }
      const videoTop = video.getBoundingClientRect().top + window.scrollY;
      const videoBottom = video.getBoundingClientRect().bottom + window.scrollY;
      if (videoTop < viewportBottom && videoBottom > viewportTop) {
        video.play();
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }

    window.addEventListener("scroll", onScroll);

    return function unMount() {
      window.removeEventListener("scroll", onScroll);
    };
  });

  return (
    <video
      src={src}
      // autoPlay false if restartOnScrollIntoView (handled by useEffect)
      autoPlay={!restartOnScrollIntoView}
      playsInline
      muted
      loop
      id={id}
    />
  );
}

export default Video;

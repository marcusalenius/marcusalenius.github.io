"use client";

import { useEffect } from "react";

type Props = {
  src: string;
  id?: string;
  className?: string;
  restartOnScrollIntoView?: boolean;
};

// className provided in case there is a group of videos that need to play in sync
export default function Video({
  src,
  id = "",
  className = "",
  restartOnScrollIntoView = true,
}: Props) {
  useEffect(function mount() {
    function onScroll() {
      const viewportTop = window.scrollY;
      const viewportBottom = window.scrollY + window.innerHeight;

      let videos: HTMLVideoElement[];
      if (className === "") {
        videos = [document.getElementById(id)] as HTMLVideoElement[];
      } else {
        videos = Array.from(
          document.getElementsByClassName(className)
        ) as HTMLVideoElement[];
      }

      videos.forEach((video) => {
        if (!video) {
          return;
        }
        const videoTop = video.getBoundingClientRect().top + window.scrollY;
        const videoBottom =
          video.getBoundingClientRect().bottom + window.scrollY;
        if (videoTop < viewportBottom && videoBottom > viewportTop) {
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });
    }

    window.addEventListener("scroll", onScroll);
    // in case video in viewport on page load
    onScroll();

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
      className={className}
    />
  );
}

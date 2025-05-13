"use client";

import { useRef, useEffect, useState } from "react";
import classes from "./VideoPlayer.module.css";

// import useFullscreenVideo from "./useFullscreenVideo";

// function isWebView() {
//   const userAgent = navigator.userAgent || navigator.vendor || window.opera;

//   const isIOSWebView =
//     /iPhone|iPod|iPad/.test(userAgent) && !/Safari/.test(userAgent);

//   const isAndroidWebView =
//     /Android/.test(userAgent) &&
//     /Version\/[\d.]+/.test(userAgent) &&
//     !/Chrome\/[\d.]+/.test(userAgent);

//   return isIOSWebView || isAndroidWebView;
// }

const VideoPlayer = ({ src, onEnded = () => {} }) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  if (!src) return null;

  const handlePlay = () => {
    if (videoRef.current) {
      // Allow unmuting after user interaction
      setIsMuted(false);
    }
  };

  return (
    <div className={classes.main}>
      <video
        ref={videoRef}
        className={classes.video}
        playsInline
        autoPlay
        muted={isMuted}
        controls
        onPlay={handlePlay}
        onEnded={onEnded}
        // controlsList={isWebView() ? "nofullscreen" : "fullscreen"}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;

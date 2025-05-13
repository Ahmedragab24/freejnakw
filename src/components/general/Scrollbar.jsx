"use client";

import { useEffect, useState, useRef } from "react";
import classes from "./Scrollbar.module.css";

function Scrollbar() {
  const [scrollDistance, setScrollDistance] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const isScrollingRef = useRef(false);
  const [thumbHeight, setThumbHeight] = useState(0);
  const isThumbPressedRef = useRef(false);
  const thumbStartMovePosition = useRef(0);
  const currentTimeoutRef = useRef(0);

  const handleThumbPressed = (e) => {
    isThumbPressedRef.current = true;
    thumbStartMovePosition.current = e.clientY;
    isScrollingRef.current = true;
  };

  const handleMoveThumb = (e) => {
    if (!isThumbPressedRef.current) return;

    const maxScroll = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const maxScrollTop = maxScroll - viewportHeight;
    const viewportHeightToScrollableScRatio = viewportHeight / maxScroll;
    const maxThumbScrollDistance =
      viewportHeightToScrollableScRatio * maxScrollTop;

    const deltaY = event.clientY - thumbStartMovePosition.current;

    setScrollDistance((prev) => {
      const newScrollDistance =
        prev + deltaY < maxThumbScrollDistance ? prev + deltaY : prev;

      return newScrollDistance;
    });

    document.documentElement.scrollBy({
      top: deltaY / viewportHeightToScrollableScRatio,
    });

    thumbStartMovePosition.current = e.clientY;
  };

  const handleMouseUp = (e) => {
    isThumbPressedRef.current = false;
    isScrollingRef.current = false;
  };

  useEffect(() => {
    const maxScroll = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const viewportHeightToScrollableScRatio = viewportHeight / maxScroll;

    // 1. Set the thumb height relative to the viewport height
    const thumbHeight = viewportHeightToScrollableScRatio * viewportHeight;
    setThumbHeight(thumbHeight);

    document.addEventListener("scroll", (e) => {
      const scrolledDistance = e.target.documentElement.scrollTop;
      const maxScroll = e.target.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const viewportHeightToScrollableScRatio = viewportHeight / maxScroll;

      // 1. Set the thumb height relative to the viewport height
      const thumbHeight = viewportHeightToScrollableScRatio * viewportHeight;
      setThumbHeight(thumbHeight);

      // 2. Show Custom Scrollbar and auto hide it
      clearTimeout(currentTimeoutRef.current);
      setIsScrolling(true);
      currentTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 2000);

      // 3. Set the thumb distance from top
      setScrollDistance(viewportHeightToScrollableScRatio * scrolledDistance);
    });

    window.addEventListener("resize", (e) => {
      const maxScroll = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const viewportHeightToScrollableScRatio = viewportHeight / maxScroll;

      // 1. Set the thumb height relative to the viewport height
      const thumbHeight = viewportHeightToScrollableScRatio * viewportHeight;
      setThumbHeight(thumbHeight);
    });

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMoveThumb);
  }, []);

  return (
    <div
      className={`${classes.main} ${
        isScrolling || isScrollingRef.current ? classes.show : ""
      }`}
      style={{ paddingTop: scrollDistance }}
    >
      <div
        className={classes.thumb}
        style={{ height: thumbHeight }}
        onMouseDown={handleThumbPressed}
      ></div>
    </div>
  );
}

export default Scrollbar;

"use client";

import { useEffect, useRef } from "react";

const ClickOutsideWrapper = ({ children, onClickOutside, className }) => {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onClickOutside?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [onClickOutside]);

  return (
    <div className={className} ref={wrapperRef}>
      {children}
    </div>
  );
};

export default ClickOutsideWrapper;

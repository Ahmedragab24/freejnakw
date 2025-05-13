"use client";

import { useEffect } from "react";

const ReloadWarning = () => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault(); // Required for some browsers
      event.returnValue = ""; // For older browsers
      return ""; // For modern browsers
    };

    // Attach event listeners
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null; // This component does not render anything visible
};

export default ReloadWarning;

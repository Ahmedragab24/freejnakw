import { useEffect, useState } from "react";
import classes from "./ImagePreviewer.module.css";
import Image from "next/image";

function ImagePreviewer({ show, onToggle, image }) {
  const [isImageVeryWide, setIsImageVeryWide] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!image) return;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const windowAspectRatio = viewportWidth / viewportHeight;

    // Check if the image is very wide compared to the viewport
    const img = document.getElementById("myImg");
    if (img) {
    img.onload = function () {
      const ImageAspectRatio = img.naturalWidth / img.naturalHeight;
      setIsImageVeryWide(ImageAspectRatio > windowAspectRatio);
    };
      img.onerror = function() {
        setImageError(true);
      };
    }
  }, [image]);

  if (!show || !image || imageError) return null;

  return (
    <>
      <div className={`backdrop ${show ? "active" : ""}`} />
      <div
        className={`${classes.main} ${show ? classes.active : ""} ${
          isImageVeryWide ? classes.wide : ""
        }`}
      >
        <span className={classes.closePreviewer} onClick={onToggle}>
          ×
        </span>
        <div className={classes.imageWrapper}>
        <Image
          id="myImg"
          src={image}
          alt="image previewer"
            width={800}
            height={600}
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain'
            }}
            priority
        />
        </div>
      </div>
    </>
  );
}

export default ImagePreviewer;

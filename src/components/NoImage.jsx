import React, { useState, useEffect } from "react";

const NoImage =
  "https://upload.wikimedia.org/wikipedia/commons/f/f9/No-image-available.jpg";
function ImageWithFallback({ src, alt }) {
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    setImageSrc(src);

    const img = new Image();
    img.src = src;

    img.onload = () => {
      setImageSrc(src);
    };

    img.onerror = () => {
      setImageSrc(NoImage);
    };
  }, [src]);

  return <img src={imageSrc} alt={alt} />;
}

export default ImageWithFallback;

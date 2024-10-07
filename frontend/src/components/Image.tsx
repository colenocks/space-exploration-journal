import { useState } from "react";

interface IProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  style?: { [key: string]: string };
}

const Image = ({ src, alt, fallbackSrc, className = "", style = {} }: IProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  // Fallback to default image if an error occurs while loading
  const handleError = () => {
    if (fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt || "image"} // Default alt in case not provided
      className={className}
      style={style}
      loading='lazy' // Enable lazy loading
      onError={handleError} // Fallback on error
    />
  );
};

export default Image;

import { useState } from "react";

interface Props {
  image: string;
  alt?: string;
  video?: string;
}

const WorkImage = ({ image, alt, video }: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const handleMouseEnter = async () => {
    if (video) {
      setIsVideo(true);
      const response = await fetch(`src/assets/${video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideoUrl(blobUrl);
    }
  };

  const handleMouseLeave = () => {
    setIsVideo(false);
    setVideoUrl("");
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(image, "_blank");
  };

  return (
    <div
      className="work-image"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      data-cursor="disable"
      style={{ cursor: "pointer" }}
    >
      <div className="work-image-in">
        <img src={image} alt={alt} />
        {isVideo && (
          <video src={videoUrl} autoPlay muted playsInline loop></video>
        )}
      </div>
    </div>
  );
};

export default WorkImage;

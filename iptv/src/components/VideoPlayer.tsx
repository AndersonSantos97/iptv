import React from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps{
    url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
    return (
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <ReactPlayer
          url={url}
          controls
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      </div>
    );
};

export default VideoPlayer;
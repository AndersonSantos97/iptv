import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log("🎥 HLS cargado correctamente");
        });

        return () => hls.destroy();
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = url;
      }
    }
  }, [url]);

  return (
    <video
      ref={videoRef}
      controls
      autoPlay
      className="w-[80%] h-[80%] max-w-4xl bg-black"
    />
  );
};

export default VideoPlayer;
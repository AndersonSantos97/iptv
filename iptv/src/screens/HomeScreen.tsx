import React, { useState, useEffect } from "react";
import VideoPlayer from "../components/VideoPlayer";
import { parseM3U, Channel } from "../services/m3uService";

const HomeScreen: React.FC = () => {
    const [channels, setChannels] = useState<Channel[]>([]);
    const [currentChannel, setCurrentChannel] = useState<string>("");
  
    useEffect(() => {
      const loadChannels = async () => {
        try {
          const parsedChannels = await parseM3U("/playlist.m3u"); // Ruta relativa
          setChannels(parsedChannels);
        } catch (error) {
          console.error("Error loading M3U file:", error);
        }
      };
  
      loadChannels();
    }, []);

    return (
        <div>
            <h1>IPTV App</h1>
            <div style={{ display: "flex" }}>
            <ul style={{ width: "30%", padding: "10px", borderRight: "1px solid #ccc" }}>
                {channels.map((channel, index) => (
                <li key={index} style={{ marginBottom: "10px" }}>
                    <button
                    style={{ padding: "10px", cursor: "pointer" }}
                    onClick={() => setCurrentChannel(channel.url)}
                    >
                    {channel.name}
                    </button>
                </li>
                ))}
            </ul>
            <div style={{ width: "70%", padding: "10px" }}>
                {currentChannel ? (
                <VideoPlayer url={currentChannel} />
                ) : (
                <p>Selecciona un canal para comenzar a ver.</p>
                )}
            </div>
            </div>
        </div>
    );
};

export default HomeScreen;
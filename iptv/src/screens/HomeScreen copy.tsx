import React, { useState, useEffect } from "react";
import VideoPlayer from "../components/VideoPlayer";
import { parseM3U, Channel } from "../services/m3uService";

const HomeScreen: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [currentChannel, setCurrentChannel] = useState<string>(localStorage.getItem("lastChannel") || "");

  const loadChannels = async () => {
    try {
      const token = localStorage.getItem("token"); // Obtener token
      if (!token) {
        throw new Error("No hay token disponible");
      }

      const response = await fetch("https://iptv-org.github.io/iptv/languages/spa.m3u");
      const m3uText = await response.text(); // Obtener el texto del archivo M3U
      const parsedChannels = parseM3U(m3uText); // Función para parsear el M3U

      setChannels(parsedChannels); // Establecer los canales
    } catch (error) {
      console.error("Error al cargar los canales:", error);
      setChannels([]); // Evitar el error de `map` cuando no hay datos
    }
  };

  useEffect(() => {
    loadChannels();
  }, []);

  useEffect(() => {
    if (currentChannel) {
      localStorage.setItem("lastChannel", currentChannel);
    }
  }, [currentChannel]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl mb-4">IPTV App</h1>
      <div className="flex w-full h-full">
        <ul className="w-1/4 p-4 border-r border-gray-600">
          {channels.length > 0 ? (
            channels.map((channel, index) => (
              <li key={index} className="mb-4">
                <button
                  className="w-full p-3 bg-gray-800 hover:bg-gray-700 rounded-lg"
                  onClick={() => setCurrentChannel(channel.url)}
                >
                  {channel.name}
                </button>
              </li>
            ))
          ) : (
            <p>No hay canales disponibles.</p>
          )}
        </ul>
        <div className="flex-1 p-4 flex justify-center items-center">
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

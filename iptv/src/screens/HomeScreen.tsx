import React, { useState, useEffect } from "react";
import VideoPlayer from "../components/VideoPlayer";
import { parseM3U, Channel } from "../services/m3uService";  // Asegúrate de tener la función parseM3U correctamente implementada

const HomeScreen: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [currentChannel, setCurrentChannel] = useState<string>(localStorage.getItem("lastChannel") || "");

  const loadChannels = async () => {
    try {
      // Obtener el archivo M3U
      const response = await fetch("https://iptv-org.github.io/iptv/languages/spa.m3u", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("No se pudo obtener el archivo M3U");
      }

      const m3uData = await response.text();  // Obtenemos el contenido del archivo M3U como texto
      const parsedChannels = parseM3U(m3uData);  // Usa tu función parseM3U para obtener los canales
      setChannels(parsedChannels);  // Guarda los canales en el estado

    } catch (error) {
      console.error("Error al cargar los canales:", error);
    }
  };

  const loadChannel = async (channelUrl: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No hay token disponible");
      }

      const response = await fetch(`http://127.0.0.1:8000/proxy?url=${encodeURIComponent(channelUrl)}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo obtener el archivo M3U`);
      }

      const data = await response.blob();
      const videoUrl = URL.createObjectURL(data);
      setCurrentChannel(videoUrl);
    } catch (error) {
      console.error("Error al cargar el canal:", error);
    }
  };

  useEffect(() => {
    loadChannels();  // Cargar los canales al inicio
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
                  onClick={() => setCurrentChannel(channel.url)}  // Cargar el canal seleccionado
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

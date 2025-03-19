import React, { useState, useEffect } from "react";
import VideoPlayer from "../components/VideoPlayer";
import { useNavigate } from "react-router-dom";
import { parseM3U, Channel, validateChannels } from "../services/m3uService";

const M3U_URL = "https://iptv-org.github.io/iptv/index.m3u";

const HomeScreen: React.FC = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [currentChannel, setCurrentChannel] = useState<string>(
    localStorage.getItem("lastChannel") || ""
  );
  const navigate = useNavigate();

  /** 🔹 Cargar y filtrar canales */
  const loadChannels = async () => {
    try {
      console.log("📡 Descargando lista de canales...");
      const response = await fetch(M3U_URL);

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }

      const m3uData = await response.text();
      console.log("✅ Archivo M3U descargado.");

      const parsedChannels = await parseM3U(m3uData);
      if (!parsedChannels || parsedChannels.length === 0) {
        throw new Error("⚠️ No se encontraron canales en la lista M3U");
      }

      console.log("📺 Canales obtenidos:", parsedChannels);
      setChannels(parsedChannels);
    } catch (error) {
      console.error("❌ Error al cargar los canales:", error);
    }
  };

  /** 🔹 Seleccionar un canal y guardarlo en LocalStorage */
  const loadChannel = (channelUrl: string) => {
    console.log("▶️ Cargando canal:", channelUrl);
    setCurrentChannel(channelUrl);
    localStorage.setItem("lastChannel", channelUrl);
  };

  useEffect(() => {
    loadChannels(); // Cargar los canales al inicio
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl mb-4">IPTV App</h1>
      <button
        className="absolute top-4 left-4 bg-gray-700 text-white px-4 py-2 rounded"
        onClick={() => navigate("/")} // 🔹 Volver a la pantalla de bienvenida
      >
        Regresar
      </button>
      <div className="flex w-full h-[80vh]"> {/* 🔹 Altura fija para evitar que crezca demasiado */}
        
        {/* 🔹 Lista de canales con scroll */}
        <div className="w-1/4 p-4 border-r border-gray-600 overflow-y-auto max-h-[80vh]">
          <ul>
            {channels.length > 0 ? (
              channels.map((channel, index) => (
                <li key={index} className="mb-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
                    onClick={() => loadChannel(channel.url)}
                  >
                    {channel.name}
                  </button>
                </li>
              ))
            ) : (
              <p>Cargando canales...</p>
            )}
          </ul>
        </div>
  
        {/* 🔹 Reproductor de video con tamaño fijo */}
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
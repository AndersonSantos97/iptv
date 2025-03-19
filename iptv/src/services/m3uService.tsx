export interface Channel {
  name: string;
  url: string;
}

/** 🔹 Parsear el archivo M3U */
export const parseM3U = async (m3uText: string): Promise<Channel[]> => {
  const lines = m3uText.split("\n");
  const channels: Channel[] = [];
  let currentChannel: Channel | null = null;

  for (let line of lines) {
    line = line.trim();

    if (line.startsWith("#EXTINF:")) {
      const name = line.split(",")[1]?.trim();
      currentChannel = { name: name || "Desconocido", url: "" };
    } else if (line && currentChannel) {
      currentChannel.url = line;
      channels.push(currentChannel);
      currentChannel = null;
    }
  }

  return channels;
};

/** 🔹 Validar URLs de los canales */
export const validateChannels = async (channels: Channel[]): Promise<Channel[]> => {
  const validChannels: Channel[] = [];

  for (const channel of channels) {
    try {
      const res = await fetch(channel.url, { method: "GET" }); // ⚠️ HEAD puede fallar con m3u8
      if (res.ok) {
        validChannels.push(channel);
      }
    } catch (error) {
      console.warn("⚠️ Canal no accesible:", channel.url);
    }
  }

  return validChannels;
};
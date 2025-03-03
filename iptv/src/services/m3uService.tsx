export interface Channel {
    name: string;
    url: string;
  }
  
  export const parseM3U = (m3uText: string): Channel[] => {
    const lines = m3uText.split("\n");
    const channels: Channel[] = [];
    let currentChannel: Channel | null = null;
  
    lines.forEach(line => {
      if (line.startsWith("#EXTINF:")) {
        const name = line.split(",")[1]?.trim();
        currentChannel = { name: name || "Desconocido", url: "" };
      } else if (line && currentChannel) {
        currentChannel.url = line.trim();
        channels.push(currentChannel);
        currentChannel = null; // Reset para el siguiente canal
      }
    });
  
    return channels;
  };
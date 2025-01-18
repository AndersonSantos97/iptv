import axios from "axios";

export interface Channel {
    name: string;
    url: string;
}

export const parseM3U = async (filePath: string): Promise<Channel[]> => {
    const response = await axios.get(filePath);
    const lines = response.data.split("\n");

    const channels: Channel[] = [];
    let currentChannel: Partial<Channel> = {};

    lines.forEach((line: string) => {
        line = line.trim();
        if (line.startsWith("#EXTINF")){
            const nameMatch = line.match(/,(.+)/); // Extract name after ","
            if (nameMatch) {
              currentChannel.name = nameMatch[1];
            }
        }else if(line && !line.startsWith("#")){
            currentChannel.url = line;
            if (currentChannel.name && currentChannel.url) {
                channels.push(currentChannel as Channel);
                currentChannel = {};
              }
        }
    });

    return channels;
}
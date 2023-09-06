import { Artist } from "@/types";
import { Logger } from "./logger";
import { PythonShell } from "python-shell";

class YTMusic {
  private pyShell: PythonShell;

  constructor() {
    this.pyShell = new PythonShell("script.py", {
      scriptPath: "./src/loaders/ytmusicapi/",
      pythonOptions: ["-u"],
    });

    this.pyShell.on("stderr", (err) => {
      Logger.error(err);
    });
  }

  sendRequest(request: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const uniqueId = Math.random().toString(36).substring(2);

      this.pyShell.send(JSON.stringify({ ...request, requestId: uniqueId }));

      this.pyShell.once("message", (raw) => {
        try {
          const response = JSON.parse(raw);
          if (response.requestId == uniqueId) resolve(response.data);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  async search(query: string, filter?: string): Promise<any> {
    const request = {
      action: "search",
      payload: { query, filter },
    };

    return this.sendRequest(request);
  }

  async getSong(songId: string): Promise<any> {
    const request = {
      action: "getSong",
      payload: { id: songId },
    };

    return this.sendRequest(request);
  }

  async getLyrics(songId: string): Promise<any> {
    const request = {
      action: "getLyrics",
      payload: { id: songId },
    };

    return this.sendRequest(request);
  }

  async getArtist(artistId: string): Promise<any> {
    const request = {
      action: "getArtist",
      payload: { id: artistId },
    };

    return this.sendRequest(request);
  }

  async getAlbum(albumId: string): Promise<any> {
    const request = {
      action: "getAlbum",
      payload: { id: albumId },
    };

    return this.sendRequest(request);
  }

  async getPlaylist(playlistId: string): Promise<any> {
    const request = {
      action: "getPlaylist",
      payload: { id: playlistId },
    };

    return this.sendRequest(request);
  }

  async getWatchlist(songId: string): Promise<any> {
    const request = {
      action: "getWatchlist",
      payload: { id: songId },
    };

    return this.sendRequest(request);
  }
}

export var ytMusic: YTMusic;

export const ytMusicLoader = () => {
  ytMusic = new YTMusic();
};

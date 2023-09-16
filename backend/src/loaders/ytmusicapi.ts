import { Artist } from "@/types";
import { Logger } from "./logger";
import { PythonShell } from "python-shell";
import hash from "object-hash";

class YTMusic {
  private pyShell: PythonShell;
  private cachedResponses: {
    hash: string;
    data: any;
  }[] = [];

  constructor() {
    this.pyShell = new PythonShell("script.py", {
      scriptPath: "./src/loaders/ytmusicapi/",
      pythonOptions: ["-u"],
    });

    this.pyShell.on("stderr", (err) => {
      Logger.error(err);
    });
  }

  // TODO clear old cache entries after a while
  sendRequest(request: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const requestHash = hash(request);

      const cached = this.cachedResponses.find(
        (response) => response.hash == requestHash
      );

      if (cached) return resolve(cached.data);

      this.pyShell.send(JSON.stringify({ ...request, requestHash }));

      this.pyShell.once("message", (raw) => {
        try {
          const response = JSON.parse(raw);
          if (response.hash == requestHash) {
            resolve(response.data);
            this.cachedResponses.push(response);
          }
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

  async getArtistAlbums(browseId: string): Promise<any> {
    const request = {
      action: "getArtistAlbums",
      payload: { id: browseId },
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

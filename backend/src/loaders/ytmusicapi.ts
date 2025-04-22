import { Logger } from "./logger";
import { PythonShell } from "python-shell";
import hash from "object-hash";

type Request = {
  action: string;
  payload: any;
};

class YTMusic {
  private pyShell: PythonShell | undefined;
  private cachedResponses: {
    hash: string;
    data: any;
  }[] = [];

  constructor() {
    this.init();
  }

  private init() {
    this.pyShell = new PythonShell("script.py", {
      scriptPath: "./src/loaders/ytmusicapi/",
      pythonOptions: ["-u"],
    });

    this.pyShell.on("stderr", (err) => {
      Logger.error(err);
    });

    this.pyShell.on("close", () => {
      Logger.info("Restarting pyShell process");
      this.pyShell?.kill();
      this.init();
    });
  }

  private cache(response: any) {
    this.cachedResponses.push(response);
    // if (this.cachedResponses.length > 50) this.cachedResponses.shift();
  }

  sendRequest(request: Request): Promise<any> {
    return new Promise((resolve, reject) => {
      const requestHash = hash(request);

      const cached = this.cachedResponses.find(
        (response) => response.hash == requestHash
      );

      if (cached) return resolve(cached.data);

      this.pyShell?.send(JSON.stringify({ ...request, requestHash }));

      const onMessage = async (raw: any) => {
        try {
          const response = JSON.parse(raw);
          if (response.hash == requestHash) {
            resolve(response.data);
            this.cache(response);
            this.pyShell?.off("message", onMessage);
          }
        } catch (err) {
          this.pyShell?.off("message", onMessage);
          reject(err);
        }
      };

      this.pyShell?.on("message", onMessage);
    });
  }

  async search(query: string, filter?: string): Promise<any> {
    const request = {
      action: "search",
      payload: { query, filter },
    };

    return this.sendRequest(request);
  }

  async getSearchSuggested(query: string): Promise<any> {
    const request = {
      action: "getSearchSuggested",
      payload: { query },
    };

    return this.sendRequest(request);
  }

  async getSong(trackId: string): Promise<any> {
    const request = {
      action: "getSong",
      payload: { id: trackId },
    };

    return this.sendRequest(request);
  }

  async getLyrics(trackId: string): Promise<any> {
    const request = {
      action: "getLyrics",
      payload: { id: trackId },
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

  async getArtistAlbums(channelId: string, params: string): Promise<any> {
    const request = {
      action: "getArtistAlbums",
      payload: { id: channelId, params },
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

  async getWatchlist(trackId: string): Promise<any> {
    const request = {
      action: "getWatchlist",
      payload: { id: trackId },
    };

    return this.sendRequest(request);
  }

  async getSongRelated(browseId: string): Promise<any> {
    const request = {
      action: "getSongRelated",
      payload: { id: browseId },
    };

    return this.sendRequest(request);
  }

  async getCharts(): Promise<any> {
    const request = {
      action: "getCharts",
      payload: {},
    };

    return this.sendRequest(request);
  }

  async getMoodCategories(): Promise<any> {
    const request = {
      action: "getMoodCategories",
      payload: {},
    };

    return this.sendRequest(request);
  }

  async getMoodContent(params: string): Promise<any> {
    const request = {
      action: "getMoodContent",
      payload: { params },
    };

    return this.sendRequest(request);
  }
}

export var ytMusic: YTMusic;

export const ytMusicLoader = () => {
  ytMusic = new YTMusic();
};

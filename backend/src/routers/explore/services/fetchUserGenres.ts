import { AppError } from "@/types";
import { newInternalError } from "@/utils";

export const fetchUserGenres = async () => {
  try {
    const temp = [
      {
        title: "Indie",
        params: "ggMPOg1uX21NWWpBbU01SDgy",
        thumbnails: [
          {
            url: "https://zyae.net/static/images/music-genres/small/indie.jpg",
            width: 0,
            height: 0,
          },
          {
            url: "https://zyae.net/static/images/music-genres/indie.jpg",
            width: 0,
            height: 0,
          },
        ],
      },
      {
        title: "Hip-Hop",
        params: "ggMPOg1uX01sVVAwVmNXcEIx",
        thumbnails: [
          {
            url: "https://zyae.net/static/images/music-genres/small/hip-hop.jpg",
            width: 0,
            height: 0,
          },
          {
            url: "https://zyae.net/static/images/music-genres/hip-hop.jpg",
            width: 0,
            height: 0,
          },
        ],
      },
      {
        title: "Pop",
        params: "ggMPOg1uX1BmNzc2V2p0YXJ5",
        thumbnails: [
          {
            url: "https://zyae.net/static/images/music-genres/small/pop.jpg",
            width: 0,
            height: 0,
          },
          {
            url: "https://zyae.net/static/images/music-genres/pop.jpg",
            width: 0,
            height: 0,
          },
        ],
      },
      {
        title: "Country",
        params: "ggMPOg1uX1RXcFlyZEpRb1d3",
        thumbnails: [
          {
            url: "https://zyae.net/static/images/music-genres/small/country.jpg",
            width: 0,
            height: 0,
          },
          {
            url: "https://zyae.net/static/images/music-genres/country.jpg",
            width: 0,
            height: 0,
          },
        ],
      },
      {
        title: "Jazz",
        params: "ggMPOg1uX3lPcDFRaE9wM1BS",
        thumbnails: [
          {
            url: "https://zyae.net/static/images/music-genres/small/jazz.jpg",
            width: 0,
            height: 0,
          },
          {
            url: "https://zyae.net/static/images/music-genres/jazz.jpg",
            width: 0,
            height: 0,
          },
        ],
      },
      {
        title: "Rock",
        params: "ggMPOg1uXzJKTm5jUEZ5Uzlu",
        thumbnails: [
          {
            url: "https://zyae.net/static/images/music-genres/small/rock.jpg",
            width: 0,
            height: 0,
          },
          {
            url: "https://zyae.net/static/images/music-genres/rock.jpg",
            width: 0,
            height: 0,
          },
        ],
      },
    ];

    return temp;
  } catch (err) {
    if (err instanceof AppError) throw err;
    else throw newInternalError(err);
  }
};

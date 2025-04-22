import { GenreModel, PlaylistModel } from "@/models";
import { createPlaylist, fetchGenre } from "@/shared";

import { Genre } from "@/types";
import { Logger } from "@/loaders";

export const refreshGenres = async () => {
  const process = "job#RefreshGenres";
  Logger.info(process);

  const cards: {
    title: string;
    params: string;
    moods?: string[];
  }[] = [
    { title: "African", params: "ggMPOg1uX0UzWGxlRE5jMDVk" },
    { title: "Arabic", params: "ggMPOg1uX3VOQWxsblVZTFNE" },
    { title: "Blues", params: "ggMPOg1uX2NXUkgxdW0zUHJp" },
    { title: "Indian", params: "ggMPOg1uX2hacTRJOU5KcndD" },
    { title: "Brazilian", params: "ggMPOg1uX3Vmb2NXbUdLcHNU" },
    { title: "Christian", params: "ggMPOg1uX3E1VnpSRHhLVElG" },
    { title: "Classical", params: "ggMPOg1uX1N4VmduTmdUR3dm" },
    {
      title: "Country",
      params: "ggMPOg1uX1RXcFlyZEpRb1d3",
    },
    { title: "Electronic", params: "ggMPOg1uX1NPTld3SDN3WGs4" },
    { title: "Decades", params: "ggMPOg1uX3NjZllsNGVEMkZo" },
    { title: "Family", params: "ggMPOg1uXzMyY3J2SGM0bVh5" },
    { title: "Folk", params: "ggMPOg1uXzBTRFBmQ3N4b0R6" },
    {
      title: "Hip-Hop",
      params: "ggMPOg1uX01sVVAwVmNXcEIx",
      moods: [
        "655939501cc48bac2ce7fdcc",
        "65593981ee29268422c8baaa",
        "655939adb2d76bc53edff49f",
        "655939c4958519e595d4128b",
      ],
    },
    {
      title: "Indie",
      params: "ggMPOg1uX21NWWpBbU01SDgy",
    },
    { title: "J-Pop", params: "ggMPOg1uXzAwSjVITDBZckJR" },
    { title: "Jazz", params: "ggMPOg1uX3lPcDFRaE9wM1BS" },
    { title: "K-Pop", params: "ggMPOg1uX0JrbjBDOFFPSzJW" },
    { title: "Latin", params: "ggMPOg1uX29wWTRjMHV1dWN5" },
    {
      title: "Mandopop",
      params: "ggMPOg1uX2hXVUQwc0JTNXlE",
    },
    { title: "Metal", params: "ggMPOg1uXzdlSXhKZ0hMV1Z4" },
    { title: "OPM", params: "ggMPOg1uX2JScEx5R3J4bmp5" },
    { title: "Pop", params: "ggMPOg1uX1BmNzc2V2p0YXJ5" },
    { title: "R&B", params: "ggMPOg1uX2JxQ2hxc2J5UFhR" },
    { title: "Caribbean", params: "ggMPOg1uX1JUc2lFcDFuUUth" },
    { title: "Rock", params: "ggMPOg1uXzJKTm5jUEZ5Uzlu" },
    {
      title: "Soundtracks",
      params: "ggMPOg1uX2tWZXBsRm05cHNR",
    },
  ];

  try {
    for (var card of cards) {
      const ytGenre = await fetchGenre(card.params);

      var popularNowPlaylist = await PlaylistModel.findOne({
        title: `Popular Now – ${card.title}`,
      });

      if (popularNowPlaylist) {
        popularNowPlaylist.tracks = ytGenre.tracks;
        popularNowPlaylist.trackCount = ytGenre.tracks.length;
        popularNowPlaylist.save();
      } else
        popularNowPlaylist = await createPlaylist({
          title: `Popular Now – ${card.title}`,
          author: {
            name: "Zyae Music",
            id: null,
          },
          tracks: ytGenre.tracks,
          compressed: true,
        });

      const genre: Genre = {
        ...ytGenre,
        title: card.title,
        thumbnails: [
          {
            url: `https://zyae.net/static/images/music-genres/small/${card.title.toLowerCase()}.jpg`,
            height: 0,
            width: 0,
          },
          {
            url: `https://zyae.net/static/images/music-genres/${card.title.toLowerCase()}.jpg`,
            height: 0,
            width: 0,
          },
        ],
        tracks: { id: popularNowPlaylist.id, results: ytGenre.tracks },
        moods: card.moods,
      };

      await GenreModel.updateOne(
        { params: genre.params },
        { $set: genre },
        { upsert: true }
      );
    }
  } catch (err) {
    console.log(err);
  }
};

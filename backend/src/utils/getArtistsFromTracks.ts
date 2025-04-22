import { CondRet } from "@/types/utils/CondRet";
import { Track } from "@/types";
import { joinStringArray } from "./joinStringArray";

export const getArtistsFromTracks = <T extends boolean>(
  tracks: Track[],
  options: { stringify?: T; limit?: number } = {
    stringify: false as T,
    limit: undefined,
  }
): CondRet<T, true, string, Track["artists"]> => {
  const artists = tracks
    .flatMap((track) => track.artists)
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.name === value.name)
    );

  if (options.limit) artists.length = options.limit;

  if (options.stringify)
    return joinStringArray(artists.map((artist) => artist.name)) as CondRet<
      T,
      true,
      string,
      Track["artists"]
    >;
  else return artists as CondRet<T, true, string, Track["artists"]>;
};

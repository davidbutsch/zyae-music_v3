import { Playlist } from "@/features/playlists";
import { useAppSelector } from "@/hooks";
import { useQuery } from "@tanstack/react-query";

export const useArtistSavedTracks = (artistId?: string) => {
  const tracksId = useAppSelector((state) => state.user?.tracksId);
  const { data: savedTracks } = useQuery<Playlist>(["playlist", tracksId], {
    enabled: false,
  });

  const tracks = savedTracks?.tracks.filter((track) =>
    track.artists.find((artist) => artist.id == artistId)
  );

  return tracks || [];
};

import { useArtist, useArtistSavedTracks } from "..";

import { TracksListPage } from "@/components";
import { useParams } from "react-router-dom";

export const ArtistSaved = () => {
  const { artistId } = useParams();
  if (!artistId) return;
  const { data: artist } = useArtist(artistId);
  const tracks = useArtistSavedTracks(artistId);

  return <TracksListPage title={artist?.name || ""} tracks={tracks} />;
};

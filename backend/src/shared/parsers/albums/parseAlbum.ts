import { Album, AlbumCard, Track } from "@/types";

import { getColors } from "@/shared/services";

export const parseAlbum = async (id: string, ytAlbum: any): Promise<Album> => {
  const palette = await getColors(ytAlbum.thumbnails[0].url);

  const tracks: Track[] = ytAlbum.tracks.map((track: any): Track => {
    return {
      id: track.videoId,
      title: track.title,
      thumbnails: ytAlbum.thumbnails,
      duration: track.duration,
      artists: track.artists,
      album: {
        id: id,
        title: ytAlbum.title,
      },
      isAvailable: track.isAvailable,
      isExplicit: track.isExplicit,
    };
  });

  const otherVersions: AlbumCard[] = ytAlbum.other_versions?.map(
    (album: any): AlbumCard => ({
      id: album.browseId,
      title: album.title,
      thumbnails: album.thumbnails,
      year: album.year,
      sub: `${album.year}`,
      isExplicit: album.isExplicit,
    })
  );

  const album: Album = {
    id,
    playlistId: ytAlbum.audioPlaylistId,
    description: ytAlbum.description,
    title: ytAlbum.title,
    palette,
    artists: ytAlbum.artists,
    year: ytAlbum.year,
    trackCount: ytAlbum.trackCount,
    duration: ytAlbum.duration,
    type: ytAlbum.type,
    thumbnails: ytAlbum.thumbnails,
    tracks,
    otherVersions,
  };

  return album;
};

import { AlbumCard, Artist, ArtistCard, Track } from "@/types";

import { getColors } from "@/shared/services";
import { getThumbnail } from "@/utils";

export const parseArtist = async (
  ytArtist: any,
  artistId?: string
): Promise<Artist> => {
  const palette = await getColors(ytArtist.thumbnails[0].url);
  const tracks: Track[] = ytArtist.songs?.results
    ? ytArtist.songs.results.map((track: any): Track => {
        return {
          id: track.videoId,
          title: track.title,
          thumbnails: [
            getThumbnail(track.thumbnails[0], 60),
            getThumbnail(track.thumbnails[0], 544),
          ],
          duration: track.duration,
          artists: track.artists,
          album: {
            id: track.album.id,
            title: track.album.name,
          },
          isAvailable: track.isAvailable,
          isExplicit: track.isExplicit,
        };
      })
    : [];
  const albums: AlbumCard[] = ytArtist.albums?.results
    ? ytArtist.albums.results.map(
        (album: any): AlbumCard => ({
          id: album.browseId,
          title: album.title,
          thumbnails: [getThumbnail(album.thumbnails[0], 256)],
          year: album.year,
          sub: `${album.year}`,
          isExplicit: album.isExplicit,
        })
      )
    : [];
  const singles: AlbumCard[] = ytArtist.singles?.results
    ? ytArtist.singles.results.map(
        (album: any): AlbumCard => ({
          id: album.browseId,
          title: album.title,
          thumbnails: album.thumbnails,
          year: album.year,
          sub: `${album.year}`,
          isExplicit: album.isExplicit,
        })
      )
    : [];
  const videos: Track[] = ytArtist.videos?.results
    ? ytArtist.videos.results.slice(0, 5).map((video: any): Track => {
        return {
          id: video.videoId,
          title: video.title,
          thumbnails: [
            getThumbnail(video.thumbnails[0], 60),
            getThumbnail(video.thumbnails[0], 544),
          ],
          artists: video.artists,
        };
      })
    : [];
  const similar: ArtistCard[] = ytArtist.related?.results
    ? ytArtist.related.results.map(
        (artist: any): ArtistCard => ({
          id: artist.browseId,
          name: artist.title,
          thumbnails: artist.thumbnails,
        })
      )
    : [];
  const artist: Artist = {
    id: artistId || ytArtist.channelId,
    description: ytArtist.description,
    views: ytArtist.views,
    name: ytArtist.name,
    saved: false,
    palette: palette,
    banners: {
      mobile: getThumbnail(ytArtist.thumbnails[0], 1440, 1440).url,
      desktop: getThumbnail(ytArtist.thumbnails[0], 2880, 1800).url,
    },
    thumbnails: [
      getThumbnail(ytArtist.thumbnails[0], 256),
      getThumbnail(ytArtist.thumbnails[0], 512),
    ],
    tracks: {
      id: ytArtist.songs.browseId,
      results: tracks,
    },
    albums: {
      id: ytArtist.albums?.browseId || null,
      results: albums,
    },
    singles: {
      id: ytArtist.singles?.browseId || null,
      results: singles,
    },
    videos: {
      id: ytArtist.videos?.browseId || null,
      results: videos,
    },
    similar: {
      id: null,
      results: similar,
    },
  };
  return artist;
};

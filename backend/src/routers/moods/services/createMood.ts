import {
  AlbumCard,
  AppError,
  Mood,
  MoodRow,
  MoodTemplate,
  PlaylistCard,
} from "@/types";
import {
  fetchAlbumData,
  fetchGenre,
  fetchPlaylistData,
  getColors,
} from "@/shared";

import { MoodModel } from "@/models";
import { getArtistsFromTracks } from "@/utils";
import { newInternalError } from "@/utils";

export const createMood = async (moodTemplate: MoodTemplate) => {
  try {
    const rows = await Promise.all(
      moodTemplate.rows
        .map(async (row): Promise<MoodRow | undefined> => {
          if (row.variant === "tracks") {
            if (!row.playlistId) return;

            const playlist = await fetchPlaylistData(row.playlistId);
            return {
              variant: "tracks",
              playlistId: row.playlistId,
              results: playlist.tracks,
            };
          } else if (row.variant === "playlists") {
            const playlists = await Promise.all(
              row.cardIds.map(async (cardId): Promise<PlaylistCard> => {
                const playlist = await fetchPlaylistData(cardId);

                return {
                  id: cardId,
                  title: playlist.title,
                  thumbnails: playlist.thumbnails,
                  author: playlist.author.name,
                  sub: `Featuring ${getArtistsFromTracks(playlist.tracks, {
                    stringify: true,
                    limit: 3,
                  })}`,
                };
              })
            );

            return {
              variant: "playlists",
              results: playlists,
            };
          } else if (row.variant === "albums") {
            const albums = await Promise.all(
              row.cardIds.map(async (cardId): Promise<AlbumCard> => {
                const album = await fetchAlbumData(cardId);

                return {
                  id: cardId,
                  title: album.title,
                  thumbnails: album.thumbnails,
                  sub: album.artists[0].name,
                };
              })
            );

            return {
              variant: "albums",
              results: albums,
            };
          } else return;
        })
        .filter(Boolean)
    );

    const filteredRows = rows.flatMap((row) => (!!row ? [row] : []));

    const genre = await fetchGenre(moodTemplate.genre);
    const palette = await getColors(
      filteredRows[0].results[0].thumbnails[0].url
    );

    const mood: Mood = {
      title: moodTemplate.title,
      palette,
      genre: { params: genre.params, title: genre.title },
      rows: filteredRows,
    };

    const doc = new MoodModel(mood);
    await doc.save();

    return doc;
  } catch (err) {
    console.log(err);
    if (err instanceof AppError) throw err;
    else throw newInternalError(err);
  }
};

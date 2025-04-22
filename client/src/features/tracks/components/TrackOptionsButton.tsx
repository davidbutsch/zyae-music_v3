import { MenuHeader, OptionItem, OptionsList } from "@/features/menus";
import { useAddToPlaylist, useRemoveFromPlaylist } from "@/features/playlists";
import { useAppDispatch, useAppNavigate, useAppSelector } from "@/hooks";

import { FontIcon } from "@/components";
import { env } from "@/config";
import { ArtistText } from "@/features/artists";
import { useMenu } from "@/features/menus/hooks/useMenu";
import { useNotification } from "@/providers";
import { addToQueue } from "@/stores";
import { IconButton } from "@mui/material";
import { Track } from "..";
import { useTrackSavedStatus } from "../hooks";

export const TrackOptionsButton = ({ track }: { track?: Track }) => {
  const navigate = useAppNavigate();
  const dispatch = useAppDispatch();

  const trackOptionsMenu = useMenu();
  const artistsMenu = useMenu();

  const user = useAppSelector((state) => state.user);
  const addToPlaylistMutation = useAddToPlaylist(user?.tracksId!);
  const removeFromPlaylistMutation = useRemoveFromPlaylist(user?.tracksId!);
  const saved = useTrackSavedStatus(track?.id);

  const { setNotification } = useNotification();

  const artistsOptions =
    track?.artists.map((artist) => ({
      icon: "fi-rs-user-music",
      title: artist.name,
      onClick: () => {
        navigate(`../../artist/${artist.id}`);
      },
    })) || [];

  const trackOptions: OptionItem[] = [
    {
      icon: saved ? "zi-saved-solid" : "zi-save",
      title: saved ? "Remove from Saved Tracks" : "Add to Saved Tracks",
      onClick: () => {
        if (track)
          if (saved) removeFromPlaylistMutation.mutate(track?.id);
          else addToPlaylistMutation.mutate(track);
      },
      disabled: !Boolean(track),
    },
    {
      icon: "zi-save",
      title: "Add to playlist",
      onClick: () => {
        setNotification({
          message: "Not implemented",
          icon: "fi-rr-exclamation",
        });
      },
    },
    {
      icon: "fi-rr-plus",
      title: "Add to queue",
      onClick: () => {
        if (track) {
          setNotification({
            message: "Added to queue",
            thumbnail: track.thumbnails[0].url,
          });
          dispatch(addToQueue([track]));
        }
      },
    },
    {
      icon: "fi-rs-record-vinyl",
      title: "Go to album",
      onClick: () => {
        navigate(`../../album/${track?.album?.id}`);
      },
      disabled: Boolean(!track?.album),
    },
    {
      icon: "fi-rs-user-music",
      title: "Go to artist",
      onClick: (e) => {
        if (track?.artists.length == 1) artistsOptions[0]?.onClick();
        else artistsMenu.open(e);
      },
    },
    {
      icon: "fi-rr-download",
      title: "Download",
      onClick: () => {
        window.open(`${env.API_URL}/tracks/${track?.id}/download`);
      },
    },
    {
      icon: "zi-share",
      title: "Share",
      onClick: () => {
        setNotification({
          message: "Not implemented",
          icon: "fi-rr-exclamation",
        });
      },
    },
  ];

  return (
    <>
      <artistsMenu.Element {...artistsMenu.elementProps}>
        <OptionsList variant="sheet" items={artistsOptions || []} />
      </artistsMenu.Element>
      <trackOptionsMenu.Element
        {...trackOptionsMenu.elementProps}
        header={
          <MenuHeader
            head={track?.title}
            sub={`Track • ${ArtistText({ artists: track?.artists })}`}
            thumbnail={track?.thumbnails[0].url}
          />
        }
      >
        <OptionsList variant="sheet" items={trackOptions} />
      </trackOptionsMenu.Element>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          trackOptionsMenu.open(e);
        }}
      >
        <FontIcon icon="fi-rr-menu-dots-vertical" />
      </IconButton>
    </>
  );
};

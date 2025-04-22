import {
  BlurBackground,
  Content,
  DelayFade,
  FontIcon,
  LoadingBubblesPage,
  MobileHeader,
  Playing,
  ProgressiveImage,
  Spinner,
} from "@/components";
import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { PlaylistDetails, usePlaylist } from "@/features/playlists";
import {
  useAppNavigate,
  useAppSelector,
  useColorSort,
  useScroll,
} from "@/hooks";
import { useLocation, useParams } from "react-router-dom";
import {
  useSavePlaylist,
  useSavedStatus,
  useUnsaveItem,
} from "@/features/saved";

import { MenuHeader } from "@/features/menus";
import { Playlist } from "../types";
import { TracksList } from "@/features/tracks";
import { insertIf } from "@/utils";
import { theme } from "@/styles";
import { useMenu } from "@/features/menus/hooks/useMenu";
import { useQueue } from "@/features/player";

const PlaylistHead = ({ playlist }: { playlist: Playlist }) => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const { y } = useScroll();

  const { sortColors } = useColorSort(playlist.palette);
  const backgroundColors = sortColors(["area"]);

  return (
    <Stack
      direction={xs ? "column" : "row"}
      alignItems={"center"}
      gap={{ sm: 5 }}
      mb={{ xs: 4, sm: 0 }}
      sx={{
        pt: "calc(env(safe-area-inset-top))",
      }}
    >
      <BlurBackground
        colors={backgroundColors.map((color) => color.hex)}
        sx={{
          position: { xs: "fixed", sm: "absolute" },
          top: 0,
          left: 0,
          width: "100%",

          mask: "linear-gradient(#fff, transparent)",

          ...(!xs && { opacity: 0.25 }),
        }}
        style={{ height: `calc(60vh - ${y}px)` }}
      />
      <ProgressiveImage
        src={playlist.thumbnails[playlist.thumbnails.length - 1].url}
        sx={{
          position: "relative",
          height: "auto",
          width: {
            xs: "30vh",
            sm: 192,
            md: 224,
            lg: 256,
          },

          borderRadius: 1 / 2,
        }}
        style={{
          ...(xs && {
            transform: `scale(${Math.min(1.4, Math.max(0, (y - 750) / -750))})`,
            transformOrigin: "bottom",
          }),
        }}
      />
      <Stack
        position="relative"
        mt={{ xs: 2, sm: 0 }}
        maxWidth={{ xs: "100%", sm: "50%" }}
        width="100%"
        gap={{ xs: 1, sm: 2 }}
        textAlign={xs ? "center" : undefined}
      >
        <Typography
          variant="h4"
          fontSize={{ xs: 24, sm: 32, md: 40, xl: 48 }}
          fontWeight={500}
          sx={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",

            "@supports(-webkit-line-clamp: 2)": {
              whiteSpace: "initial",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            },
          }}
        >
          {playlist.title}
        </Typography>
        <Typography color="text.secondary">
          Playlist by {playlist.author.name}
        </Typography>
        {!xs && (
          <Typography color="text.secondary" mt={{ xs: -1, sm: -2 }}>
            {playlist.trackCount} {playlist.trackCount > 1 ? "tracks" : "track"}{" "}
            • {playlist.duration} • {playlist.year}
          </Typography>
        )}
        <PlaylistOptions playlist={playlist} />
      </Stack>
    </Stack>
  );
};

const SaveButton = ({ playlist }: { playlist: Playlist }) => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const user = useAppSelector((state) => state.user);

  const saved = useSavedStatus(playlist.id);
  const savePlaylistMutation = useSavePlaylist();
  const unsaveMutation = useUnsaveItem();

  return (
    <Button
      fullWidth={xs}
      sx={{ px: 2, gap: 1.5 }}
      variant="translucent"
      disabled={user?._id == playlist.author.id}
      onClick={() => {
        saved
          ? unsaveMutation.mutate(playlist.id)
          : savePlaylistMutation.mutate(playlist);
      }}
    >
      <FontIcon icon={`zi-${saved ? "saved-solid" : "save"}`} />
      {saved ? "saved" : "save"}
    </Button>
  );
};

const EditButton = ({ playlist }: { playlist: Playlist }) => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const editPlaylistMenu = useMenu({ variant: xs ? "sheet" : "popup" });

  return (
    <>
      <editPlaylistMenu.Element {...editPlaylistMenu.elementProps}>
        <PlaylistDetails playlist={playlist} close={editPlaylistMenu.close} />
      </editPlaylistMenu.Element>
      <Button
        onClick={editPlaylistMenu.open}
        fullWidth={xs}
        sx={{ px: 2, gap: 1.5 }}
        variant="translucent"
      >
        <FontIcon icon={`fi-rr-edit`} />
        Edit
      </Button>
    </>
  );
};

const PlaylistOptions = ({ playlist }: { playlist: Playlist }) => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const { playQueue, status } = useQueue({
    queueSource: {
      id: playlist.id,
      title: playlist.title,
      type: "playlist",
    },
    options: {
      shuffle: true,
      fixedIndex: undefined,
    },
  });

  const { queueSource, isPlaying, options } = useAppSelector(
    (state) => state.player
  );

  const shuffleActive =
    isPlaying &&
    queueSource.id &&
    queueSource.id == playlist.id &&
    options.shuffle;

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent={{ xs: "center", sm: "inherit" }}
      gap={2}
      mt={{ xs: 1, sm: 0 }}
    >
      <Button
        fullWidth={xs}
        sx={{ px: 2, gap: 1.5 }}
        variant="translucent"
        onClick={() => playQueue()}
      >
        {status == "loading" ? (
          <Spinner size={16} />
        ) : shuffleActive ? (
          <Playing />
        ) : (
          <FontIcon icon="fi fi-rr-shuffle" />
        )}
        Shuffle
      </Button>
      {playlist.userAccess.includes("edit:metadata") ? (
        <EditButton playlist={playlist} />
      ) : (
        <SaveButton playlist={playlist} />
      )}
    </Stack>
  );
};

const PlaylistContent = ({ playlist }: { playlist?: Playlist }) => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  if (!playlist) return <LoadingBubblesPage />;

  const title = queryParams.get("title") || playlist.title;

  const compressed =
    playlist.compressed || queryParams.get("compressed") === "true";

  return (
    <DelayFade
      in={Boolean(playlist)}
      sx={{
        pt: xs && compressed ? "calc(48px + env(safe-area-inset-top))" : 0,

        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      {!compressed && <PlaylistHead playlist={playlist} />}
      {!xs && compressed && (
        <Typography
          fontSize={{ xs: 24, sm: 32 }}
          fontWeight={500}
          sx={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",

            "@supports(-webkit-line-clamp: 2)": {
              whiteSpace: "initial",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            },
          }}
        >
          {title || playlist.title}
        </Typography>
      )}
      <TracksList
        queueSource={{
          id: playlist.id,
          title: title,
          type: "playlist",
          queryParams: location.search,
        }}
        variant="playlist"
        tracks={playlist.tracks}
        sx={{
          mt: { xs: -5, sm: "inherit" },
        }}
      />
    </DelayFade>
  );
};

export const PlaylistPage = () => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const editPlaylistMenu = useMenu({ variant: xs ? "sheet" : "popup" });
  const deletePlaylistMenu = useMenu({ variant: xs ? "sheet" : "popup" });

  const { playlistId } = useParams();
  if (!playlistId) return;

  const { data: playlist } = usePlaylist(playlistId);

  const compressed =
    playlist?.compressed || queryParams.get("compressed") === "true";

  const user = useAppSelector((state) => state.user);
  const saved = useSavedStatus(playlistId);
  const savePlaylistMutation = useSavePlaylist();
  const unsaveMutation = useUnsaveItem();

  const navigate = useAppNavigate();

  return (
    <Content
      sx={{
        position: "relative",
        pt: xs ? "48px !important" : undefined,
      }}
    >
      <editPlaylistMenu.Element {...editPlaylistMenu.elementProps}>
        <PlaylistDetails playlist={playlist} close={editPlaylistMenu.close} />
      </editPlaylistMenu.Element>
      <deletePlaylistMenu.Element
        {...deletePlaylistMenu.elementProps}
        header={<MenuHeader head="Confirm operation" />}
      >
        <Box
          sx={{
            p: 2,

            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="subtitle1">
            Are you sure you want to delete "{playlist?.title}"?
          </Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.6 }}>
            This playlist will be deleted and removed from your profile.
          </Typography>

          <Box
            sx={{
              p: 2,
              pt: 5,

              display: "flex",
              gap: 1,
            }}
          >
            <Button sx={{ ml: "auto" }} color="primary" variant="translucent">
              Cancel
            </Button>
            <Button
              onClick={() =>
                unsaveMutation.mutate(playlistId, {
                  onSuccess: () => navigate("/saved"),
                })
              }
            >
              Continue
            </Button>
          </Box>
        </Box>
      </deletePlaylistMenu.Element>
      {xs && (
        <MobileHeader
          head={queryParams.get("title") || playlist?.title || ""}
          fadeTrigger={{
            y: 1,
            fadeHeadY: !compressed ? 280 : undefined,
          }}
          options={
            !compressed
              ? {
                  headerOptions: {
                    type: "playlist",
                    head: playlist?.title,
                    sub: `Playlist • ${playlist?.author.name}`,
                    thumbnail: playlist?.thumbnails[0].url,
                  },
                  items: [
                    {
                      icon: saved ? "zi-saved-solid" : "zi-save",
                      title: saved ? "Remove from Saved" : "Add to Saved",
                      disabled: user?._id == playlist?.author.id,
                      onClick: saved
                        ? () => unsaveMutation.mutate(playlistId)
                        : () => savePlaylistMutation.mutate(playlist),
                    },
                    {
                      icon: "zi-share",
                      title: "Share",
                      onClick: () =>
                        navigator.share({
                          url: window.location.href,
                        }),
                    },
                    ...insertIf(
                      playlist?.userAccess.includes("edit:metadata") || false,
                      {
                        icon: "fi-rr-edit",
                        title: "Edit",
                        onClick: editPlaylistMenu.open,
                      }
                    ),
                    ...insertIf(
                      playlist?.userAccess.includes("delete") || false,
                      {
                        icon: "fi-rr-trash",
                        title: "Delete",
                        onClick: deletePlaylistMenu.open,
                      }
                    ),
                  ],
                }
              : undefined
          }
          sx={{
            "&:before": {
              transition: !compressed ? ".3s" : "0s",
            },
          }}
        />
      )}
      <PlaylistContent playlist={playlist} />
    </Content>
  );
};

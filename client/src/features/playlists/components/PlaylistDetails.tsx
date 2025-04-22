import {
  Box,
  Button,
  FormHelperText,
  FormLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { FontIcon, ProgressiveImage } from "@/components";
import { Playlist, useCreatePlaylist, useUpdatePlaylist } from "..";

import { useNotification } from "@/providers";
import { useState } from "react";

export const PlaylistDetails = ({
  playlist,
  close,
}: {
  playlist?: Playlist;
  close: () => void;
}) => {
  const [playlistTitle, setPlaylistTitle] = useState(playlist?.title || "");
  const [playlistDescription, setPlaylistDescription] = useState(
    playlist?.description || ""
  );

  const [isPublic, setIsPublic] = useState<boolean>(
    playlist?.permissions?.default
      ? playlist?.permissions?.default.includes("view")
      : false
  );

  const { setNotification } = useNotification();

  const createPlaylistMutation = useCreatePlaylist();
  const updatePlaylistMutation = useUpdatePlaylist(playlist?.id || "");

  return (
    <Box
      sx={{
        p: 2,

        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center !important",
          gap: 2,
        }}
      >
        <ProgressiveImage
          src="https://zyae.net/static/images/music/playlists/default-playlist.png"
          width={64}
          sx={{
            borderRadius: 1 / 2,
          }}
        />
        <Box>
          <Typography color="text.secondary">Name your playlist</Typography>
          <TextField
            placeholder="Playlist name"
            value={playlistTitle}
            onChange={(e) => setPlaylistTitle(e.currentTarget.value)}
            sx={{
              input: {
                padding: 0,

                fontSize: 26,
                fontWeight: 500,

                "&::placeholder": {
                  color: "rgba(255, 255, 255, .5)",
                },
              },
              "& fieldset": { border: "none" },
            }}
          />
        </Box>
      </Box>
      <Button
        onClick={() =>
          setNotification({
            message: "Not implemented",
            icon: "fi-rr-exclamation",
          })
        }
        size="small"
        variant="outlined"
        sx={{
          width: "fit-content",
          textTransform: "none",
        }}
      >
        <FontIcon icon="fi-br-link-alt" size={12} />
        Invite friends
      </Button>
      <TextField
        placeholder="Add description (optional)"
        value={playlistDescription}
        onChange={(e) => setPlaylistDescription(e.currentTarget.value)}
        multiline
        rows={4}
        sx={{
          "& .MuiOutlinedInput-root": {
            padding: 0,
          },
          "& .MuiOutlinedInput-input": {
            fontSize: 14,
            "&::placeholder": {
              color: "rgba(255, 255, 255, .5)",
            },
          },

          "& fieldset": { border: "none" },
        }}
      />
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <span>
          <FormLabel
            sx={{
              color: "#fff",
            }}
          >
            Public playlist
          </FormLabel>
          <FormHelperText sx={{ mt: 0, fontSize: 12 }}>
            Visible on your profile
          </FormHelperText>
        </span>
        <Switch
          size="small"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.currentTarget.checked)}
        />
      </Stack>
      <Button
        onClick={() => {
          const payload = {
            title: playlistTitle,
            description:
              playlistDescription == "" ? undefined : playlistDescription,
            public: isPublic,
          };
          if (!playlist) createPlaylistMutation.mutate(payload);
          else updatePlaylistMutation.mutate(payload);

          close();
        }}
        disabled={!Boolean(playlistTitle)}
        variant="contained"
        sx={{
          textTransform: "none",
        }}
      >
        {playlist ? "Update playlist" : "Create playlist"}
      </Button>
    </Box>
  );
};

import {
  Box,
  Button,
  Hidden,
  IconButton,
  Stack,
  Typography,
  alpha,
  lighten,
} from "@mui/material";
import { FlaticonIcon, ImageIcon } from "@/components";

import { colors } from "@/styles";
import { useAppSelector } from "@/hooks";

export const NavPlaylists = (): JSX.Element => {
  const user = useAppSelector((state) => state.user);

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        ml={1}
      >
        <Typography variant="h6" fontSize={17}>
          Your playlists
        </Typography>
        <IconButton>
          <FlaticonIcon icon="fi fi-rr-plus" />
        </IconButton>
      </Stack>
      {user ? (
        <Stack mt={2}>
          <Stack
            position="relative"
            direction="row"
            alignItems="center"
            spacing={1.5}
            sx={{
              p: 1,
              borderRadius: 0.5,
              ":hover": {
                bgcolor: lighten(colors.bg, 0.05),
              },
            }}
          >
            <ImageIcon
              url="https://www.gstatic.com/youtube/media/ytm/images/pbg/liked-music-@576.png"
              size={46}
              sx={{ "> img": { borderRadius: "6px" } }}
            />
            <Box
              display="block"
              component="span"
              sx={{
                overflow: "hidden",
                cursor: "pointer",
                "*": {
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                },
              }}
            >
              <Typography>Liked Music</Typography>
              <Typography variant="subtitle2" color="text.secondary">
                0 tracks • Auto Generated
              </Typography>
            </Box>
          </Stack>
        </Stack>
      ) : (
        <Box
          sx={{
            background: `linear-gradient(45deg, ${alpha(
              colors.primary,
              0.15
            )}, ${alpha(colors.secondary, 0.3)})`,
          }}
          p={2}
          mt={2}
          borderRadius={0.75}
        >
          <Button
            variant="translucent"
            onClick={() =>
              (document.location.href = `https://zyae.net/login/?rd=${document.location.href}`)
            }
          >
            Log in
          </Button>
          <Typography variant="subtitle2" mt={1} fontSize={12}>
            Log in to save and share playlists
          </Typography>
        </Box>
      )}
    </>
  );
};

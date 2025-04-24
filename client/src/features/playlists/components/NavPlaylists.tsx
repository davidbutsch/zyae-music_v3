import { FontIcon, ImageIcon } from "@/components";
import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  alpha,
  lighten,
} from "@mui/material";

import { useAppSelector } from "@/hooks";
import { colors } from "@/styles";

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
          <FontIcon icon="fi fi-rr-plus" />
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

              cursor: "pointer",
              ":hover": {
                bgcolor: lighten(colors.bg, 0.05),
              },
            }}
          >
            <ImageIcon
              src="https://www.gstatic.com/youtube/media/ytm/images/pbg/liked-music-@576.png"
              size={46}
              sx={{ "> img": { borderRadius: "6px" } }}
            />
            <Box
              display="block"
              component="span"
              sx={{
                overflow: "hidden",
                "*": {
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                },
              }}
            >
              <Typography>Liked Music</Typography>
              <Typography variant="subtitle2" color="text.secondary">
                0 tracks • {user.profile.displayName}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      ) : (
        <Box
          sx={{
            zIndex: 1,
            background: `linear-gradient(45deg, ${alpha(
              colors.primary,
              0.2
            )}, ${alpha(colors.secondary, 0.4)})`,
          }}
          p={2}
          mt={2}
          borderRadius={0.75}
        >
          <Button
            variant="translucent"
            fullWidth
            // sx={{ bgcolor: alpha(colors.accent, 0.16) }}
            onClick={
              () =>
                alert(
                  "Authentication does not work anymore and i will not be fixing it."
                )
              // (document.location.href = `https://zyae.net/signup/?rd=${document.location.href}`)
            }
          >
            Create account
          </Button>
          <Typography variant="subtitle2" mt={1} fontSize={13}>
            Save your favorite tracks by creating a free account
          </Typography>
        </Box>
      )}
    </>
  );
};

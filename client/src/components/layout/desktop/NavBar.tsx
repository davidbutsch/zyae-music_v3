import {
  BlurBackground,
  DelayFade,
  FontIcon,
  ImageIcon,
  LinkButton,
  ProgressiveImage,
} from "@/components";
import { useAppNavigate, useAppSelector, useColorSort } from "@/hooks";
import {
  Box,
  Divider,
  Stack,
  Typography,
  alpha,
  lighten,
  styled,
} from "@mui/material";

import { SVG_LOGO_URL } from "@/config";
import { NavPlaylists } from "@/features/playlists";
import { colors } from "@/styles";

const navRoutes = [
  {
    title: "Home",
    icon: "zi-home",
    activeIcon: "zi-home-solid",
    to: "//",
  },
  {
    title: "Explore",
    icon: "fi-rs-apps",
    activeIcon: "fi-ss-apps",
    to: "/explore",
  },
  {
    title: "Saved",
    icon: "zi-saved",
    activeIcon: "zi-saved-solid",
    to: "/saved",
  },
];

const StyledLinkButton = styled(LinkButton)(({ theme }) =>
  theme.unstable_sx({
    px: 2.5,

    justifyContent: "left",
    gap: 2.5,
  })
);

export const NavBar = (): JSX.Element => {
  const navigate = useAppNavigate();

  const { queue, activeQueueIndex } = useAppSelector((state) => state.player);
  const playing = queue[activeQueueIndex];

  const { sortColors } = useColorSort(playing?.palette);

  return (
    <Stack px={1.5} height="100%">
      <Stack
        height={64}
        direction="row"
        alignItems="center"
        spacing={1.5}
        ml={1.25}
        onClick={() => navigate("/")}
        sx={{
          cursor: "pointer",
          ":hover": {
            "> h5": { textDecoration: "underline" },
          },
          zIndex: 2,
        }}
      >
        <ImageIcon src={SVG_LOGO_URL} size={32} />
        <Typography variant="h5" fontSize={28}>
          Music
        </Typography>
      </Stack>
      <Stack spacing={0.5}>
        {navRoutes.map((route) => {
          return (
            <StyledLinkButton
              key={route.title}
              to={route.to}
              sx={{}}
              activeProps={{
                variant: "translucent",
                sx: {
                  background: `linear-gradient(45deg, ${alpha(
                    colors.primary,
                    0.1
                  )} 40%, ${alpha("#35ade0", 0.1)})`,
                },
                children: (
                  <Box
                    display="flex"
                    flexDirection="row"
                    gap={2.5}
                    alignItems="center"
                    sx={{
                      background: `linear-gradient(45deg, ${colors.primary} 40%, #35ade0)`,
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      filter: "brightness(120%)",
                    }}
                  >
                    <FontIcon icon={route.activeIcon} />
                    <Typography variant="button">{route.title}</Typography>
                  </Box>
                ),
              }}
            >
              <FontIcon icon={route.icon} />
              {route.title}
            </StyledLinkButton>
          );
        })}
      </Stack>
      <Divider
        sx={{ my: 2, mx: -1.5, borderColor: lighten(colors.bg, 0.075) }}
      />
      <NavPlaylists />
      {playing && (
        <Box
          sx={{
            position: "relative",
            mt: "auto",
          }}
        >
          {playing.palette && (
            <DelayFade in={!!playing.palette}>
              <BlurBackground
                colors={sortColors(["area"]).map((color) => color.hex) || []}
                sx={{
                  position: "absolute",
                  zIndex: 0,
                }}
              />
            </DelayFade>
          )}

          <ProgressiveImage
            src={playing.thumbnails[playing.thumbnails.length - 1].url}
            sx={{
              mb: "12px",
              width: "100%",

              borderRadius: 1 / 2,
            }}
          />
        </Box>
      )}
    </Stack>
  );
};

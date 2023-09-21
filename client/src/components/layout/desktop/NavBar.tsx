import { Divider, Stack, Typography, lighten, styled } from "@mui/material";
import { FlaticonIcon, ImageIcon, LinkButton } from "@/components";

import { NavPlaylists } from "@/features/playlists";
import { colors } from "@/styles";
import { useNavigate } from "react-router-dom";

const navRoutes = [
  {
    title: "Home",
    icon: "music-alt",
    to: "/",
  },
  {
    title: "Explore",
    icon: "world",
    to: "/explore",
  },
  {
    title: "Saved",
    icon: "bookmark",
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
  const navigate = useNavigate();

  return (
    <Stack px={1.5}>
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
        }}
      >
        <ImageIcon
          src="https://zyae.net/assets/images/brand/zyae/zm_logo.png"
          size={32}
        />
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
              activeProps={{
                variant: "translucent",
                children: (
                  <>
                    <FlaticonIcon icon={`fi fi-sr-${route.icon}`} />
                    {route.title}
                  </>
                ),
              }}
            >
              <FlaticonIcon icon={`fi fi-rr-${route.icon}`} />
              {route.title}
            </StyledLinkButton>
          );
        })}
      </Stack>
      <Divider
        sx={{ my: 2, mx: -1.5, borderColor: lighten(colors.bg, 0.075) }}
      />
      <NavPlaylists />
    </Stack>
  );
};

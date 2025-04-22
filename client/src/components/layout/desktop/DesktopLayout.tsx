import { Box, CssBaseline, lighten, styled } from "@mui/material";
import { Header, NavBar } from ".";

import { JSX } from "react";
import { PlayerBar } from "./PlayerBar";
import { colors } from "@/styles";

const Main = styled("main")(({ theme }) =>
  theme.unstable_sx({
    position: "relative",

    height: "calc(100vh - 64px - 72px)",

    bgcolor: "background.default",

    border: `solid 1px ${lighten(colors.bg, 0.075)}`,
    borderRight: "none",
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,

    overflowY: "auto",
    overflowX: "hidden",
  })
);

const Wrapper = styled(Box)(({ theme }) =>
  theme.unstable_sx({
    display: "flex",
    flexWrap: "nowrap",
    bgcolor: lighten(colors.bg, 0.015),
  })
);

type DesktopLayoutProps = {
  children: React.ReactNode;
};

export const DesktopLayout = ({
  children,
}: DesktopLayoutProps): JSX.Element => {
  return (
    <Wrapper>
      <CssBaseline />
      {/* NavBar */}
      <Box
        width={{
          sm: 160,
          md: 260,
        }}
      >
        <NavBar />
      </Box>
      {/* Main */}
      <Box
        width={{
          sm: `calc(100% - ${160}px)`,
          md: `calc(100% - ${260}px)`,
        }}
      >
        <Header />
        <Main id="appContent">{children}</Main>
      </Box>
      <PlayerBar />
    </Wrapper>
  );
};

import { Box, lighten } from "@mui/material";

import { NavBar } from ".";
import { Player } from "./";
import { colors } from "@/styles";

export const BottomBar = (): JSX.Element => {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,

        width: "100%",

        bgcolor: lighten(colors.bg, 0.015),

        zIndex: 1,
      }}
    >
      <Player />
      <NavBar />
    </Box>
  );
};

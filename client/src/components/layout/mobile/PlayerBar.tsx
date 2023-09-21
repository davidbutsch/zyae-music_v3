import { Box, IconButton, Stack, lighten } from "@mui/material";
import { FlaticonIcon, ImageIcon } from "@/components";

import { colors } from "@/styles";

export const Player = (): JSX.Element => {
  if (1 == (2 as number)) return <></>;
  else
    return (
      <Stack direction="row" spacing={2} py={1.5} px={2.5}>
        <FlaticonIcon
          sx={{
            p: 2,
            bgcolor: lighten(colors.bg, 0.1),
            color: "text.secondary",
            borderRadius: 0.5,
          }}
          icon="fi fi-sr-music-alt"
          size={20}
        />
        <Stack
          spacing={1.25}
          justifyContent="center"
          width="100%"
          maxWidth={200}
        >
          <Box
            component="span"
            sx={{
              display: "flex",

              height: 14,
              bgcolor: lighten(colors.bg, 0.1),
              borderRadius: 7,
            }}
          />
          <Box
            component="span"
            sx={{
              display: "flex",

              width: "75%",

              height: 14,
              bgcolor: lighten(colors.bg, 0.1),
              borderRadius: 7,
            }}
          />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="right"
          width="100%"
        >
          <IconButton size="large">
            <ImageIcon
              size={24}
              src="https://zyae.net/assets/images/icons/play.svg"
            />
          </IconButton>
          <IconButton size="large">
            <ImageIcon
              size={24}
              src="https://zyae.net/assets/images/icons/forward.svg"
            />
          </IconButton>
        </Stack>
      </Stack>
    );
};

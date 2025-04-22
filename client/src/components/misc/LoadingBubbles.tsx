import { DelayFade, DelayFadeProps } from "..";
import { Stack, lighten, styled } from "@mui/material";

import { colors } from "@/styles";
import { keyframes } from "@emotion/react";

export const outlineFlash = keyframes({
  from: {
    opacity: 1,
    transform: "translateY(8px) scale(1)",
  },
  to: {
    opacity: 0.5,
    transform: "translateY(-8px) scale(0.7)",
  },
});

const Bubble = styled("span")({
  margin: 2,
  height: 24,
  width: 24,
  background: lighten(colors.bg, 0.25),
  borderRadius: "50%",

  animation: `${outlineFlash} 0.5s infinite alternate`,

  "&:nth-of-type(2)": {
    animationDelay: ".2s",
  },

  "&:nth-of-type(3)": {
    animationDelay: ".4s",
  },
});

export const LoadingBubbles = (props: DelayFadeProps) => {
  return (
    <DelayFade delay={1000} {...props}>
      <Stack direction="row">
        <Bubble />
        <Bubble />
        <Bubble />
      </Stack>
    </DelayFade>
  );
};

// BUG loading bubble doesnt appear when loading playlists (maybe other stuff)
export const LoadingBubblesPage = (props: DelayFadeProps) => {
  return (
    <DelayFade
      delay={1000}
      {...props}
      sx={{
        position: { xs: "fixed" },
        top: 0,
        left: { xs: 0, sm: 160, md: 260 },
        right: 0,
        height: { xs: "calc(100vh - 150px)", sm: "calc(100vh - 64px - 72px)" },

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        ...props.sx,
      }}
    >
      <LoadingBubbles />
    </DelayFade>
  );
};

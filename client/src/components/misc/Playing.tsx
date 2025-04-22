import { Box, SxProps, keyframes, styled } from "@mui/material";

import { FontIcon } from "../elements";
import { theme } from "@/styles";

const Bar = styled(Box, {
  shouldForwardProp: (prop) => prop !== "i" && prop !== "color",
})(({ size, color, i }: { size: number; color: string; i: number }) => {
  const barBounce = keyframes`
 0% {
    transform: scaleY(10%);
    opacity: 1 !important,
}
  25% {
    transform: scaleY(50%);
  }
  50% {
    transform: scaleY(25%);
  }
  75% {
    transform: scaleY(100%);
  }
  100% {
    transform: scaleY(10%);
  }
`;

  return theme.unstable_sx({
    width: size / 8,

    animation: `${barBounce} infinite linear`,
    transformOrigin: "center",

    bgcolor: color,

    animationDelay: `${i * 0.2}s`,
    animationDuration: `${i * 0.9}s`,
  });
});

type PlayingProps = {
  isPlaying?: boolean;
  color?: string;
  size?: number;
  sx?: SxProps;
};

export const Playing = ({
  isPlaying = true,
  color = "#fff",
  size = 16,
  sx,
}: PlayingProps) => {
  return (
    <Box
      sx={{
        position: "relative",
        width: size,
        height: size,

        display: "flex",
        justifyContent: "space-between",

        zIndex: 2,

        ...sx,
      }}
    >
      {isPlaying ? (
        [...Array(4)].map((_e, i) => (
          <Bar size={size} color={color} i={i + 1} key={i} />
        ))
      ) : (
        <FontIcon icon="zi-play" size={size} color={color} />
      )}
    </Box>
  );
};

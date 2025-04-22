import { Box, SxProps } from "@mui/material";
import { keyframes, styled } from "@mui/system";

import { theme } from "@/styles";

const Blade = styled(Box, {
  shouldForwardProp: (prop) => prop !== "i" && prop !== "color",
})(({ color, i }: { color: string; i: number }) => {
  const spinnerFade = keyframes`
  0% {
    background: ${color};
  }
  100% {
    background: transparent;
  }
`;

  return theme.unstable_sx({
    position: "absolute",
    top: "0.66em",
    left: "0.44em",
    width: "0.115em",
    height: "0.34em",

    borderRadius: "0.5em",
    transformOrigin: "center -0.16em",
    animation: `${spinnerFade} 1s infinite linear`,

    color,

    animationDelay: `${i * 0.13}s`,
    transform: `rotate(${i * 45}deg)`,
  });
});

type SpinnerProps = {
  color?: string;
  size?: number;
  sx?: SxProps;
};

export const Spinner = ({ color = "#fff", size = 32, sx }: SpinnerProps) => {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        width: "1em",
        height: "1em",

        fontSize: size,

        ...sx,
      }}
    >
      {[...Array(8)].map((_e, i) => (
        <Blade color={color} i={i} key={i} />
      ))}
    </Box>
  );
};

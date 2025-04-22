import { Box, SxProps, alpha } from "@mui/material";
import { CSSProperties } from "react";

type BlurBackgroundProps = {
  colors: string[];
  sx?: SxProps;
  style?: CSSProperties;
};

const indexStylesMap = [
  {
    top: 0,
    left: 0,
    height: "50%",
    width: "50%",
  },
  {
    top: "20%",
    right: 0,
    height: "40%",
    width: "40%",
  },
  {
    bottom: 0,
    left: 0,
    height: "25%",
    width: "25%",
  },
  {
    top: "50%",
    right: 0,
    height: "25%",
    width: "25%",
  },
  {
    top: "50%",
    right: 0,
    height: "25%",
    width: "25%",
  },
];

export const BlurBackground = ({ colors, sx, style }: BlurBackgroundProps) => {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",

        bgcolor: `${alpha(colors[0], 0.5)}`,
        filter: "blur(64px)",

        "> div": {
          position: "absolute",
          borderRadius: "100%",

          opacity: 0.4,
          zIndex: 1,
        },

        ...sx,
      }}
      style={style}
    >
      {indexStylesMap.map((styles, i) => {
        const color = colors[i] || colors[0];

        return (
          <Box
            key={i}
            sx={{
              ...styles,
              bgcolor: color,
            }}
          />
        );
      })}
    </Box>
  );
};

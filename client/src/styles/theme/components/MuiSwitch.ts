import { Components, Theme, lighten } from "@mui/material";
import { colors, sizes } from "..";

export const MuiSwitch: Components<Theme>["MuiSwitch"] = {
  styleOverrides: {
    root: ({ ownerState }) => {
      const size = ownerState.size || "medium";

      const height = sizes[size];
      const width = 1.61538461538 * height;

      const thumbLength = 0.84615384615 * height;
      const thumbMargin = (height - thumbLength) / 2;

      const tranlateX = 0.38095238095 * width;

      return {
        width: width,
        height: height,
        padding: 0,
        "& .MuiSwitch-switchBase": {
          padding: 0,
          margin: thumbMargin,
          transitionDuration: "300ms",
          "&.Mui-checked": {
            transform: `translateX(${tranlateX}px)`,
            color: "#fff",
            "& + .MuiSwitch-track": {
              color: lighten(colors.bg, 0.24),
              opacity: 1,
              border: 0,
            },
            "&.Mui-disabled + .MuiSwitch-track": {
              opacity: 0.5,
            },
          },
          "&.Mui-focusVisible .MuiSwitch-thumb": {
            color: colors.secondary,
            border: "6px solid #fff",
          },
          "&.Mui-disabled .MuiSwitch-thumb": {
            color: lighten(colors.bg, 0.24),
          },
          "&.Mui-disabled + .MuiSwitch-track": {
            opacity: 0.3,
          },
        },
        "& .MuiSwitch-thumb": {
          boxSizing: "border-box",
          width: thumbLength,
          height: thumbLength,
        },
        "& .MuiSwitch-track": {
          borderRadius: width / 2,
          backgroundColor: lighten(colors.bg, 0.24),
          opacity: 1,
          transition: ".5s",
        },
      };
    },
  },
};

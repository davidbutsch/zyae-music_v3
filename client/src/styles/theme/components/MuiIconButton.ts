import { Components, Theme, lighten } from "@mui/material";
import { colors, sizes } from "..";

export const MuiIconButton: Components<Theme>["MuiIconButton"] = {
  styleOverrides: {
    root: ({ ownerState }) => {
      const size = ownerState.size || "medium";

      const styles = [
        {
          height: sizes[size],
          aspectRatio: "1 / 1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          "&.Mui-disabled": {
            color: lighten(colors.bg, 0.5),
          },

          i: {
            fontSize: { small: 16, medium: 18, large: 20 }[size],
          },
        },
      ];

      return styles;
    },
  },
  defaultProps: {
    color: "accent",
    centerRipple: false,
  },
};

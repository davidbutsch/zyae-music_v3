import { Components, Theme, alpha, lighten } from "@mui/material";

import { colors } from "../colors";
import { sizes } from "../sizes";
import { theme } from "..";

const translucentStyle = (color = colors.accent) =>
  theme.unstable_sx({
    bgcolor: alpha(color, 0.15),
    color: color,
    "&:hover": {
      backgroundColor: alpha(color, 0.2),
    },
  });

export const MuiButton: Components<Theme>["MuiButton"] = {
  styleOverrides: {
    root: ({ ownerState, theme }) => {
      const variant = ownerState.variant || "text";
      const size = ownerState.size || "medium";
      const color = ownerState.color || "accent";

      const styles = [
        theme.unstable_sx({
          padding: { small: 1, medium: 1.5, large: 2 }[size],
          height: sizes[size],

          display: "flex",
          gap: 1,

          borderRadius: sizes[size] / 2,
          whiteSpace: "nowrap",

          "&.Mui-disabled": {
            color: lighten(colors.bg, 0.5),
          },
        }),
      ];

      if (variant === "translucent")
        styles.push(translucentStyle(colors[color]));

      return styles;
    },
  },
  defaultProps: {
    color: "accent",
    disableElevation: true,
  },
};

import { Components, Theme, alpha } from "@mui/material";

import { colors } from "../colors";
import { sizes } from "../sizes";
import { theme } from "..";

const translucentStyle = (color = colors.accent) =>
  theme.unstable_sx({
    bgcolor: alpha(color, 0.08),
    color: color,
    "&:hover": {
      bgcolor: alpha(color, 0.16),
    },
  });

const outlinedStyle = (color = colors.accent) =>
  theme.unstable_sx({
    color: color,
    border: `1px solid ${alpha(color, 0.25)}`,
    "&:hover": {
      bgcolor: alpha(color, 0.16),
      border: `1px solid ${alpha(color, 0)}`,
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
          px: { small: 1.25, medium: 1.5, large: 2 }[size],
          height: sizes[size],
          minWidth: "fit-content",

          display: "flex",
          gap: 1,

          borderRadius: sizes[size] / 2,
          whiteSpace: "nowrap",

          "&.Mui-disabled": {
            opacity: 0.72,
          },
        }),
      ];

      if (variant === "translucent")
        styles.push(translucentStyle(colors[color]));
      if (variant === "outlined") styles.push(outlinedStyle(colors[color]));

      return styles;
    },
  },
  defaultProps: {
    color: "accent",
    disableElevation: true,
  },
};

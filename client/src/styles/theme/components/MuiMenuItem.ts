import { Components, Theme, alpha } from "@mui/material";
import { colors, sizes } from "..";

export const MuiMenuItem: Components<Theme>["MuiMenuItem"] = {
  styleOverrides: {
    root: ({ ownerState, theme }) => {
      const color = colors[ownerState.color || "accent"];

      const styles = [
        theme.unstable_sx({
          height: sizes["medium"],
          borderRadius: `${sizes["medium"] / 2}px`,

          color,
          "*": {
            color,
          },

          "&:hover": {
            bgcolor: alpha(color, 0.08),
          },
        }),
      ];

      return styles;
    },
  },
  defaultProps: {
    color: "accent",
  },
};

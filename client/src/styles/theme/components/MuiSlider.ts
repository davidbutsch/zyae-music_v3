import { Components, Theme } from "@mui/material";

import { colors } from "@/styles";

export const MuiSlider: Components<Theme>["MuiSlider"] = {
  styleOverrides: {
    root: {
      color: colors.accent,
      opacity: 0.8,

      ".MuiSlider-thumb": {
        width: 12,
        height: 12,
        transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
        boxShadow: "none",

        "&.Mui-active": {
          width: 18,
          height: 18,
          boxShadow: "none",
        },
      },
      "& .MuiSlider-rail": {
        opacity: 0.28,
      },
    },
  },
};

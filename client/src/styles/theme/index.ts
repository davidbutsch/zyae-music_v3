import {
  MuiButton,
  MuiButtonBase,
  MuiCssBaseline,
  MuiIconButton,
  MuiMenuItem,
  MuiSlider,
  MuiSwitch,
} from "./components";
import { createTheme, lighten } from "@mui/material";

import { colors } from "./colors";
import { sizes } from "./sizes";

export { colors } from "./colors";
export { sizes } from "./sizes";

const _theme = createTheme();

export const theme = createTheme({
  shape: {
    borderRadius: sizes.medium / 2,
  },
  sizes,
  palette: {
    mode: "dark",
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
    accent: _theme.palette.augmentColor({
      color: { main: colors.accent },
    }),
    text: {
      primary: colors.text,
      secondary: colors.textSecondary,
    },
    error: {
      main: "#ff6161",
    },
    background: {
      default: colors.bg,
    },
  },
  components: {
    MuiCssBaseline,
    MuiButtonBase,
    MuiButton,
    MuiIconButton,
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          background: lighten(colors.bg, 0.05),

          border: `solid 1px ${lighten(colors.bg, 0.1)}`,
          borderRadius: sizes["medium"] / 2,
        },
        root: {
          marginTop: 4,
        },
      },
      defaultProps: {
        elevation: 1,
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          padding: 16,
          background: lighten(colors.bg, 0.05),

          border: `solid 1px ${lighten(colors.bg, 0.15)}`,
          borderRadius: sizes["medium"] / 2,
        },
        root: {
          marginTop: 4,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 6,

          display: "flex",
          flexDirection: "column",
          gap: 2,
        },
      },
    },
    MuiMenuItem,
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: lighten(colors.bg, 0.1),
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          "&:hover": {
            textDecoration: "underline",
          },
        },
      },
    },
    MuiSlider,
    MuiSwitch,
  },
});

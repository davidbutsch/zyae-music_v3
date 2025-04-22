import { darken } from "@mui/material";

type Colors = { [key: string]: string };

export const colors: Colors = {
  bg: "#111414",
  primary: "#28CD88",
  secondary: "#f066a0",
  accent: "#ffffff",
  error: "#f7584d",
  text: "#ffffff",
  textSecondary: darken("#ffffff", 0.32),
};

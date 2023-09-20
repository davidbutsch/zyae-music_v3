import { Box, Button, Stack, Typography, alpha, darken } from "@mui/material";

import { Palette } from "@/types";
import { ProgressiveImage } from ".";
import { useState } from "react";

type DescriptionProps = {
  title?: string;
  head: string;
  sub: string;
  text: string;
  palette: Palette;
  thumbnail: string;
};

export const DescriptionBox = ({
  title = "About",
  head,
  sub,
  text,
  palette,
  thumbnail,
}: DescriptionProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded((prev) => !prev);

  const preColors = palette.colors.filter(
    (color) =>
      color.hex == palette.byIntensity[0].hex ||
      color.hex == palette.byIntensity[1].hex
  );
  const lightness = (preColors[0].lightness + preColors[1].lightness) / 2;

  const colors = [];
  colors[0] = darken(preColors[0].hex, lightness / 2);
  colors[1] = darken(preColors[1].hex, lightness / 2);

  return (
    <Box>
      <Typography mb={2.5} variant="h5" fontWeight={500}>
        {title}
      </Typography>
      <Stack
        sx={{
          position: "relative",

          p: 2,

          background: `linear-gradient(45deg, ${colors[0]}, ${colors[1]})`,

          maxWidth: { xs: "100%", md: "512px" },
          minHeight: "340px",

          aspectRatio: "1.25 / 1",
          borderRadius: 1,
          overflow: "hidden",

          transition: ".3s",
        }}
      >
        <ProgressiveImage
          sx={{
            position: "absolute",
            top: -50,
            left: 0,
            width: "100%",

            opacity: expanded ? 0.3 : 1,

            transition: "opacity .3s",
            mask: "linear-gradient(rgba(0, 0, 0, .75) 0%, transparent 70%)",
          }}
          src={thumbnail}
        />
        <Box
          sx={{
            mt: "auto",
            zIndex: 1,
          }}
        >
          <Typography
            variant="h5"
            fontSize={32}
            fontWeight={500}
            sx={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {head}
          </Typography>
          <Typography mb={{ xs: 1, md: 2 }}>{sub}</Typography>
          <Typography
            sx={[
              {
                mt: "auto",
                transition: ".3s",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              },
              expanded
                ? {
                    py: 1.5,
                    height: { xs: "175px", md: "225px" },
                    overflowY: "scroll",
                    mask: "linear-gradient(transparent, #fff 10%, #fff 90%, transparent)",
                  }
                : {
                    height: "80px",
                    overflow: "hidden",
                    mask: "linear-gradient(#fff 0%, transparent)",
                  },
            ]}
          >
            {text}
          </Typography>
        </Box>

        <Button
          variant="translucent"
          onClick={handleToggle}
          sx={{
            mt: expanded ? 2 : 0,
            bgcolor: alpha("#fff", 0.16),
            transition: "margin .3s",
            zIndex: 2,
            "&:hover": {
              bgcolor: alpha("#fff", 0.24),
            },
          }}
        >
          Read {expanded ? "less" : "more"}
        </Button>
      </Stack>
    </Box>
  );
};

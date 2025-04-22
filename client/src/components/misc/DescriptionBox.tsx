import {
  Box,
  Button,
  Stack,
  SxProps,
  Typography,
  alpha,
  darken,
} from "@mui/material";

import { Palette } from "@/types";
import { ProgressiveImage } from "@/components";
import { useColorSort } from "@/hooks";
import { useState } from "react";

type DescriptionProps = {
  title?: string;
  head: string;
  sub?: string;
  text: string;
  palette: Palette;
  thumbnail: string;
  sx?: SxProps;
};

export const DescriptionBox = ({
  title = "About",
  head,
  sub,
  text,
  palette,
  thumbnail,
  sx,
}: DescriptionProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => setExpanded((prev) => !prev);

  const { sortColors } = useColorSort(palette, {
    colorShifter: (color) => {
      if (color.lightness >= 0.5)
        return {
          ...color,
          hex: darken(color.hex, color.lightness - 0.5),
          lightness: 0.5,
        };

      return color;
    },
  });

  const boxColors = sortColors(["area"]);

  return (
    <Box sx={sx}>
      <Typography mb={2.5} variant="h5" fontWeight={500}>
        {title}
      </Typography>
      <Stack
        sx={{
          position: "relative",

          p: 2,

          background: `linear-gradient(45deg, ${boxColors[0].hex}, ${boxColors[1].hex})`,

          maxWidth: { xs: "100%", md: "512px" },
          minHeight: { xs: "340px", md: "380px" },

          overflow: "hidden",
          borderRadius: 1,

          transition: ".3s",
        }}
      >
        <ProgressiveImage
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            minWidth: "340px",

            opacity: expanded ? 0.3 : 1,

            transform: `translateY(${expanded ? "-100px" : "-50px"}) scale(${
              expanded ? "1" : "1.1"
            })`,

            transition: ".3s",
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
                    height: "175px",
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
            mt: expanded ? 1.5 : 0,
            bgcolor: alpha("#fff", 0.16),
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

import { Box, SxProps, useMediaQuery } from "@mui/material";
import { colors, theme } from "@/styles";
import { useEffect, useState } from "react";

import { useScroll } from "@/hooks";

type BannerImageProps = {
  src: string;
  height?: number;
  sx?: SxProps;
};

export const BannerImage = ({ src, height, sx }: BannerImageProps) => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
  }, [src]);

  const { y } = useScroll();

  return (
    <Box
      sx={{
        position: "relative",
        px: { xs: 2, sm: 4, md: 4, lg: 8 },

        height: height ? `${height}vh` : { xs: "45vh", sm: "55vh" },

        display: "flex",
        flexDirection: "column",
        justifyContent: "end",

        ...(!xs && {
          "&:after": {
            content: "''",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,

            height: "70vh",

            bgcolor: colors.bg,

            mask: `linear-gradient(to top, #fff, rgba(0, 0, 0, 0))`,
          },
        }),

        ...sx,
      }}
    >
      <div
        style={{
          position: xs ? "fixed" : "absolute",
          top: 0,
          left: 0,
          height: xs ? `calc(${height || 55}vh - ${y}px)` : "70vh",
          width: "100%",

          backgroundSize: `cover`,
          backgroundPosition: "center center",
          backgroundImage: `url(${src})`,

          mask: `linear-gradient(to bottom, rgba(0, 0, 0, .25), #fff ${
            -Math.abs(y) * 100
          }%, rgba(0, 0, 0, 0))`,

          ...(loaded
            ? {
                opacity: 1,
              }
            : {
                opacity: 1,
              }),

          transition: "opacity .3s",
        }}
      />
    </Box>
  );
};

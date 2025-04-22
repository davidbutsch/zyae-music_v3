import { Box, Typography, useMediaQuery } from "@mui/material";
import { FontIcon, IconButton, ProgressiveImage } from "@/components";

import { theme } from "@/styles";

export type MenuHeaderOptions = {
  type?: "artist" | "album" | "playlist";
  thumbnail?: string;
  head?: string;
  sub?: string;
  onClose?: () => any;
};

export const MenuHeader = ({
  type,
  thumbnail,
  head,
  sub,
  onClose,
}: MenuHeaderOptions) => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Box
      sx={{
        mx: -2,
        px: 2,
        pb: xs ? 0 : 1.5,

        display: "flex",
        alignItems: "center",

        borderBottom: xs ? "none" : "1px solid rgba(255,255,255,.05)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        {Boolean(thumbnail) && (
          <ProgressiveImage
            src={thumbnail!}
            height={48}
            sx={{
              borderRadius: type == "artist" ? "100%" : "4px",
            }}
          />
        )}
        <Box
          textAlign="left"
          sx={{
            width: xs ? "calc(100vw - 32px - 32px - 32px - 32px)" : "inherit",

            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <Typography
            fontSize={xs ? 16 : 22}
            fontWeight={500}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {head}
          </Typography>
          <Typography
            fontSize={14}
            noWrap
            color="rgba(255, 255, 255, .64)"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {sub}
          </Typography>
        </Box>
      </Box>
      <IconButton
        onClick={onClose}
        variant="translucent"
        sx={{
          ml: "auto",
          height: "32px",
          width: "32px",
        }}
      >
        <FontIcon icon="fi-sr-cross-small" size={22} />
      </IconButton>
    </Box>
  );
};

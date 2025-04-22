import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import {
  FontIcon,
  IconButton,
  IconButtonProps,
  ProgressiveImage,
  ShyParent,
} from "@/components";

import { TopResultItem } from "..";
import { theme } from "@/styles";

type ResultRow = {
  item: TopResultItem;
  button?: {
    shy?: boolean;
    variant?: IconButtonProps["variant"];
    icon?: string;
    onClick?: (...args: any[]) => void;
  };
  onClick: (...args: any[]) => void;
};

export const ResultRow = ({ item, button, onClick }: ResultRow) => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <ShyParent
      onClick={onClick}
      sx={{
        py: 1,

        "&:not(&:last-child)": {
          borderBottom: "1px solid rgba(255,255,255,.05)",
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          ...(xs
            ? {
                "&:active": {
                  transform: "scale(.975)",
                  opacity: 0.5,
                },
              }
            : {
                "&:hover": {
                  opacity: 0.75,
                },
              }),

          transition: ".3s",
        }}
      >
        <ProgressiveImage
          src={item.thumbnails[item.thumbnails.length - 1].url}
          sx={{
            height: { xs: 56, sm: 64 },
            // set minwidth to auto if its a track cus videos ned more space than just a box
            minWidth: item.type == "track" ? "auto" : { xs: 56, sm: 64 },

            borderRadius: item.type == "artist" ? "100%" : 1 / 4,
          }}
        />
        <Box
          ml={1.5}
          sx={{
            cursor: "pointer",

            overflow: "hidden",
            "& p, h6": {
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            },
          }}
        >
          <Typography fontWeight={500}>
            {item.head}
            {item.isExplicit && (
              <FontIcon
                sx={{ px: 1, display: "inline-block" }}
                size={14}
                icon="fi fi-rr-square-e"
              />
            )}
          </Typography>
          <Typography
            fontWeight={500}
            variant="subtitle2"
            color="text.secondary"
          >
            {item.sub}
          </Typography>
        </Box>

        <IconButton
          sx={{
            ml: "auto",
          }}
          variant={button?.variant}
          onClick={(e) => {
            e.stopPropagation();
            (button?.onClick || onClick)();
          }}
          className={button?.shy ? "shy" : undefined}
        >
          <FontIcon
            icon={button?.icon || "fi fi-rr-angle-small-right"}
            size={!button?.icon ? 24 : 18}
            color="rgba(255,255,255,.75)"
          />
        </IconButton>
      </Stack>
    </ShyParent>
  );
};

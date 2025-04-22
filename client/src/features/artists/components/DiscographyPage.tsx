import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  Content,
  FontIcon,
  LoadingBubblesPage,
  MobileHeader,
} from "@/components";
import React, { useState } from "react";

import { AlbumCards } from "@/features/albums";
import { theme } from "@/styles";
import { useAppNavigate } from "@/hooks";
import { useArtistDiscography } from "@/features/artists";
import { useParams } from "react-router-dom";

const DesktopHeader = ({
  artist,
}: {
  artist: { name?: string; id: string };
}) => {
  const navigate = useAppNavigate();
  var { type } = useParams();

  if (!type) return null;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleChangeType = (type: "all" | "albums" | "singles") => {
    navigate(`../${artist.id}/discography/${type}`);
    setAnchorEl(null);
  };

  return (
    <Stack direction="row" alignItems="center" gap={2} mb={5}>
      <Typography
        variant="h4"
        fontSize={38}
        fontWeight={500}
        onClick={() => navigate(`/artist/${artist.id}`)}
        sx={{
          cursor: "pointer",
          ":hover": {
            textDecoration: "underline",
          },
        }}
      >
        {artist.name}
      </Typography>
      <Button sx={{ ml: "auto" }} variant="outlined" onClick={handleMenuOpen}>
        {type}
        <FontIcon icon={`fi fi-rr-angle-small-${open ? "up" : "down"}`} />
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleChangeType("all")}>
          {type == "all" && (
            <ListItemIcon>
              <FontIcon icon="fi fi-rr-check" />
            </ListItemIcon>
          )}
          <ListItemText inset={type !== "all"}>All</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleChangeType("albums")}>
          {type == "albums" && (
            <ListItemIcon>
              <FontIcon icon="fi fi-rr-check" />
            </ListItemIcon>
          )}
          <ListItemText inset={type !== "albums"}>Albums</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleChangeType("singles")}>
          {type == "singles" && (
            <ListItemIcon>
              <FontIcon icon="fi fi-rr-check" />
            </ListItemIcon>
          )}
          <ListItemText inset={type !== "singles"}>Singles</ListItemText>
        </MenuItem>
      </Menu>
    </Stack>
  );
};

export const DiscographyPage = () => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  var { artistId, type } = useParams();

  if (!artistId || !type) return null;

  const { status, data: discography } = useArtistDiscography(artistId);

  return (
    <Content
      sx={{
        ...(xs && {
          pt: "calc(48px + 16px + env(safe-area-inset-top)) !important",
        }),
      }}
    >
      {xs ? (
        <MobileHeader
          head={
            type == "all"
              ? "Discography"
              : type == "albums"
              ? "Albums & EPs"
              : "Singles"
          }
          fadeTrigger={{ y: 1 }}
          sx={{
            textTransform: "capitalize",
          }}
        />
      ) : (
        <DesktopHeader
          artist={{ id: artistId, name: discography?.artist.name }}
        />
      )}
      {status !== "success" ? (
        <LoadingBubblesPage />
      ) : (
        <AlbumCards
          carousel={false}
          albums={
            type == "all"
              ? discography.items
              : discography.items.filter(
                  (item) => `${item.type?.toLowerCase()}s` == type
                )
          }
        />
      )}
    </Content>
  );
};

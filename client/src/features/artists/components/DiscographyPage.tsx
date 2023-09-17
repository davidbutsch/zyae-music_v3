import {
  Button,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Content, FlaticonIcon, ProgressiveImage } from "@/components";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useArtist, useArtistDiscography } from "@/features/artists";

import { AlbumCards } from "@/features/albums";
import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

export const DiscographyPage = () => {
  const navigate = useNavigate();
  var { artistId, type } = useParams();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  if (!artistId || !type) return null;

  const { status: artistStatus, data: artist } = useArtist(artistId);
  const { status: discographyStatus, data: discography } =
    useArtistDiscography(artistId);

  if (artistStatus !== "success" || discographyStatus !== "success")
    return <>Loading</>;

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleChangeType = (type: "all" | "albums" | "singles") => {
    navigate(`../${artistId}/discography/${type}`);
    setAnchorEl(null);
  };

  return (
    <Content>
      <Stack direction="row" alignItems="center" gap={2} mb={5}>
        <ProgressiveImage
          width={40}
          sx={{ borderRadius: "100%", border: "1" }}
          src={artist.thumbnails.banner.mobile}
        />
        <Link
          component={RouterLink}
          variant="h4"
          fontSize={24}
          fontWeight={500}
          color={artist.palette.byLightness[0].hex}
          to={`/artist/${artistId}`}
        >
          {artist.name}
        </Link>
        <Button sx={{ ml: "auto" }} variant="outlined" onClick={handleMenuOpen}>
          {type}
          <FlaticonIcon icon={`fi fi-rr-angle-small-${open ? "up" : "down"}`} />
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
                <FlaticonIcon icon="fi fi-rr-check" />
              </ListItemIcon>
            )}
            <ListItemText inset={type !== "all"}>All</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleChangeType("albums")}>
            {type == "albums" && (
              <ListItemIcon>
                <FlaticonIcon icon="fi fi-rr-check" />
              </ListItemIcon>
            )}
            <ListItemText inset={type !== "albums"}>Albums</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => handleChangeType("singles")}>
            {type == "singles" && (
              <ListItemIcon>
                <FlaticonIcon icon="fi fi-rr-check" />
              </ListItemIcon>
            )}
            <ListItemText inset={type !== "singles"}>Singles</ListItemText>
          </MenuItem>
        </Menu>
      </Stack>
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
    </Content>
  );
};

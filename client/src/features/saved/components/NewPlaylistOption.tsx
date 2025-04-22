import { FontIcon, IconButton } from "@/components";

import { PlaylistDetails } from "@/features/playlists";
import { theme } from "@/styles";
import { useMediaQuery } from "@mui/material";
import { useMenu } from "@/features/menus/hooks/useMenu";

export const NewPlaylistOption = () => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  const createPlaylistMenu = useMenu({ variant: xs ? "sheet" : "popup" });

  return (
    <>
      <createPlaylistMenu.Element {...createPlaylistMenu.elementProps}>
        <PlaylistDetails close={createPlaylistMenu.close} />
      </createPlaylistMenu.Element>
      <IconButton
        onClick={createPlaylistMenu.open}
        sx={{ mt: -1, mb: -4, ml: "auto" }}
      >
        <FontIcon icon={"fi-br-plus"} />
      </IconButton>
    </>
  );
};

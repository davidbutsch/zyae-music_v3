import { AppBar, Stack, Toolbar } from "@mui/material";

import { AccountControls } from "@/features/auth";
import { SearchBar } from ".";

export const Header = (): JSX.Element => {
  return (
    <AppBar
      position="relative"
      color="transparent"
      sx={{ pr: "18px", zIndex: 3 }}
    >
      <Toolbar disableGutters>
        <Stack
          width="100%"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
        >
          <SearchBar />
          <AccountControls />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

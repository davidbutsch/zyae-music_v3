import { Button, Stack, darken, lighten, styled } from "@mui/material";

import { FlaticonIcon } from "@/components";
import { colors } from "@/styles";

const StyledInput = styled("input")(({ theme }) =>
  theme.unstable_sx({
    pl: 2,

    width: "100%",
    maxWidth: "400px",

    color: "text.primary",
    fontSize: 16,

    bgcolor: "transparent",
    border: `solid 1px ${lighten(colors.bg, 0.1)}`,
    borderRadius: "22px",
    borderRight: "none",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,

    "&::placeholder": {
      color: darken(colors.accent, 0.5),
    },
    "&:focus": {
      outline: "solid 2px",
      outlineColor: colors.primary,
    },
  })
);

export const SearchBar = (): JSX.Element => {
  return (
    <Stack direction="row" width="100%">
      <StyledInput type="text" placeholder="Search Zyae Music" />
      <Button
        variant="translucent"
        sx={{
          px: 3,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }}
      >
        <FlaticonIcon icon="fi fi-rr-search" />
      </Button>
    </Stack>
  );
};

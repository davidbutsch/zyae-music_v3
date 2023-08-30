import {
  Avatar,
  Button,
  ListItemIcon,
  MenuItem,
  MenuList,
  Stack,
} from "@mui/material";
import { FlaticonIcon, LinkButton } from "@/components";
import { useAppSelector, usePopover } from "@/hooks";

import { deleteSession } from "@/features/auth";

export const AccountControls = (): JSX.Element => {
  const user = useAppSelector((state) => state.user);

  const profilePopover = usePopover();

  const handleLogOut = async () => {
    await deleteSession();
    document.location.reload();
  };

  if (user)
    return (
      <Stack direction="row" justifyContent={"right"} spacing={1}>
        <Button
          variant={profilePopover.isOpen ? "translucent" : "text"}
          sx={{ pl: 0.5, pr: 1.25 }}
          onClick={profilePopover.open}
        >
          <Avatar
            sx={{ height: 30, width: 30 }}
            alt={`${user.profile.displayName}'s profile`}
            src={user.profile.thumbnail[0].url}
          />
          <FlaticonIcon
            icon={`fi fi-rr-angle-small-${
              profilePopover.isOpen ? "up" : "down"
            }`}
            size={16}
            sx={{ paddingTop: profilePopover.isOpen ? 0 : 1 }}
          />
        </Button>
        <profilePopover.Element {...profilePopover.elementProps}>
          <MenuList>
            <MenuItem onClick={handleLogOut} color="error">
              <ListItemIcon>
                <FlaticonIcon icon="fi fi-rr-exit" />
              </ListItemIcon>
              Log out
            </MenuItem>
          </MenuList>
        </profilePopover.Element>
      </Stack>
    );
  else
    return (
      <Stack direction="row" justifyContent={"right"} spacing={1}>
        <LinkButton
          color="secondary"
          to={`https://zyae.net/login/?rd=${document.location.href}`}
        >
          Log in
        </LinkButton>
        <LinkButton
          variant="outlined"
          color="secondary"
          to={`https://zyae.net/signup/?rd=${document.location.href}`}
        >
          Sign up
        </LinkButton>
      </Stack>
    );
};

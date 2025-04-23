import { FontIcon, LinkButton } from "@/components";
import { Avatar, Button, Stack } from "@mui/material";

import { deleteSession } from "@/features/auth";
import { OptionsList } from "@/features/menus";
import { useMenu } from "@/features/menus/hooks/useMenu";
import { useAppSelector } from "@/hooks";

export const AccountControls = (): JSX.Element => {
  const user = useAppSelector((state) => state.user);

  const profilePopover = useMenu({ variant: "popover" });

  const handleLogOut = async () => {
    try {
      await deleteSession();
    } catch (err) {
      document.location.reload();
    }
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
            src={user.profile.thumbnails[0].url}
          />
          <FontIcon
            icon={`fi fi-rr-angle-small-${
              profilePopover.isOpen ? "up" : "down"
            }`}
            size={16}
          />
        </Button>
        <profilePopover.Element {...profilePopover.elementProps}>
          <OptionsList
            variant="popover"
            items={[
              { title: "Log out", onClick: handleLogOut, icon: "fi-rr-exit" },
            ]}
          />
        </profilePopover.Element>
      </Stack>
    );
  else
    return (
      <Stack direction="row" justifyContent={"right"} spacing={1}>
        <LinkButton
          color="secondary"
          onClick={() =>
            alert(
              "Authentication does not work anymore and i will not be fixing it."
            )
          }
          to={""}
        >
          Log in
        </LinkButton>
        <LinkButton
          variant="outlined"
          color="secondary"
          to={""}
          onClick={() => {
            alert(
              "Authentication does not work anymore and i will not be fixing it."
            );
          }}
        >
          Sign up
        </LinkButton>
      </Stack>
    );
};

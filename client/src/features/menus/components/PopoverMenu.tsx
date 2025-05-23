import { MenuElementProps } from "../types";
import { Popover } from "@mui/material";

export const PopoverMenu = (props: MenuElementProps) => {
  const { isOpen, onOpen, onClose, anchorEl, ...other } = props;

  return (
    <Popover
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
      anchorEl={anchorEl}
      open={isOpen}
      onClose={onClose}
      onClick={(e) => {
        if (e.target instanceof Element) {
          const isCloseOnClickOption =
            e.target.getAttribute("id") == "closeOnClickOption";

          if (isCloseOnClickOption) return onClose();
        }
      }}
      {...other}
    >
      {props.children}
    </Popover>
  );
};

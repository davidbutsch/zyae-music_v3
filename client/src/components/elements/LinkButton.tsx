import { useAppNavigate } from "@/hooks";
import { Button, ButtonProps } from "@mui/material";

import { useMatch } from "react-router-dom";

interface LinkButtonProps extends ButtonProps {
  to: string;
  activeProps?: ButtonProps;
}

export const LinkButton = (props: LinkButtonProps) => {
  const { to, activeProps, ...other } = props;

  const navigate = useAppNavigate();
  const pathMatch = useMatch(to);

  return (
    <Button
      {...other}
      onClick={() =>
        to.startsWith("http") ? (document.location.href = to) : navigate(to)
      }
      {...(pathMatch ? activeProps : {})}
    />
  );
};

import { Button, ButtonProps, styled } from "@mui/material";
import { useMatch, useNavigate } from "react-router-dom";

interface LinkButtonProps extends ButtonProps {
  to: string;
  activeProps?: ButtonProps;
}

export const LinkButton = (props: LinkButtonProps) => {
  const { to, activeProps, ...other } = props;

  const navigate = useNavigate();
  const pathMatch = useMatch(to);

  return (
    <Button
      {...other}
      onClick={() => navigate(to)}
      {...(pathMatch ? activeProps : {})}
    />
  );
};

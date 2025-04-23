import { FontIcon, ImageIcon, LinkButton } from "@/components";
import { Box, SxProps, Typography, styled } from "@mui/material";

type AuthPromptPageProps = {
  icon?: string;
  image?: string;
  title?: string;
  subtext?: string;
  buttonText?: string;
  sx?: SxProps;
};

const StyledBox = styled(Box)(({ theme }) =>
  theme.unstable_sx({
    mt: 12,

    width: "100%",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    textAlign: "center",
  })
);

export const AuthPromptPage = ({
  icon,
  image,
  title,
  subtext,
  buttonText = "Get started",
  sx,
}: AuthPromptPageProps): JSX.Element => {
  return (
    <StyledBox sx={{ ...sx }}>
      {icon && <FontIcon icon={icon} size={128} />}
      {image && <ImageIcon src={image} size={128} />}
      <Typography variant="h5" mt={3} mb={1}>
        {title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={2}>
        {subtext}
      </Typography>
      <LinkButton
        to={``}
        variant="translucent"
        sx={{ px: 2 }}
        onClick={() =>
          alert(
            "Authentication does not work anymore and i will not be fixing it."
          )
        }
      >
        {buttonText}
      </LinkButton>
    </StyledBox>
  );
};

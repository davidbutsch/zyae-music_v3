import { CardSlider, ProgressiveImage } from "@/components";
import {
  Stack,
  SxProps,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";

import { ArtistCard } from "..";
import { theme } from "@/styles";
import { useAppNavigate } from "@/hooks";

const StyledTypography = styled(Typography)(({ theme }) =>
  theme.unstable_sx({
    fontSize: { xs: 14, sm: 16 },
  })
);

type CardProps = {
  artist: ArtistCard;
  carousel: boolean;
};

export const Card = ({ artist, carousel }: CardProps) => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const navigate = useAppNavigate();

  return (
    <Stack
      onClick={() => navigate(`/artist/${artist.id}`)}
      sx={{
        position: "relative",
        width: carousel
          ? {
              xs: "calc(calc(100% - 16px) / 2.075)",
              sm: "calc(calc(100% - 32px) / 3)",
              md: "calc(calc(100% - 48px) / 4)",
              lg: "calc(calc(100% - 64px) / 5)",
              xl: "calc(calc(100% - 80px) / 6)",
            }
          : {
              xs: "calc(calc(100% - 24px) / 2)",
              sm: "calc(calc(100% - 48px) / 3)",
              md: "calc(calc(100% - 72px) / 4)",
              lg: "calc(calc(100% - 120px) / 6)",
              xl: "calc(calc(100% - 168px) / 8)",
            },

        cursor: "pointer",

        ...(xs
          ? {
              "&:active": {
                transform: "scale(.975)",
                opacity: 0.5,
              },
            }
          : {
              "&:hover": {
                opacity: 0.75,
              },
            }),

        transition: ".3s",
      }}
    >
      <ProgressiveImage
        src={artist.thumbnails[artist.thumbnails.length - 1].url}
        sx={{ borderRadius: "100%" }}
      />
      <StyledTypography
        sx={{
          mt: { xs: 1, sm: 1.5 },

          fontWeight: 500,
          textAlign: "center",

          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",

          "@supports(-webkit-line-clamp: 2)": {
            whiteSpace: "initial",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
          },
        }}
      >
        {artist.name}
      </StyledTypography>
    </Stack>
  );
};

type ArtistCardProps = {
  title?: string;
  moreUrl?: string;
  carousel?: boolean;
  artists: ArtistCard[];
  sx?: SxProps;
};

export const ArtistCards = ({
  title,
  moreUrl,
  carousel = true,
  artists,
  sx,
}: ArtistCardProps) => {
  const artistCards = artists.map((artists) => (
    <Card key={artists.id} carousel={carousel} artist={artists} />
  ));

  if (carousel)
    return (
      <CardSlider sx={sx} moreUrl={moreUrl} title={title}>
        {artistCards}
      </CardSlider>
    );
  else
    return (
      <Stack sx={sx}>
        <Typography
          sx={{
            textTransform: "capitalize",
          }}
          mb={2.5}
          variant="h5"
          fontWeight={500}
        >
          {title}
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={3}>
          {artistCards}
        </Stack>
      </Stack>
    );
};

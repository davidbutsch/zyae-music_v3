import {
  CardSlider,
  FlaticonIcon,
  IconButton,
  ImageIcon,
  ProgressiveImage,
} from "@/components";
import {
  Stack,
  SxProps,
  Typography,
  alpha,
  styled,
  useMediaQuery,
} from "@mui/material";
import { colors, theme } from "@/styles";

import { AlbumCard } from "@/features/albums";
import { useNavigate } from "react-router-dom";

const StyledTypography = styled(Typography)(({ theme }) =>
  theme.unstable_sx({
    fontSize: { xs: 14, sm: 16 },
  })
);

type CardProps = {
  album: AlbumCard;
  carousel: boolean;
  sx?: SxProps;
};

export const Card = ({ album, carousel, sx }: CardProps) => {
  const navigate = useNavigate();

  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Stack
      onClick={() => navigate(`/album/${album.id}`)}
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

        ".shy": {
          opacity: 0,
          transform: "translateY(-25%)",
          transition: ".3s",
        },

        "&:hover .shy": {
          opacity: 1,
          transform: "translateY(0)",
        },

        ...sx,
      }}
    >
      {!xs && (
        <IconButton
          variant="translucent"
          sx={{
            position: "absolute",
            right: 8,
            top: 8,

            bgcolor: alpha(colors.bg, 0.75),

            "&:hover": {
              bgcolor: alpha(colors.bg, 0.85),
            },

            backdropFilter: "blur(8px)",
          }}
          className="shy"
        >
          <ImageIcon src={"https://zyae.net/assets/images/icons/play.svg"} />
        </IconButton>
      )}

      <ProgressiveImage src={album.thumbnail} sx={{ borderRadius: 1 / 4 }} />
      <StyledTypography
        sx={{
          mt: 1,

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
        {album.title}
      </StyledTypography>
      <Stack direction="row" spacing={1} alignItems="center">
        {album.isExplicit && (
          <FlaticonIcon icon="fi fi-rr-square-e" size={xs ? 12 : 14} />
        )}
        <StyledTypography color="text.secondary">
          {album.year} {album.type && `• ${album.type}`}
        </StyledTypography>
      </Stack>
    </Stack>
  );
};

type AlbumCardsProps = {
  title?: string;
  moreUrl?: string;
  carousel?: boolean;
  albums: AlbumCard[];
  sx?: SxProps;
};

export const AlbumCards = ({
  title,
  moreUrl,
  carousel = true,
  albums,
  sx,
}: AlbumCardsProps) => {
  const albumCards = albums.map((album) => (
    <Card key={album.id} carousel={carousel} album={album} />
  ));

  if (carousel)
    return (
      <CardSlider sx={sx} moreUrl={moreUrl} title={title}>
        {albumCards}
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
          {albumCards}
        </Stack>
      </Stack>
    );
};

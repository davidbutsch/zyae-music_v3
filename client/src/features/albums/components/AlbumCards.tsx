import {
  CardSlider,
  FlaticonIcon,
  IconButton,
  ImageIcon,
  ProgressiveImage,
} from "@/components";
import { Stack, Typography, alpha, styled, useMediaQuery } from "@mui/material";
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
};

const Card = ({ album, carousel }: CardProps) => {
  const navigate = useNavigate();

  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <Stack
      key={album.id}
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

        ".shy": {
          opacity: 0,
        },

        "&:hover .shy": {
          opacity: 1,
        },
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
};

export const AlbumCards = ({
  title = "Albums",
  moreUrl,
  carousel = true,
  albums,
}: AlbumCardsProps) => {
  const albumCards = albums.map((album) => (
    <Card carousel={carousel} album={album} />
  ));

  if (carousel)
    return (
      <CardSlider moreUrl={moreUrl} title={title}>
        {albumCards}
      </CardSlider>
    );
  else
    return (
      <Stack direction="row" flexWrap="wrap" gap={3}>
        {albumCards}
      </Stack>
    );
};

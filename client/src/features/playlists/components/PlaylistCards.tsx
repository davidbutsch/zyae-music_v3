import {
  Box,
  Button,
  Stack,
  SxProps,
  Typography,
  alpha,
  styled,
  useMediaQuery,
} from "@mui/material";
import {
  CardSlider,
  FontIcon,
  IconButton,
  ProgressiveImage,
} from "@/components";
import { colors, theme } from "@/styles";

import { PlaylistCard } from "..";
import { useAppNavigate } from "@/hooks";
import { useQueue } from "@/features/player";

const StyledTypography = styled(Typography)(({ theme }) =>
  theme.unstable_sx({
    fontSize: { xs: 13, sm: 16 },

    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  })
);

type CardProps = {
  playlist: PlaylistCard;
  carousel: boolean;
};

export const Card = ({ playlist, carousel }: CardProps) => {
  const navigate = useAppNavigate();

  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const { playQueue } = useQueue({
    queueSource: {
      title: playlist.title,
      id: playlist.id,
      type: "playlist",
    },
  });

  return (
    <Stack
      onClick={() => navigate(`/playlist/${playlist.id}`)}
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
      {!xs && (
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            playQueue();
          }}
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

            zIndex: 1,
          }}
          className="shy"
        >
          <FontIcon icon="zi-play" size={14} />
        </IconButton>
      )}
      <ProgressiveImage
        src={playlist.thumbnails[playlist.thumbnails.length - 1].url}
        sx={{ borderRadius: 1 / 2 }}
      />
      <StyledTypography
        sx={{
          mt: { xs: 1, sm: 1.5 },

          fontWeight: 500,

          "@supports(-webkit-line-clamp: 2)": {
            whiteSpace: "initial",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
          },
        }}
      >
        {playlist.title}
      </StyledTypography>
      <Stack direction="row" spacing={1} alignItems="center">
        <StyledTypography color="text.secondary">
          {playlist.sub}
        </StyledTypography>
      </Stack>
    </Stack>
  );
};

type PlaylistCardsProps = {
  title?: string;
  moreUrl?: string;
  carousel?: boolean;
  playlists: PlaylistCard[];
  disableSliderButtons?: boolean;
  sx?: SxProps;
};

export const PlaylistCards = ({
  title,
  moreUrl,
  carousel = true,
  playlists,
  disableSliderButtons,
  sx,
}: PlaylistCardsProps) => {
  const navigate = useAppNavigate();
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const playlistCards = playlists.map((playlist) => (
    <Card key={playlist.id} carousel={carousel} playlist={playlist} />
  ));

  if (carousel)
    return (
      <CardSlider
        sx={sx}
        moreUrl={moreUrl}
        title={title}
        disableSliderButtons={disableSliderButtons}
      >
        {playlistCards}
      </CardSlider>
    );
  else
    return (
      <Box sx={sx}>
        <Stack direction="row">
          {title && (
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
          )}
          {moreUrl && (
            <Button
              variant="outlined"
              size={xs ? "small" : "medium"}
              onClick={() => navigate(moreUrl)}
              sx={{
                ml: "auto",
              }}
            >
              More
            </Button>
          )}
        </Stack>
        <Stack direction="row" flexWrap="wrap" gap={3}>
          {playlistCards}
        </Stack>
      </Box>
    );
};

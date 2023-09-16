import { CardSlider, FlaticonIcon, ProgressiveImage } from "@/components";
import { Stack, Typography, styled, useMediaQuery } from "@mui/material";

import { ArtistCard } from "@/features/artists";
import { theme } from "@/styles";
import { useNavigate } from "react-router-dom";

type ArtistCardsProps = {
  title?: string;
  artists: ArtistCard[];
};

const Card = styled(Stack)(({ theme }) =>
  theme.unstable_sx({
    width: {
      xs: "calc(calc(100% - 16px) / 2.075)",
      sm: "calc(calc(100% - 32px) / 3)",
      md: "calc(calc(100% - 48px) / 4)",
      lg: "calc(calc(100% - 64px) / 5)",
      xl: "calc(calc(100% - 80px) / 6)",
    },
    cursor: "pointer",
  })
);

const StyledTypography = styled(Typography)(({ theme }) =>
  theme.unstable_sx({
    fontSize: { xs: 14, sm: 16 },
  })
);

export const ArtistCards = ({
  title = "Artists",
  artists,
}: ArtistCardsProps) => {
  const navigate = useNavigate();

  return (
    <CardSlider title={title}>
      {artists.map((artist) => (
        <Card key={artist.id} onClick={() => navigate(`/artist/${artist.id}`)}>
          <ProgressiveImage
            src={artist.thumbnail}
            sx={{
              borderRadius: "100%",
            }}
          />
          <StyledTypography
            sx={{
              mt: 1,

              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",

              textAlign: "center",

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
        </Card>
      ))}
    </CardSlider>
  );
};

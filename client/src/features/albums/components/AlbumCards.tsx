import { CardSlider, FlaticonIcon, Image } from "@/components";
import { Stack, Typography, styled, useMediaQuery } from "@mui/material";

import { AlbumCard } from "@/features/albums";
import { theme } from "@/styles";

type AlbumCards = {
  title?: string;
  albums: AlbumCard[];
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
  })
);

const StyledTypography = styled(Typography)(({ theme }) =>
  theme.unstable_sx({
    fontSize: { xs: 14, sm: 16 },
  })
);

export const AlbumCards = ({ title = "Albums", albums }: AlbumCards) => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  return (
    <CardSlider title={title}>
      {albums.map((album) => (
        <Card key={album.id}>
          <Image src={album.thumbnail} sx={{ borderRadius: 1 / 4 }} />
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
              {album.year}
            </StyledTypography>
          </Stack>
        </Card>
      ))}
    </CardSlider>
  );
};

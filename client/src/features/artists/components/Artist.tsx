// import { Image } from "@/components";

import {
  Box,
  Button,
  Stack,
  Typography,
  alpha,
  styled,
  useMediaQuery,
} from "@mui/material";
import { FlaticonIcon, IconButton } from "@/components";

import { Content } from "@/components/layout/Content";
import { TracksList } from "@/features/tracks";
import { theme } from "@/styles";

type BannerImageProps = {
  src: string;
};

const BannerImage = styled(Box, {
  shouldForwardProp: (prop) => prop !== "src",
})<BannerImageProps>(({ theme, src }) => {
  return theme.unstable_sx({
    width: "100%",
    height: { xs: "40vh", sm: "auto" },
    minHeight: "50vh",
    maxHeight: "70%",

    aspectRatio: "1.81 / 1",

    backgroundSize: `cover`,
    backgroundPosition: "center center",

    backgroundImage: `url(${src})`,
    mask: "linear-gradient(to bottom, #fff, transparent)",
  });
});

const BannerButton = styled(Button)(({ theme }) => {
  return theme.unstable_sx({ px: 3, gap: 1.5 });
});

export const Artist = () => {
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.only("xs"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const artist = {
    description:
      "Jermaine Lamarr Cole is an American rapper and record producer. Born on a military base in Germany and raised in Fayetteville, North Carolina, Cole initially gained recognition as a rapper following the release of his debut mixtape, The Come Up, in early 2007. Intent on further pursuing a musical career, he went on to release two additional mixtapes, The Warm Up and Friday Night Lights both to critical acclaim, after signing to Jay-Z's Roc Nation imprint in 2009.\nCole released his debut studio album, Cole World: The Sideline Story, in 2011. It debuted at number one on the US Billboard 200. His next album, Born Sinner, also topped the Billboard 200. Moving into more conscious themes, 2014 Forest Hills Drive topped the Billboard 200 and earned Cole a Best Rap Album nomination at the 2015 Grammy Awards. His jazz influenced fourth album, 4 Your Eyez Only, debuted at number one on the Billboard 200. Cole's fifth album, KOD, became his fifth number-one album on the Billboard 200 and featured a then-record six simultaneous top twenty hits on the Billboard Hot 100, tying with the Beatles.\n\nFrom Wikipedia (https://en.wikipedia.org/wiki/J._Cole) under Creative Commons Attribution CC-BY-SA 3.0 (http://creativecommons.org/licenses/by-sa/3.0/legalcode)",
    views: "3,370,815,205 views",
    name: "Mac Miller",
    saved: false,
    thumbnails: {
      banner: {
        mobile:
          "https://lh3.googleusercontent.com/2mW8aHStIR7OpN4ZAEbusTSbNnUoLYRJ6EqkOLx3EL_eCjr5shAgjm4zTxqZubxVOfZracBo=w1440-h1440-p-l90-rj",
        desktop:
          "https://lh3.googleusercontent.com/2mW8aHStIR7OpN4ZAEbusTSbNnUoLYRJ6EqkOLx3EL_eCjr5shAgjm4zTxqZubxVOfZracBo=w1440-h800-p-l90-rj",
      },
    },
    tracks: {
      id: "VLOLAK5uy_nqT7cKKEOzPNdYs_5hhnHfslqcU9yT4kM",
      results: [
        {
          id: "rn4mVQswfNg",
          title: "Self Care",
          thumbnail:
            "https://lh3.googleusercontent.com/YxyJh9VYIKgPAulnGiK6OMmBm2r_3eSTsm1myZu1qSKXlb77sSKlGl8VOgxU0tS1LJreNMntkktrp2Y=w120-h120-l90-rj",
          artists: [
            {
              name: "Mac Miller",
              id: "UC52ZqHVQz5OoGhvbWiRal6g",
            },
          ],
          album: {
            title: "Swimming",
            id: "MPREb_2Tww0gIU6Os",
          },
          saved: false,
          isAvailable: true,
          isExplicit: true,
        },
        {
          id: "eF0Nsnk6wis",
          title: "Congratulations (feat. Bilal)",
          thumbnail:
            "https://lh3.googleusercontent.com/QgFG5RHpesQcNq4JDY51ot0i2GRRf7GFpiO49zyAVO2C5YyKxCTglY0A9c4zBCHWkLrtg7mi-0UY5Uc=w120-h120-l90-rj",
          artists: [
            {
              name: "Mac Miller",
              id: "UC52ZqHVQz5OoGhvbWiRal6g",
            },
          ],
          album: {
            title: "The Divine Feminine",
            id: "MPREb_kCZ6WUs8Rg3",
          },
          saved: false,
          isAvailable: true,
          isExplicit: true,
        },
        {
          id: "dLWV58BhE7Q",
          title: "Good News",
          thumbnail:
            "https://lh3.googleusercontent.com/CEFIvocPbLa479SM1xgzhKUebp_m4e4mInjQtDAASjKB3T8vJF8BvNJNnzaQ9nNaxD316162j3Xs-z3E=w120-h120-l90-rj",
          artists: [
            {
              name: "Mac Miller",
              id: "UC52ZqHVQz5OoGhvbWiRal6g",
            },
          ],
          album: {
            title: "Circles",
            id: "MPREb_fUxID6Oy0EU",
          },
          saved: false,
          isAvailable: true,
          isExplicit: true,
        },
      ],
    },
    albums: {
      id: "UC52ZqHVQz5OoGhvbWiRal6g",
      results: [
        {
          id: "MPREb_akxPeta2FRh",
          title: "I Love Life, Thank You",
          year: "2022",
          thumbnail:
            "https://lh3.googleusercontent.com/579D6XaFplIAH4eAEd2B_IV7TrXkokkDK_RKQ4VutvR4i2J4rmv-XyiDa8f5lUaqio4zv9zrpxtzQYc=w544-h544-l90-rj",
          saved: false,
          isExplicit: true,
        },
      ],
    },
  };

  return (
    <>
      <BannerImage
        src={artist.thumbnails.banner[isSmallScreen ? "mobile" : "desktop"]}
      />
      <Content>
        <Stack
          mt={{ xs: -15, sm: -25, md: -27.5 }}
          alignItems={isExtraSmallScreen ? "center" : "baseline"}
          spacing={isExtraSmallScreen ? 2 : 1.5}
        >
          <Typography
            variant="h3"
            textAlign={isExtraSmallScreen ? "center" : "left"}
            fontSize={{ xs: 56, sm: 56, md: 72 }}
          >
            {artist.name}
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            spacing={isExtraSmallScreen ? 2 : 1.5}
            width="100%"
          >
            <BannerButton variant="contained" fullWidth={isExtraSmallScreen}>
              <FlaticonIcon icon="fi fi-rr-shuffle" />
              Shuffle
            </BannerButton>
            <BannerButton variant="outlined" fullWidth={isExtraSmallScreen}>
              <FlaticonIcon icon="fi fi-rr-bookmark" />
              Save
            </BannerButton>
            {!isExtraSmallScreen && (
              <IconButton>
                <FlaticonIcon icon="fi fi-rr-menu-dots-vertical" />
              </IconButton>
            )}
          </Stack>
        </Stack>
        <Stack mt={15}>
          <TracksList title="Top Songs" tracks={artist.tracks.results} />
        </Stack>
      </Content>
    </>
  );
};

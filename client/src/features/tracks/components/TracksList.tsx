import {
  Box,
  Grid,
  IconButton,
  Stack,
  SxProps,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { FlaticonIcon, Image } from "@/components";

import { ArtistLink } from "@/features/artists";
import { Track } from "@/features/tracks";
import { theme } from "@/styles";

const heads = {
  artist: (
    <Grid container mb={1}>
      <Grid item xs={5}>
        <Typography fontWeight={500}>Title</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography fontWeight={500}>Title</Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography fontWeight={500}>Title</Typography>
      </Grid>
    </Grid>
  ),
};

// const bodies = {
//   artist: (tracks: Track[], { xs, md }: { xs: boolean; md: boolean }) => {
//     return (
//       <Stack
//         sx={{
//           minWidth: 0,
//           "> div:not(:last-child)": {
//             borderBottom: "1px solid rgba(255,255,255,.05)",
//           },
//         }}
//       >
//         {tracks.map((track) => (
//           <Grid
//             container
//             key={track.id}
//             wrap="nowrap"
//             sx={{
//               bgcolor: md ? "transparent" : "transparent",
//               "> div:last-child": {
//                 opacity: 1,
//               },
//               minWidth: 0,

//               "&:hover": {
//                 "> div:last-child": {
//                   opacity: 1,
//                 },
//               },
//             }}
//           >
//             <StyledGrid item xs={5}>
//               <Image
//                 src={track.thumbnail.small}
//                 height={34}
//                 width={34}
//                 sx={{ borderRadius: 1 / 8 }}
//               />
//               <StyledTypography fontWeight={500} pl={1}>
//                 {track.title}
//               </StyledTypography>
//               {track.isExplicit && (
//                 <FlaticonIcon size={12} icon="fi fi-rr-square-e" />
//               )}
//             </StyledGrid>
//             <StyledGrid item xs={3}>
//               <StyledTypography fontWeight={500} color="text.secondary">
//                 {track.artists.map((artist, i) => {
//                   return (
//                     <React.Fragment key={artist.id}>
//                       {i + 1 == track.artists.length ? (
//                         <StyledLink
//                           color={"text.secondary"}
//                           sx={{ textDecoration: "none" }}
//                           component={RouterLink}
//                           to={`/artist/${artist.id}`}
//                         >
//                           {artist.name}
//                         </StyledLink>
//                       ) : (
//                         <>
//                           <StyledLink
//                             color={"text.secondary"}
//                             component={RouterLink}
//                             to={`/artist/${artist.id}`}
//                           >
//                             {artist.name}
//                           </StyledLink>
//                           {" & "}
//                         </>
//                       )}
//                     </React.Fragment>
//                   );
//                 })}
//               </StyledTypography>
//             </StyledGrid>
//             <StyledGrid item xs={3}>
//               <StyledTypography fontWeight={500} color="text.secondary">
//                 {track.album.title}
//               </StyledTypography>
//             </StyledGrid>
//             <StyledGrid item justifyContent="center" xs bgcolor="blue">
//               <Stack bgcolor="red" direction="row">
//                 <IconButton>
//                   <FlaticonIcon icon="fi fi-rr-bookmark" />
//                 </IconButton>
//                 <IconButton>
//                   <FlaticonIcon icon="fi fi-rr-menu-dots-vertical" />
//                 </IconButton>
//               </Stack>
//             </StyledGrid>
//           </Grid>
//         ))}
//       </Stack>
//     );
//   },
// };

const Container = styled(Stack)(({ theme }) =>
  theme.unstable_sx({
    minWidth: 0,
    display: "flex !important",
  })
);

const Row = styled(Stack)(({ theme }) =>
  theme.unstable_sx({
    py: 1,

    position: "relative",

    flexDirection: "row",
    alignItems: "center",

    "&:not(&:last-child)": {
      borderBottom: "1px solid rgba(255,255,255,.05)",
    },

    "> div:last-child": {
      opacity: 0,
    },

    "&:hover": {
      "> div:last-child": {
        opacity: 1,
      },
    },
  })
);

const Cell = styled(Stack)(({ theme }) =>
  theme.unstable_sx({
    pl: 1,

    minWidth: 0,

    flexDirection: "row",
    alignItems: "center",

    "> p, span": {
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
  })
);

const lists = {
  artist: (tracks: Track[], {}: { xs: boolean; md: boolean }) => (
    <Container>
      {tracks.map((track) => (
        <Row key={track.id}>
          <Cell width="40%" gap={1}>
            <Image
              src={track.thumbnail.small}
              height={32}
              width={32}
              sx={{ borderRadius: 1 / 8 }}
            />
            <Typography fontWeight={500} pl={1}>
              {track.title}
            </Typography>
            {track.isExplicit && (
              <FlaticonIcon size={12} icon="fi fi-rr-square-e" />
            )}
          </Cell>
          <Cell width="20%">
            <ArtistLink artists={track.artists} />
          </Cell>
          <Cell width="30%">
            <Typography color="text.secondary">{track.album.title}</Typography>
          </Cell>
          <Cell width="fit-content" ml="auto" justifyContent="end">
            <IconButton>
              <FlaticonIcon icon="fi fi-rr-bookmark" />
            </IconButton>
            <IconButton>
              <FlaticonIcon icon="fi fi-rr-menu-dots-vertical" />
            </IconButton>
          </Cell>
        </Row>
      ))}
    </Container>
  ),
};

type TracksListProps = {
  variant: "artist";
  displayHead?: boolean;
  tracks: Track[];
  sx?: SxProps;
};

export const TracksList = ({
  variant,
  displayHead = false,
  tracks,
  sx,
}: TracksListProps): JSX.Element => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));
  const md = useMediaQuery(theme.breakpoints.only("md"));

  return (
    <Box sx={sx}>
      {displayHead && heads[variant]}
      {lists[variant](tracks, { xs, md })}
    </Box>
  );
};

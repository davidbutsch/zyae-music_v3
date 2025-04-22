import { ArtistCards } from "@/features/artists";
import { LoadingBubblesPage } from "@/components";
import { ResultRow } from "./ResultRow";
import { ResultsWrapper } from "./ResultsWrapper";
import { theme } from "@/styles";
import { useAppNavigate } from "@/hooks";
import { useMediaQuery } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSearchResults } from "..";

export const ArtistsResults = () => {
  const xs = useMediaQuery(theme.breakpoints.only("xs"));

  const navigate = useAppNavigate();

  const { query } = useParams();

  if (!query) return;

  const { data: results } = useSearchResults(query, "artists");

  if (!results) return <LoadingBubblesPage />;

  return (
    <ResultsWrapper>
      {xs ? (
        results.map((artist) => (
          <ResultRow
            key={artist.id}
            item={{
              id: artist.id,
              head: artist.name,
              sub: "",
              thumbnails: artist.thumbnails,
              type: "artist",
            }}
            onClick={() => navigate(`/artist/${artist.id}`)}
          />
        ))
      ) : (
        <ArtistCards carousel={false} artists={results} />
      )}
    </ResultsWrapper>
  );
};

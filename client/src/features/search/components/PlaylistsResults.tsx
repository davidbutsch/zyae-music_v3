import { LoadingBubblesPage } from "@/components";
import { PlaylistCards } from "@/features/playlists";
import { ResultsWrapper } from "./ResultsWrapper";
import { useParams } from "react-router-dom";
import { useSearchResults } from "..";

export const PlaylistsResults = () => {
  const { query } = useParams();

  if (!query) return;

  const { data: results } = useSearchResults(query, "playlists");

  if (!results) return <LoadingBubblesPage />;

  return (
    <ResultsWrapper>
      <PlaylistCards
        carousel={false}
        playlists={results}
        sx={{
          py: "6px",
        }}
      />
    </ResultsWrapper>
  );
};

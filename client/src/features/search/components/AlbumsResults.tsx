import { AlbumCards } from "@/features/albums";
import { LoadingBubblesPage } from "@/components";
import { ResultsWrapper } from "./ResultsWrapper";
import { useParams } from "react-router-dom";
import { useSearchResults } from "..";

export const AlbumsResults = () => {
  const { query } = useParams();

  if (!query) return;

  const { data: results } = useSearchResults(query, "albums");

  if (!results) return <LoadingBubblesPage />;

  return (
    <ResultsWrapper>
      <AlbumCards
        carousel={false}
        albums={results}
        sx={{
          py: "6px",
        }}
      />
    </ResultsWrapper>
  );
};

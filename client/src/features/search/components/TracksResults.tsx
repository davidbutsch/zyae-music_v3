import { LoadingBubblesPage } from "@/components";
import { ResultsWrapper } from "./ResultsWrapper";
import { TracksList } from "@/features/tracks";
import { useParams } from "react-router-dom";
import { useSearchResults } from "..";

export const TracksResults = () => {
  const { query } = useParams();

  if (!query) return;

  const { data: results } = useSearchResults(query, "tracks");

  if (!results) return <LoadingBubblesPage />;

  return (
    <ResultsWrapper>
      <TracksList tracks={results} />
    </ResultsWrapper>
  );
};

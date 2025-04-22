import { TracksListPage } from "@/components";
import { useGenre } from "@/features/genres";
import { useParams } from "react-router-dom";

export const GenreTracksPage = () => {
  const { params } = useParams();
  if (!params) return;
  const { data: genre } = useGenre(params);

  return (
    <TracksListPage
      title={`Popular Now – ${genre?.title}`}
      tracks={genre?.tracks.results}
    />
  );
};

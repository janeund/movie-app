import { useParams } from 'react-router-dom';
import type { ShowDetails } from '../api/types.ts';
import { useTmdb } from '../hooks/useTmdb.ts';
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts';
import BackHome from '../components/BackHome.tsx';
import DetailsTop from '../components/DetailsTop.tsx';
import CastAndReviews from '../components/CastAndReviews.tsx';
import StatusMessage from '../components/StatusMessage.tsx';

export default function ShowDetailsPage() {
  const { id } = useParams();
  const { data: show, error } = useTmdb<ShowDetails>(`tv/${id}`);
  useDocumentTitle(show?.name);

  if (error) return <StatusMessage title="TV series not found" text="This series doesn't exist or could not be loaded." />;

  const runtime = show?.episode_run_time?.[0];

  return (
    <div className="container">
      <BackHome />
      {show && (
        <section className="section-mb">
          <DetailsTop
            title={show.name}
            posterPath={show.poster_path}
            backdropPath={show.backdrop_path}
            year={show.first_air_date?.slice(0, 4)}
            voteAverage={show.vote_average}
            voteCount={show.vote_count}
            runtime={runtime ? `${runtime}min` : undefined}
            tagline={show.tagline}
            overview={show.overview}
            genres={show.genres}
          />
        </section>
      )}
      <CastAndReviews basePath={`tv/${id}`} />
    </div>
  );
}

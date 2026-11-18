import { useParams } from 'react-router-dom';
import type { MovieDetails } from '../api/types.ts';
import { minToHours } from '../api/tmdb.ts';
import { useTmdb } from '../hooks/useTmdb.ts';
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts';
import BackHome from '../components/BackHome.tsx';
import DetailsTop from '../components/DetailsTop.tsx';
import CastAndReviews from '../components/CastAndReviews.tsx';
import StatusMessage from '../components/StatusMessage.tsx';

export default function MovieDetailsPage() {
  const { id } = useParams();
  const { data: movie, error } = useTmdb<MovieDetails>(`movie/${id}`);
  useDocumentTitle(movie?.title);

  if (error) return <StatusMessage title="Movie not found" text="This movie doesn't exist or could not be loaded." />;

  return (
    <div className="container">
      <BackHome />
      {movie && (
        <section className="section-mb">
          <DetailsTop
            title={movie.title}
            posterPath={movie.poster_path}
            backdropPath={movie.backdrop_path}
            year={movie.release_date?.slice(0, 4)}
            voteAverage={movie.vote_average}
            voteCount={movie.vote_count}
            runtime={movie.runtime ? minToHours(movie.runtime) : undefined}
            tagline={movie.tagline}
            overview={movie.overview}
            genres={movie.genres}
          />
        </section>
      )}
      <CastAndReviews basePath={`movie/${id}`} />
    </div>
  );
}

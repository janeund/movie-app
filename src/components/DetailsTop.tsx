import type { Genre } from '../api/types.ts';
import { formatVotes, imageUrl } from '../api/tmdb.ts';

interface DetailsTopProps {
  title: string;
  posterPath: string | null;
  backdropPath: string | null;
  year?: string;
  voteAverage: number;
  voteCount: number;
  runtime?: string;
  tagline?: string;
  overview: string;
  genres: Genre[];
}

// Poster, facts, overview and genres for a movie or a TV series
export default function DetailsTop(props: DetailsTopProps) {
  const poster = imageUrl(props.posterPath);
  const backdrop = imageUrl(props.backdropPath, 'original');

  return (
    <>
      {backdrop && <div className="details-overlay-image" style={{ backgroundImage: `url(${backdrop})` }} />}
      <div className="details-top">
        <div className="details-poster">
          {poster ? <img src={poster} alt={props.title} /> : <div className="no-image-big">No image</div>}
        </div>
        <div className="details-info">
          <h1 className="details-title-main">{props.title}</h1>
          <ul className="details-facts">
            {props.year && <li className="details-date">{props.year}</li>}
            <li className="details-vote">
              <i className="fa-solid fa-star" aria-hidden="true" />
              <div className="rating">{props.voteAverage.toFixed(1)} / 10</div>
              <div className="vote-total">({formatVotes(props.voteCount)})</div>
            </li>
            {props.runtime && <li className="details-runtime">{props.runtime}</li>}
          </ul>
          {props.tagline && <div className="details-tagline">{props.tagline}</div>}
          <div className="details-overview">
            <h2 className="details-title-secondary">Overview</h2>
            <p className="details-overview-text">{props.overview || 'No overview yet.'}</p>
          </div>
          {props.genres.length > 0 && (
            <div className="details-genres">
              <h2 className="details-title-secondary">Genres</h2>
              <ul className="genres">
                {props.genres.map((genre) => (
                  <li key={genre.id} className="genre">{genre.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

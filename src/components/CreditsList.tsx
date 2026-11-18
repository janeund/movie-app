import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { PersonCredit } from '../api/types.ts';
import { imageUrl } from '../api/tmdb.ts';

const PAGE_SIZE = 10;

function CreditItem({ credit }: { credit: PersonCredit }) {
  const title = credit.title ?? credit.name ?? '';
  const date = credit.release_date ?? credit.first_air_date ?? '';
  const poster = imageUrl(credit.poster_path);
  const to = credit.media_type === 'movie' ? `/movie/${credit.id}` : `/show/${credit.id}`;

  return (
    <li className="credits-item card-l">
      <Link className="credit-poster" to={to} aria-label={title}>
        {poster ? <img src={poster} alt={title} loading="lazy" /> : <div className="no-image">No image</div>}
      </Link>
      <div className="credit-info">
        <div className="credits-item-top">
          <h3 className="credits-item-title">
            <Link to={to}>{title}</Link>
          </h3>
          <p className="credits-item-date">{date.slice(0, 4)}</p>
        </div>
        <div className="credits-facts">
          {credit.vote_average > 0 && (
            <div className="credits-vote">
              <i className="fa-solid fa-star" aria-hidden="true" />
              <div className="rating">{credit.vote_average.toFixed(1)}</div>
            </div>
          )}
          <div className="credits-character">{credit.character}</div>
        </div>
      </div>
    </li>
  );
}

// Filmography, 10 titles at a time
export default function CreditsList({ credits }: { credits: PersonCredit[] }) {
  const [shown, setShown] = useState(PAGE_SIZE);
  const left = credits.length - shown;

  if (credits.length === 0) return <p>No credits yet.</p>;

  return (
    <>
      <ul className="credits-list section-list-l">
        {credits.slice(0, shown).map((credit) => (
          <CreditItem key={credit.credit_id} credit={credit} />
        ))}
      </ul>
      {left > 0 && (
        <button className="btn btn-load-more" type="button" onClick={() => setShown((n) => n + PAGE_SIZE)}>
          Load more ({left})
        </button>
      )}
    </>
  );
}

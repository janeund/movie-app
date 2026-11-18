import { Link, useSearchParams } from 'react-router-dom';
import type { Paged, SearchResult } from '../api/types.ts';
import { imageUrl } from '../api/tmdb.ts';
import { useTmdb } from '../hooks/useTmdb.ts';
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts';
import StatusMessage from '../components/StatusMessage.tsx';

function describe(result: SearchResult) {
  switch (result.media_type) {
    case 'movie':
      return { to: `/movie/${result.id}`, title: result.title, top: result.release_date, bottom: result.overview, image: result.poster_path };
    case 'tv':
      return { to: `/show/${result.id}`, title: result.name, top: result.first_air_date, bottom: result.overview, image: result.poster_path };
    default:
      return {
        to: `/person/${result.id}`,
        title: result.name,
        top: result.known_for_department,
        bottom: result.known_for.map((item) => item.title ?? item.name).join(', '),
        image: result.profile_path,
      };
  }
}

function ResultItem({ result }: { result: SearchResult }) {
  const item = describe(result);
  const src = imageUrl(item.image);
  return (
    <li className="search-results-item card-l">
      <Link className="search-results-poster" to={item.to} aria-label={item.title}>
        {src ? (
          <img className="search-results-image popular-card-image" src={src} alt={item.title} loading="lazy" />
        ) : (
          <div className="no-image search-no-image">No image</div>
        )}
      </Link>
      <div className="card-body">
        <h2 className="card-title">
          <Link to={item.to}>{item.title}</Link>
        </h2>
        <div className="card-text-top">{item.top}</div>
        <div className="card-text-bottom">{item.bottom}</div>
      </div>
    </li>
  );
}

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  // `search-term` is the parameter name the old multi-page site used
  const term = params.get('q') ?? params.get('search-term') ?? '';
  const page = Math.max(1, Number(params.get('page')) || 1);
  useDocumentTitle(term ? `Search: ${term}` : 'Search Results');

  const { data, error, loading } = useTmdb<Paged<SearchResult>>(term ? 'search/multi' : null, { query: term, page });

  function goTo(nextPage: number) {
    setParams({ q: term, page: String(nextPage) });
  }

  if (error) return <StatusMessage title="Something went wrong" text="Search is not available right now." />;

  return (
    <div className="container">
      <section className="search-results-wrapper section-mb">
        <h1 className="search-results-title title-page">Search results</h1>

        {!term && <p>Type something in the search field above.</p>}

        {data && data.results.length === 0 && !loading && <p>There are no results for “{term}”.</p>}

        {data && data.results.length > 0 && (
          <>
            <div className="search-results-heading">
              {data.results.length} of {data.total_results} results for {term}
            </div>
            <ul className="search-results section-list-l">
              {data.results.map((result) => (
                <ResultItem key={`${result.media_type}-${result.id}`} result={result} />
              ))}
            </ul>
            <div className="pagination">
              <button className="btn btn-prev" type="button" aria-label="Previous page" disabled={page <= 1} onClick={() => goTo(page - 1)}>
                <i className="fa-solid fa-arrow-left" aria-hidden="true" />
              </button>
              <button className="btn btn-next" type="button" aria-label="Next page" disabled={page >= data.total_pages} onClick={() => goTo(page + 1)}>
                <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </button>
              <div className="page-counter">
                Page {page} of {data.total_pages}
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

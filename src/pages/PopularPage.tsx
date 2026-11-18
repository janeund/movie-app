import type { MovieSummary, Paged, PersonSummary, ShowSummary } from '../api/types.ts';
import { useTmdb } from '../hooks/useTmdb.ts';
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts';
import MediaCard from '../components/MediaCard.tsx';
import StatusMessage from '../components/StatusMessage.tsx';

type Kind = 'movies' | 'shows' | 'people';
type Item = MovieSummary | ShowSummary | PersonSummary;

const CONFIG: Record<Kind, { title: string; endpoint: string }> = {
  movies: { title: 'Popular movies', endpoint: 'movie/popular' },
  shows: { title: 'Popular TV series', endpoint: 'tv/popular' },
  people: { title: 'Popular celebs', endpoint: 'person/popular' },
};

function toCard(kind: Kind, item: Item) {
  if (kind === 'movies') {
    const movie = item as MovieSummary;
    return { to: `/movie/${movie.id}`, title: movie.title, subtitle: movie.release_date, image: movie.poster_path };
  }
  if (kind === 'shows') {
    const show = item as ShowSummary;
    return { to: `/show/${show.id}`, title: show.name, subtitle: show.first_air_date, image: show.poster_path };
  }
  const person = item as PersonSummary;
  return { to: `/person/${person.id}`, title: person.name, subtitle: person.known_for_department, image: person.profile_path };
}

// Grid of popular movies, TV series or people
export default function PopularPage({ kind }: { kind: Kind }) {
  const { title, endpoint } = CONFIG[kind];
  useDocumentTitle(title);
  const { data, error } = useTmdb<Paged<Item>>(endpoint);

  if (error) return <StatusMessage title="Something went wrong" text="Could not load data from The Movie DB." />;

  return (
    <div className="container">
      <h1 className="popular-title title-page">{title}</h1>
      <div className="popular-wrapper">
        {data?.results.map((item) => {
          const card = toCard(kind, item);
          return (
            <MediaCard
              key={item.id}
              className="popular-card"
              imageClassName="popular-card-image"
              to={card.to}
              title={card.title}
              subtitle={card.subtitle}
              imagePath={card.image}
            />
          );
        })}
      </div>
    </div>
  );
}

import type { Credits, Paged, Review } from '../api/types.ts';
import { useTmdb } from '../hooks/useTmdb.ts';
import MediaCard from './MediaCard.tsx';
import ReviewCard from './ReviewCard.tsx';
import Slider from './Slider.tsx';

// Top cast and user reviews for `movie/123` or `tv/123`; empty sections are hidden
export default function CastAndReviews({ basePath }: { basePath: string }) {
  const credits = useTmdb<Credits>(`${basePath}/credits`);
  const reviews = useTmdb<Paged<Review>>(`${basePath}/reviews`);

  const actors = (credits.data?.cast ?? []).filter((actor) => actor.known_for_department === 'Acting').slice(0, 10);
  const reviewList = reviews.data?.results ?? [];

  return (
    <>
      {actors.length > 0 && (
        <section className="section-mb">
          <h2 className="details-title-secondary">Top Cast</h2>
          <Slider
            label="Top cast"
            items={actors}
            getKey={(actor) => actor.id}
            renderItem={(actor) => (
              <MediaCard to={`/person/${actor.id}`} title={actor.name} subtitle={actor.character} imagePath={actor.profile_path} />
            )}
          />
        </section>
      )}

      {reviewList.length > 0 && (
        <section className="details-reviews section-mb">
          <h2 className="details-title-secondary">User reviews</h2>
          <Slider
            label="User reviews"
            variant="reviews"
            items={reviewList}
            getKey={(review) => review.id}
            renderItem={(review) => <ReviewCard review={review} />}
          />
        </section>
      )}
    </>
  );
}

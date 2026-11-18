import type { Review } from '../api/types.ts';
import { imageUrl } from '../api/tmdb.ts';

export default function ReviewCard({ review }: { review: Review }) {
  const { username, avatar_path, rating } = review.author_details;
  const avatar = imageUrl(avatar_path);

  return (
    <article className="review-card">
      <div className="review-card-header">
        <div className="review-card-avatar">
          {avatar ? <img className="review-image" src={avatar} alt="" /> : <i className="fa-regular fa-user" aria-hidden="true" />}
        </div>
        <div className="review-card-username">
          Review by <span>{username}</span>
        </div>
      </div>
      <div className="review-card-main">
        <p className="review-card-text">{review.content.slice(0, 110)}...</p>
      </div>
      <div className="review-card-footer">
        <div className="review-card-rating">
          {rating ? (
            <>
              <i className="fa-solid fa-star" aria-hidden="true" /> {rating} / 10
            </>
          ) : (
            <span className="review-no-rating">No rating</span>
          )}
        </div>
        <div className="review-date">{new Date(review.created_at).toLocaleDateString('en-US')}</div>
      </div>
    </article>
  );
}

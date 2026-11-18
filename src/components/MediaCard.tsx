import { Link } from 'react-router-dom';
import { imageUrl } from '../api/tmdb.ts';

interface MediaCardProps {
  to: string;
  title: string;
  subtitle?: string;
  imagePath: string | null;
  imageClassName?: string;
  className?: string;
}

// Poster card used in sliders and in the popular lists
export default function MediaCard({ to, title, subtitle, imagePath, imageClassName = 'slider-card-image', className = '' }: MediaCardProps) {
  const src = imageUrl(imagePath);
  return (
    <div className={`card ${className}`}>
      <Link to={to} aria-label={title}>
        {src ? (
          <img className={imageClassName} src={src} alt={title} loading="lazy" />
        ) : (
          <div className="no-image card-no-image">No image</div>
        )}
      </Link>
      <div className="card-body">
        <h5 className="card-title" title={title}>{title}</h5>
        {subtitle && <p className="card-text">{subtitle}</p>}
      </div>
    </div>
  );
}

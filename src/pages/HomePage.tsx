import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import type { MovieSummary, Paged, ShowSummary } from '../api/types.ts';
import { formatVotes, imageUrl } from '../api/tmdb.ts';
import { useTmdb } from '../hooks/useTmdb.ts';
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts';
import MediaCard from '../components/MediaCard.tsx';
import Slider from '../components/Slider.tsx';

function HeroSlider({ movies }: { movies: MovieSummary[] }) {
  return (
    <Swiper
      className="hero-container"
      modules={[Autoplay, EffectFade, Navigation, Pagination]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      loop={movies.length > 1}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      navigation
      pagination={{ clickable: true }}
      aria-label="Trending movies"
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie.id} className="trending-item">
          <div className="trending-image-container">
            <img className="trending-item-img" src={imageUrl(movie.backdrop_path, 'original') ?? ''} alt="" />
          </div>
          <div className="hero-item-content">
            <h2 className="hero-item-title">{movie.title}</h2>
            <ul className="details-facts">
              <li className="details-date">{movie.release_date}</li>
              <li className="details-vote">
                <i className="fa-solid fa-star" aria-hidden="true" />
                <div className="rating">{movie.vote_average.toFixed(1)} / 10</div>
                <div className="vote-total">({formatVotes(movie.vote_count)})</div>
              </li>
            </ul>
            <p className="hero-item-overview">{movie.overview}</p>
            <div className="learn-more-btn">
              <Link className="btn more-btn" to={`/movie/${movie.id}`}>Learn More</Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

function TopSection({ title, allLink, children }: { title: string; allLink: string; children: React.ReactNode }) {
  return (
    <section className="section-mb">
      <div className="top-header">
        <h2 className="top-title">{title}</h2>
        <Link className="btn-all" to={allLink}>
          view all <i className="fa-solid fa-chevron-right" aria-hidden="true" />
        </Link>
      </div>
      {children}
    </section>
  );
}

export default function HomePage() {
  useDocumentTitle('Home Page');
  const trending = useTmdb<Paged<MovieSummary>>('trending/movie/week');
  const topMovies = useTmdb<Paged<MovieSummary>>('movie/top_rated');
  const topShows = useTmdb<Paged<ShowSummary>>('tv/top_rated');

  const heroMovies = (trending.data?.results ?? []).filter((movie) => movie.backdrop_path).slice(0, 5);

  return (
    <div className="container">
      <section className="hero-showcase section-mb">{heroMovies.length > 0 && <HeroSlider movies={heroMovies} />}</section>

      <TopSection title="Top-rated movies" allLink="/movies">
        {topMovies.data && (
          <Slider
            label="Top-rated movies"
            items={topMovies.data.results}
            getKey={(movie) => movie.id}
            renderItem={(movie) => (
              <MediaCard to={`/movie/${movie.id}`} title={movie.title} subtitle={movie.release_date} imagePath={movie.poster_path} />
            )}
          />
        )}
      </TopSection>

      <TopSection title="Top-rated TV series" allLink="/shows">
        {topShows.data && (
          <Slider
            label="Top-rated TV series"
            items={topShows.data.results}
            getKey={(show) => show.id}
            renderItem={(show) => (
              <MediaCard to={`/show/${show.id}`} title={show.name} subtitle={show.first_air_date} imagePath={show.poster_path} />
            )}
          />
        )}
      </TopSection>
    </div>
  );
}

// Subset of The Movie DB (v3) response shapes used by the app

export interface Paged<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieSummary {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  overview: string;
  vote_average: number;
  vote_count: number;
}

export interface ShowSummary {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  overview: string;
  vote_average: number;
  vote_count: number;
}

export interface PersonSummary {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string;
}

export interface MovieDetails extends MovieSummary {
  runtime: number | null;
  tagline: string;
  genres: Genre[];
}

export interface ShowDetails extends ShowSummary {
  episode_run_time: number[];
  tagline: string;
  genres: Genre[];
}

export interface PersonDetails extends PersonSummary {
  biography: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  known_for_department: string;
}

export interface Credits {
  cast: CastMember[];
}

export interface Review {
  id: string;
  content: string;
  created_at: string;
  author_details: {
    username: string;
    avatar_path: string | null;
    rating: number | null;
  };
}

export interface PersonImages {
  profiles: { file_path: string }[];
}

export interface PersonCredit {
  id: number;
  credit_id: string;
  media_type: 'movie' | 'tv';
  title?: string;
  name?: string;
  poster_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  character?: string;
}

export interface PersonCombinedCredits {
  cast: PersonCredit[];
}

export type SearchResult =
  | (MovieSummary & { media_type: 'movie' })
  | (ShowSummary & { media_type: 'tv' })
  | (PersonSummary & { media_type: 'person'; known_for: { title?: string; name?: string }[] });

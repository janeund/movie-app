import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import StatusMessage from './components/StatusMessage.tsx';
import HomePage from './pages/HomePage.tsx';
import PopularPage from './pages/PopularPage.tsx';
import MovieDetailsPage from './pages/MovieDetailsPage.tsx';
import ShowDetailsPage from './pages/ShowDetailsPage.tsx';
import PersonDetailsPage from './pages/PersonDetailsPage.tsx';
import SearchPage from './pages/SearchPage.tsx';

// Old multi-page links like /pages/movie-details.html?id=123 open the new route
function LegacyRedirect({ to }: { to: 'movie' | 'show' | 'person' }) {
  const [params] = useSearchParams();
  const id = params.get('id');
  return <Navigate to={id ? `/${to}/${id}` : '/'} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="movies" element={<PopularPage key="movies" kind="movies" />} />
        <Route path="shows" element={<PopularPage key="shows" kind="shows" />} />
        <Route path="people" element={<PopularPage key="people" kind="people" />} />
        <Route path="movie/:id" element={<MovieDetailsPage />} />
        <Route path="show/:id" element={<ShowDetailsPage />} />
        <Route path="person/:id" element={<PersonDetailsPage />} />
        <Route path="search" element={<SearchPage />} />

        <Route path="index.html" element={<Navigate to="/" replace />} />
        <Route path="pages/movies.html" element={<Navigate to="/movies" replace />} />
        <Route path="pages/shows.html" element={<Navigate to="/shows" replace />} />
        <Route path="pages/people.html" element={<Navigate to="/people" replace />} />
        <Route path="pages/movie-details.html" element={<LegacyRedirect to="movie" />} />
        <Route path="pages/show-details.html" element={<LegacyRedirect to="show" />} />
        <Route path="pages/person-details.html" element={<LegacyRedirect to="person" />} />
        <Route path="pages/search.html" element={<SearchPage />} />

        <Route path="*" element={<StatusMessage title="Page not found" text="The page you are looking for doesn't exist." />} />
      </Route>
    </Routes>
  );
}

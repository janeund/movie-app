import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header.tsx';
import { useIsLoading } from '../hooks/useTmdb.ts';

export default function Layout() {
  const loading = useIsLoading();
  const { pathname, search } = useLocation();

  // New page starts at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return (
    <>
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="container">
          <p className="footer-text">
            @ Website is build with help of data from The Movie DB. Made by Evgeniia Zhavoronkova, 2024.
          </p>
        </div>
      </footer>
      <div className={`loader-overlay ${loading ? 'show' : ''}`} aria-hidden={!loading}>
        <div className="loader" role="status" aria-label="Loading" />
      </div>
    </>
  );
}

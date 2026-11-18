import { FormEvent, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/movies', label: 'Movies' },
  { to: '/shows', label: 'TV Series' },
  { to: '/people', label: 'People' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [term, setTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close the menu after navigating
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search]);

  // Close on Esc or a tap outside the header
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        burgerRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('click', onClick);
    };
  }, [menuOpen]);

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const query = term.trim();
    if (!query) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setTerm('');
  }

  return (
    <header className="header">
      <div ref={containerRef} className={`container header-container ${menuOpen ? 'menu-open' : ''}`}>
        <div className="logo">
          <Link to="/">MSB</Link>
        </div>
        <button
          ref={burgerRef}
          className="burger"
          type="button"
          aria-controls="main-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className="navigation" id="main-navigation">
          <ul className="navigation-list">
            {NAV_LINKS.map((link) => (
              <li key={link.to} className="navigation-item">
                <NavLink className="navigation-link" to={link.to} end={link.to === '/'}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="search">
          <form className="search-form" role="search" onSubmit={onSearch}>
            <div className="search-field">
              <input
                className="search-input"
                autoComplete="off"
                type="search"
                aria-label="Search movies, TV series and people"
                placeholder="Search for anything"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
              />
              <button className="search-btn" type="submit" aria-label="Search">
                <i className="fas fa-search" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}

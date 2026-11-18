import { Link } from 'react-router-dom';

// Shown when a request fails or a page is not found
export default function StatusMessage({ title, text }: { title: string; text?: string }) {
  return (
    <div className="container status-message">
      <h1 className="title-page">{title}</h1>
      {text && <p>{text}</p>}
      <Link className="btn" to="/">Go to Home Page</Link>
    </div>
  );
}

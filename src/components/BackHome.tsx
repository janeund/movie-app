import { Link } from 'react-router-dom';

export default function BackHome() {
  return (
    <div className="back-home">
      <Link className="btn btn-back" to="/">
        <i className="fa-solid fa-chevron-left" aria-hidden="true" />
        Back To Home Page
      </Link>
    </div>
  );
}

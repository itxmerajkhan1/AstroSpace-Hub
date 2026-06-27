import { Link } from 'react-router-dom';

/**
 * Navbar placeholder.
 */
export const Navbar = () => {
  return (
    <nav className="p-4 border-b">
      <Link to="/" className="font-bold">AstroSpace Hub</Link>
    </nav>
  );
};

import { useNavigate, Link } from 'react-router-dom';
import { SessionService } from '../../../Auth';
import { useState } from 'react';

export const Navbar = () => {
  const navigate = useNavigate();
  const session = SessionService.getSession();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(''); // Clear the navbar input after redirecting
    }
  };

  const handleLogout = () => {
    SessionService.clearSession();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-gray-900 border-b border-gray-800 z-50 flex items-center justify-between px-6">
      {/* Logo Area */}
      <Link to="/" className="text-2xl font-bold text-red-500 tracking-wider">
        CINEVIEW
      </Link>

      {/* Middle: Global Search Placeholder (Milestone 3) */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <form onSubmit={handleSearchSubmit} className="w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movies, TV shows..."
            className="w-full bg-gray-800 rounded-full h-9 px-4 text-sm text-white border border-gray-700 focus:outline-none focus:border-blue-500"
          />
        </form>
      </div>

      {/* Right Side: Actions & Profile */}
      <div className="flex items-center gap-4">
        {/* Language/Theme Placeholders (Milestone 4) */}
        <div className="hidden sm:block text-sm text-gray-400">EN</div>
        
        <div className="flex items-center gap-3 border-l border-gray-700 pl-4">
          <span className="text-sm text-gray-300 hidden sm:block">
            {session?.username || 'User'}
          </span>
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            {session?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <button 
            onClick={handleLogout}
            className="text-sm text-gray-400 hover:text-white transition-colors ml-2"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
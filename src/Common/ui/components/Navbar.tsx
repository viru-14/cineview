import { useNavigate, Link } from 'react-router-dom';
import { SessionService } from '../../../Auth';

export const Navbar = () => {
  const navigate = useNavigate();
  const session = SessionService.getSession();

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
        <div className="w-full bg-gray-800 rounded-full h-9 flex items-center px-4 text-sm text-gray-500 border border-gray-700">
          Search movies, TV shows... (Coming Soon)
        </div>
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
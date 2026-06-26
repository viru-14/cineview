import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // <-- Import translation hook
import { observer } from 'mobx-react-lite'; // <-- Import observer
import { SessionService } from '../../../Auth';
import { preferencesStore } from '../../../Preferences';

// Wrap in observer so the language indicator updates reactively
export const Navbar = observer(() => {
  const navigate = useNavigate();
  const { t } = useTranslation('navbar'); // Use the 'navbar' namespace
  const session = SessionService.getSession();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    SessionService.clearSession();
    navigate('/login');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-50 flex items-center justify-between px-6 transition-colors">
      <Link to="/" className="text-2xl font-bold text-red-600 dark:text-red-500 tracking-wider">
        CINEVIEW
      </Link>

      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <form onSubmit={handleSearchSubmit} className="w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')} // <-- Translated text!
            className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-9 px-4 text-sm text-black dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </form>
      </div>

      <div className="flex items-center gap-4">
        {/* Dynamic Language Indicator */}
        <div className="hidden sm:block text-sm font-bold text-gray-500 dark:text-gray-400 uppercase">
          {preferencesStore.language}
        </div>
        
        <div className="flex items-center gap-3 border-l border-gray-300 dark:border-gray-700 pl-4 transition-colors">
          <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:block">
            {session?.username || t('user')}
          </span>
          
          {/* Link to Settings Page */}
          <Link to="/settings" className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold hover:ring-2 hover:ring-blue-400 transition-all">
            {session?.username?.charAt(0).toUpperCase() || 'U'}
          </Link>
          
          <button 
            onClick={handleLogout}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors ml-2"
          >
            {t('logout')} {/* <-- Translated text! */}
          </button>
        </div>
      </div>
    </nav>
  );
});
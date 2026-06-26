import { useTranslation } from 'react-i18next';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: (theme: 'light' | 'dark') => void;
}

export const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => {
  const { t } = useTranslation('settings');

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('theme')}</label>
      <div className="flex bg-gray-200 dark:bg-gray-800 rounded-lg p-1 border border-gray-300 dark:border-gray-700 w-full max-w-xs transition-colors">
        <button
          onClick={() => onToggle('light')}
          className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
            theme === 'light' ? 'bg-white shadow text-black' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
          }`}
        >
          {t('light')}
        </button>
        <button
          onClick={() => onToggle('dark')}
          className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
            theme === 'dark' ? 'bg-gray-600 shadow text-white' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
          }`}
        >
          {t('dark')}
        </button>
      </div>
    </div>
  );
};
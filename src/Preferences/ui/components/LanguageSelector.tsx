import { useTranslation } from 'react-i18next';

interface LanguageSelectorProps {
  currentLanguage: string;
  onSelect: (lang: 'en' | 'es') => void;
}

export const LanguageSelector = ({ currentLanguage, onSelect }: LanguageSelectorProps) => {
  const { t } = useTranslation('settings');

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('language')}</label>
      <select
        value={currentLanguage}
        onChange={(e) => onSelect(e.target.value as 'en' | 'es')}
        className="bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      >
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
  );
};
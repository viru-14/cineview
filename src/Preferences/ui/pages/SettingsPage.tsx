import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { preferencesStore } from '../../data/stores/PreferencesStore';
import { LanguageSelector } from '../components/LanguageSelector';
import { ThemeToggle } from '../components/ThemeToggle';

// observer() ensures this page re-renders if the store data changes
export const SettingsPage = observer(() => {
  const { t } = useTranslation('settings');

  return (
    <div className="max-w-3xl mx-auto p-6 pb-20">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white transition-colors">
        {t('title')}
      </h1>

      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm flex flex-col gap-8 transition-colors">
        {/* Language Control */}
        <LanguageSelector 
          currentLanguage={preferencesStore.language} 
          onSelect={preferencesStore.setLanguage} 
        />

        {/* Theme Control */}
        <ThemeToggle 
          theme={preferencesStore.theme} 
          onToggle={preferencesStore.setTheme} 
        />

        {/* Region Control (Simplified for brevity) */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{t('region')}</label>
          <select
            value={preferencesStore.region}
            onChange={(e) => preferencesStore.setRegion(e.target.value)}
            className="bg-white dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-xs transition-colors"
          >
            <option value="US">United States (US)</option>
            <option value="GB">United Kingdom (GB)</option>
            <option value="IN">India (IN)</option>
            <option value="ES">Spain (ES)</option>
          </select>
        </div>
      </div>
    </div>
  );
});
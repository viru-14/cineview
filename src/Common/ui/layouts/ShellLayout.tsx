import { Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite'; // <-- Import observer
import { Navbar } from '../components/Navbar';
import { preferencesStore } from '../../../Preferences'; // <-- Import the store

// Wrap the component in observer()
export const ShellLayout = observer(() => {
  // Read from the store. If this changes, ShellLayout will re-render!
  const isDark = preferencesStore.isDarkMode;

  return (
    // Dynamically apply Tailwind classes based on the theme
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <Navbar />
      <main className="flex-1 overflow-y-auto pt-16">
        <Outlet />
      </main>
    </div>
  );
});
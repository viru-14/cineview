import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

export const ShellLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      {/* pt-16 pushes the content down so it isn't hidden behind the fixed Navbar */}
      <main className="flex-1 overflow-y-auto pt-16">
        <Outlet />
      </main>
    </div>
  );
};
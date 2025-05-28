import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { MagnifyingGlassIcon, BellIcon } from '@heroicons/react/24/outline';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center font-bold text-blue-800">
              <span className="text-xl">Empower Change</span>
            </Link>
            
            <nav className="ml-10 hidden space-x-8 md:flex">
              <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-800">
                Dashboard
              </Link>
              <Link to="/projects" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-800">
                Projects
              </Link>
              <Link to="/reports" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-800">
                Reports
              </Link>
              <Link to="/team" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-800">
                Team
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                className="block w-full rounded-md border-0 bg-gray-50 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                placeholder="Search"
                type="search"
              />
            </div>
            
            <button type="button" className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500">
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            
            <div className="relative ml-3">
              <div>
                <button type="button" className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User profile"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout; 
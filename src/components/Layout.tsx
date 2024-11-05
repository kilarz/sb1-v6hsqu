import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { BookOpen, LogOut } from 'lucide-react';
import { useQuizStore } from '../store/quizStore';

export function Layout() {
  const { currentUser, setUser } = useQuizStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                AI Quiz Platform
              </span>
            </div>
            {currentUser && (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">
                  Welcome, {currentUser.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-600 hover:text-gray-800"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 px-4">
        <Outlet />
      </main>
    </div>
  );
}
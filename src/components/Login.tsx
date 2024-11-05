import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { useQuizStore } from '../store/quizStore';

export function Login() {
  const navigate = useNavigate();
  const { setUser } = useQuizStore();
  const [role, setRole] = useState<'faculty' | 'student'>('student');

  const handleLogin = () => {
    const user = {
      id: Date.now().toString(),
      name: 'John Doe',
      role,
    };
    setUser(user);
    navigate(role === 'faculty' ? '/faculty' : '/student');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <BookOpen className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          AI Quiz Platform
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'faculty' | 'student')}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
              </select>
            </div>

            <button
              onClick={handleLogin}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
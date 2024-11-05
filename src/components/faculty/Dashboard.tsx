import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, BarChart } from 'lucide-react';

export function FacultyDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Faculty Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/faculty/create-quiz"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <FileText className="h-8 w-8 text-indigo-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Create Quiz</h2>
          <p className="text-gray-600">Upload a PDF and generate AI-powered quiz questions</p>
        </Link>

        <Link
          to="/faculty/results"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <BarChart className="h-8 w-8 text-indigo-600 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">View Results</h2>
          <p className="text-gray-600">Check student performance and quiz statistics</p>
        </Link>
      </div>
    </div>
  );
}
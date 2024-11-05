import React from 'react';
import { useQuizStore } from '../../store/quizStore';

export function ViewResults() {
  const { results, quizzes } = useQuizStore();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Class Results</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quiz
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submission Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.map((result) => {
              const quiz = quizzes.find((q) => q.id === result.quizId);
              return (
                <tr key={`${result.studentId}-${result.quizId}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {result.studentName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {quiz?.title || 'Unknown Quiz'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {result.score}/{result.totalQuestions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {result.submittedAt.toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
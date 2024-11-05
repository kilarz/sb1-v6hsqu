import React from 'react';
import { Link } from 'react-router-dom';
import { useQuizStore } from '../../store/quizStore';

export function StudentDashboard() {
  const { quizzes, results, currentUser } = useQuizStore();

  const availableQuizzes = quizzes.filter(quiz => 
    !results.some(result => 
      result.quizId === quiz.id && result.studentId === currentUser?.id
    )
  );

  const completedQuizzes = quizzes.filter(quiz =>
    results.some(result => 
      result.quizId === quiz.id && result.studentId === currentUser?.id
    )
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Quizzes</h2>
          {availableQuizzes.length === 0 ? (
            <p className="text-gray-600">No new quizzes available</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableQuizzes.map(quiz => (
                <Link
                  key={quiz.id}
                  to={`/student/quiz/${quiz.id}`}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-medium text-gray-800 mb-2">{quiz.title}</h3>
                  <p className="text-gray-600">{quiz.questions.length} questions</p>
                </Link>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Completed Quizzes</h2>
          {completedQuizzes.length === 0 ? (
            <p className="text-gray-600">No completed quizzes yet</p>
          ) : (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quiz</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {completedQuizzes.map(quiz => {
                    const result = results.find(r => 
                      r.quizId === quiz.id && r.studentId === currentUser?.id
                    );
                    return (
                      <tr key={quiz.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-800">{quiz.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                          {result ? `${result.score}/${result.totalQuestions}` : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                          {result ? new Date(result.submittedAt).toLocaleDateString() : '-'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
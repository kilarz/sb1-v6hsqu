import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuizStore } from '../../store/quizStore';

export function TakeQuiz() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { getQuizById, addResult, currentUser } = useQuizStore();
  const quiz = getQuizById(quizId!);
  
  const [answers, setAnswers] = useState<number[]>(
    new Array(quiz?.questions.length || 0).fill(-1)
  );

  if (!quiz) {
    return <div>Quiz not found</div>;
  }

  const handleSubmit = () => {
    const score = answers.reduce((acc, answer, index) => {
      return answer === quiz.questions[index].correctAnswer ? acc + 1 : acc;
    }, 0);

    addResult({
      studentId: currentUser!.id,
      studentName: currentUser!.name,
      quizId: quiz.id,
      score,
      totalQuestions: quiz.questions.length,
      submittedAt: new Date(),
    });

    navigate('/student');
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{quiz.title}</h2>
      
      <div className="space-y-6">
        {quiz.questions.map((question, qIndex) => (
          <div key={qIndex} className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium mb-3">{question.question}</p>
            <div className="space-y-2">
              {question.options.map((option, oIndex) => (
                <label key={oIndex} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    checked={answers[qIndex] === oIndex}
                    onChange={() => {
                      const newAnswers = [...answers];
                      newAnswers[qIndex] = oIndex;
                      setAnswers(newAnswers);
                    }}
                    className="form-radio text-indigo-600"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={answers.includes(-1)}
        className="mt-6 w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
      >
        Submit Quiz
      </button>
    </div>
  );
}
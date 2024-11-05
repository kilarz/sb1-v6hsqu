import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Groq } from '@groq/groq-sdk';
import { FileText, Loader } from 'lucide-react';
import { useQuizStore } from '../../store/quizStore';
import { Question } from '../../types';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
});

export function CreateQuiz() {
  const [pdfText, setPdfText] = useState('');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const { addQuiz } = useQuizStore();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
    },
    onDrop: async (files) => {
      const file = files[0];
      // PDF text extraction logic would go here
      // Using pdfjs-dist to extract text
      setPdfText('Extracted text from PDF');
      await generateQuestions();
    },
  });

  const generateQuestions = async () => {
    setLoading(true);
    try {
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'Generate 5 multiple choice questions based on the following text.',
          },
          {
            role: 'user',
            content: pdfText,
          },
        ],
        model: 'mixtral-8x7b-32768',
      });

      // Parse the response and format questions
      const generatedQuestions: Question[] = []; // Parse AI response
      setQuestions(generatedQuestions);
    } catch (error) {
      console.error('Error generating questions:', error);
    }
    setLoading(false);
  };

  const handleExportQuiz = () => {
    const quiz = {
      id: Date.now().toString(),
      title: 'New Quiz',
      questions,
      createdAt: new Date(),
    };
    addQuiz(quiz);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New Quiz</h2>
        
        <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500 transition-colors">
          <input {...getInputProps()} />
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-gray-600">Drop your PDF here or click to select</p>
        </div>

        {loading && (
          <div className="flex items-center justify-center mt-4">
            <Loader className="animate-spin h-6 w-6 text-indigo-600 mr-2" />
            <span>Analyzing PDF and generating questions...</span>
          </div>
        )}

        {questions.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Generated Questions</h3>
            <div className="space-y-4">
              {questions.map((q, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium">{q.question}</p>
                  <div className="ml-4 mt-2 space-y-2">
                    {q.options.map((option, optIdx) => (
                      <div key={optIdx} className="flex items-center">
                        <input
                          type="radio"
                          name={`question-${idx}`}
                          checked={optIdx === q.correctAnswer}
                          readOnly
                          className="mr-2"
                        />
                        <span>{option}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <button
              onClick={handleExportQuiz}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              Export Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
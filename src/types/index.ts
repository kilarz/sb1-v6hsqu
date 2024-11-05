export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  createdAt: Date;
}

export interface StudentResult {
  studentId: string;
  studentName: string;
  quizId: string;
  score: number;
  totalQuestions: number;
  submittedAt: Date;
}

export interface User {
  id: string;
  name: string;
  role: 'faculty' | 'student';
}
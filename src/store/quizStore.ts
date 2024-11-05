import { create } from 'zustand';
import { Question, Quiz, StudentResult, User } from '../types';

interface QuizStore {
  currentUser: User | null;
  quizzes: Quiz[];
  results: StudentResult[];
  setUser: (user: User | null) => void;
  addQuiz: (quiz: Quiz) => void;
  addResult: (result: StudentResult) => void;
  getQuizById: (id: string) => Quiz | undefined;
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  currentUser: null,
  quizzes: [],
  results: [],
  setUser: (user) => set({ currentUser: user }),
  addQuiz: (quiz) => set((state) => ({ quizzes: [...state.quizzes, quiz] })),
  addResult: (result) => set((state) => ({ results: [...state.results, result] })),
  getQuizById: (id) => get().quizzes.find((quiz) => quiz.id === id),
}));
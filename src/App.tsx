import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { FacultyDashboard } from './components/faculty/Dashboard';
import { StudentDashboard } from './components/student/Dashboard';
import { CreateQuiz } from './components/faculty/CreateQuiz';
import { TakeQuiz } from './components/student/TakeQuiz';
import { ViewResults } from './components/faculty/ViewResults';
import { useQuizStore } from './store/quizStore';

function App() {
  const { currentUser } = useQuizStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          {/* Faculty Routes */}
          <Route
            path="faculty"
            element={
              currentUser?.role === 'faculty' ? (
                <FacultyDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="faculty/create-quiz" element={<CreateQuiz />} />
          <Route path="faculty/results" element={<ViewResults />} />

          {/* Student Routes */}
          <Route
            path="student"
            element={
              currentUser?.role === 'student' ? (
                <StudentDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="student/quiz/:quizId" element={<TakeQuiz />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
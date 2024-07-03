import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import PrivateRoute from './components/Auth/PrivateRoute';
import CreateQuiz from './components/QuizForm/CreateQuiz';
import QuizList from './components/QuizList/QuizList';
import Quiz from './components/Quiz/Quiz';
import UserProfile from './components/Profile/UserProfile';
import AdminDashboard from './components/Admin/AdminDashboard';
import Home from './components/Home/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/quiz-list" element={<QuizList />} />
        <Route path="/quiz/:quizId" element={<Quiz />} />

        {/* Private Routes */}
        <Route
          path="/create-quiz"
          element={
            <PrivateRoute>
              <CreateQuiz />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />

        {/* Default Route (if no matches) */}
        <Route path="*" element={<h2>404 Not Found</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
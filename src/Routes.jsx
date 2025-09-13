import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AptitudeQuizInterface from './pages/aptitude-quiz-interface';
import AiCareerChatbot from './pages/ai-career-chatbot';
import StreamRecommendations from './pages/stream-recommendations';
import StudentDashboard from './pages/student-dashboard';
import CourseProgramExplorer from './pages/course-program-explorer';
import CareerPathwayExplorer from './pages/career-pathway-explorer';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';


// Simple authentication check (for demo: checks localStorage for 'auth')
function RequireAuth({ children }) {
  const isAuthenticated = !!localStorage.getItem('auth');
  if (!isAuthenticated) {
    window.location.href = '/login';
    return null;
  }
  return children;
}

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Protected routes */}
          <Route path="/" element={<RequireAuth><StudentDashboard /></RequireAuth>} />
          <Route path="/student-dashboard" element={<RequireAuth><StudentDashboard /></RequireAuth>} />
          <Route path="/aptitude-quiz-interface" element={<RequireAuth><AptitudeQuizInterface /></RequireAuth>} />
          <Route path="/ai-career-chatbot" element={<RequireAuth><AiCareerChatbot /></RequireAuth>} />
          <Route path="/stream-recommendations" element={<RequireAuth><StreamRecommendations /></RequireAuth>} />
          <Route path="/course-program-explorer" element={<RequireAuth><CourseProgramExplorer /></RequireAuth>} />
          <Route path="/career-pathway-explorer" element={<RequireAuth><CareerPathwayExplorer /></RequireAuth>} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

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

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AiCareerChatbot />} />
        <Route path="/aptitude-quiz-interface" element={<AptitudeQuizInterface />} />
        <Route path="/ai-career-chatbot" element={<AiCareerChatbot />} />
        <Route path="/stream-recommendations" element={<StreamRecommendations />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/course-program-explorer" element={<CourseProgramExplorer />} />
        <Route path="/career-pathway-explorer" element={<CareerPathwayExplorer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

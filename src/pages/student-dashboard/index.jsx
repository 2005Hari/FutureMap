import React, { useState, useEffect } from 'react';
import { auth, db, doc, getDoc } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import QuickActionPanel from '../../components/ui/QuickActionPanel';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import RecommendationStatusIndicator from '../../components/ui/RecommendationStatusIndicator';
import Breadcrumb from '../../components/ui/Breadcrumb';
import WelcomeHeader from './components/WelcomeHeader';
import RecommendationCards from './components/RecommendationCards';
import ProgressTracker from './components/ProgressTracker';
import ActivityFeed from './components/ActivityFeed';
import MotivationalTips from './components/MotivationalTips';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState({
    name: localStorage.getItem('userName') || "Alex Johnson",
    currentXP: 1250,
    level: 5,
    hasCompletedQuiz: true,
    hasRecommendations: true,
    completionPercentage: 75,
    currentStreak: 5,
    avatarUrl: localStorage.getItem('userPhoto') || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  });

  const [dashboardStats, setDashboardStats] = useState({
    totalAssessments: 3,
    completedAssessments: 2,
    recommendationsCount: 4,
    exploredCareers: 12,
    aiChatSessions: 8
  });

  // Mock user progress data
  const userProgress = {
    hasCompletedQuiz: studentData?.hasCompletedQuiz,
    hasRecommendations: studentData?.hasRecommendations,
    completionPercentage: studentData?.completionPercentage,
    totalXP: studentData?.currentXP
  };

  // Quick stats data
  const quickStats = [
    {
      label: 'Assessments',
      value: `${dashboardStats?.completedAssessments}/${dashboardStats?.totalAssessments}`,
      icon: 'Brain',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Recommendations',
      value: dashboardStats?.recommendationsCount,
      icon: 'Target',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Careers Explored',
      value: dashboardStats?.exploredCareers,
      icon: 'Map',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'AI Sessions',
      value: dashboardStats?.aiChatSessions,
      icon: 'MessageCircle',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const handleQuickNavigation = (path) => {
    navigate(path);
  };

  useEffect(() => {
    // Fetch user data from Firestore if logged in
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setStudentData(prev => ({
            ...prev,
            name: data.name || prev.name,
            avatarUrl: data.photo || prev.avatarUrl,
          }));
        }
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6" />

          {/* Welcome Header */}
          <WelcomeHeader
            studentName={studentData?.name}
            currentXP={studentData?.currentXP}
            level={studentData?.level}
            avatarUrl={studentData?.avatarUrl}
            nextMilestone={1500}
            className="mb-8"
          />

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {quickStats?.map((stat, index) => (
              <div
                key={index}
                className="bg-card rounded-lg border border-border p-4 text-center hover-scale cursor-pointer"
                onClick={() => {
                  if (stat?.label === 'Assessments') navigate('/aptitude-quiz-interface');
                  else if (stat?.label === 'Recommendations') navigate('/stream-recommendations');
                  else if (stat?.label === 'Careers Explored') navigate('/career-pathway-explorer');
                  else if (stat?.label === 'AI Sessions') navigate('/ai-career-chatbot');
                }}
              >
                <div className={`w-12 h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center mx-auto mb-3`}>
                  <Icon name={stat?.icon} size={20} color={stat?.color?.replace('text-', '')} />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat?.value}</div>
                <div className="text-sm text-muted-foreground">{stat?.label}</div>
              </div>
            ))}
          </div>

          {/* Recommendation Status */}
          <RecommendationStatusIndicator
            status={studentData?.hasRecommendations ? 'ready' : 'pending'}
            confidence={92}
            lastUpdated={new Date('2025-01-11T14:35:00')}
            recommendationCount={dashboardStats?.recommendationsCount}
            variant="detailed"
            className="mb-8"
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Stream Recommendations */}
              <RecommendationCards
                hasCompletedQuiz={studentData?.hasCompletedQuiz}
                className="mb-8"
              />

              {/* Quick Actions Panel */}
              <QuickActionPanel
                userProgress={userProgress}
                layout="grid"
                className="mb-8"
              />

              {/* Overall Progress */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Overall Progress</h2>
                <ProgressIndicator
                  currentStep={2}
                  totalSteps={3}
                  percentage={studentData?.completionPercentage}
                  xpPoints={250}
                  showXP={true}
                  className="mb-4"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-success mb-1">✓</div>
                    <div className="text-sm font-medium text-foreground">Aptitude Quiz</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                  <div className="text-center p-4 bg-primary/10 rounded-lg border-2 border-primary/20">
                    <div className="text-2xl font-bold text-primary mb-1">⏳</div>
                    <div className="text-sm font-medium text-foreground">Interest Survey</div>
                    <div className="text-xs text-muted-foreground">In Progress</div>
                  </div>
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-2xl font-bold text-muted-foreground mb-1">○</div>
                    <div className="text-sm font-medium text-muted-foreground">Skills Assessment</div>
                    <div className="text-xs text-muted-foreground">Pending</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Progress Tracker */}
              <ProgressTracker
                completedAssessments={dashboardStats?.completedAssessments}
                totalAssessments={dashboardStats?.totalAssessments}
                currentStreak={studentData?.currentStreak}
              />

              {/* Motivational Tips */}
              <MotivationalTips
                studentProfile={studentData}
              />

              {/* Activity Feed */}
              <ActivityFeed />

              {/* Quick Navigation */}
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-foreground mb-4">Quick Navigation</h3>
                <div className="space-y-3">
                  <Button
                    variant="ghost"
                    fullWidth
                    iconName="BookOpen"
                    iconPosition="left"
                    onClick={() => handleQuickNavigation('/course-program-explorer')}
                    className="justify-start"
                  >
                    Explore Courses
                  </Button>
                  <Button
                    variant="ghost"
                    fullWidth
                    iconName="Users"
                    iconPosition="left"
                    onClick={() => handleQuickNavigation('/career-pathway-explorer')}
                    className="justify-start"
                  >
                    Career Pathways
                  </Button>
                  <Button
                    variant="ghost"
                    fullWidth
                    iconName="MessageCircle"
                    iconPosition="left"
                    onClick={() => handleQuickNavigation('/ai-career-chatbot')}
                    className="justify-start"
                  >
                    AI Counselor
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action Section */}
          {!studentData?.hasCompletedQuiz && (
            <div className="mt-12 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-xl p-8 text-center border border-primary/20">
              <div className="max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Rocket" size={32} color="var(--color-primary)" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Ready to Launch Your Career Journey?
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Take our comprehensive aptitude assessment to discover your strengths, interests, and get personalized recommendations for your ideal career path.
                </p>
                <Button
                  variant="default"
                  size="lg"
                  iconName="ArrowRight"
                  iconPosition="right"
                  onClick={() => navigate('/aptitude-quiz-interface')}
                >
                  Start Your Assessment
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
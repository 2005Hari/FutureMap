import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import QuizHeader from './components/QuizHeader';
import QuestionDisplay from './components/QuestionDisplay';
import QuizSidebar from './components/QuizSidebar';
import QuizCompletionModal from './components/QuizCompletionModal';
import QuizPauseModal from './components/QuizPauseModal';
import Icon from '../../components/AppIcon';


const AptitudeQuizInterface = () => {
  const navigate = useNavigate();
  
  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [skippedQuestions, setSkippedQuestions] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes
  const [xpPoints, setXpPoints] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [quizStartTime] = useState(Date.now());

  // Mock quiz data
  const quizQuestions = [
    {
      id: 1,
      number: 1,
      total: 25,
      type: 'mcq',
      difficulty: 'easy',
      text: `Which of the following best describes your approach to solving complex problems?`,
      description: `Think about how you naturally tackle challenging situations in your studies or daily life.`,
      options: [
        { id: 'a', label: 'A', text: `Break it down into smaller, manageable parts and solve step by step` },
        { id: 'b', label: 'B', text: `Look for patterns or similar problems I've solved before` },
        { id: 'c', label: 'C', text: `Brainstorm multiple creative solutions before choosing the best one` },
        { id: 'd', label: 'D', text: `Research thoroughly and gather all available information first` }
      ],
      correctAnswer: 'a'
    },
    {
      id: 2,
      number: 2,
      total: 25,
      type: 'situational',
      difficulty: 'medium',text: `How would you handle this team project scenario?`,scenario: `You're working on a group project with 4 other students. The deadline is in 3 days, but two team members haven't contributed anything yet, and one person is trying to take control of everything. The project is worth 30% of your final grade.`,
      options: [
        { id: 'a', text: `Take charge and divide the remaining work among active members` },
        { id: 'b', text: `Have a team meeting to address issues and redistribute tasks fairly` },
        { id: 'c', text: `Focus on my own part and let others figure out their responsibilities` },
        { id: 'd', text: `Inform the teacher about the team dynamics and ask for guidance` }
      ]
    },
    {
      id: 3,
      number: 3,
      total: 25,
      type: 'puzzle',
      difficulty: 'medium',
      text: `If the pattern continues, what comes next in this sequence?`,
      description: `Look at the relationship between the numbers carefully.`,
      puzzleImage: `https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop`,
      options: [
        { id: 'a', value: '89', label: 'Option A' },
        { id: 'b', value: '144', label: 'Option B' },
        { id: 'c', value: '233', label: 'Option C' },
        { id: 'd', value: '377', label: 'Option D' }
      ],
      correctAnswer: 'c'
    },
    {
      id: 4,
      number: 4,
      total: 25,
      type: 'mcq',
      difficulty: 'easy',
      text: `Which subject or activity do you find most engaging?`,
      options: [
        { id: 'a', label: 'A', text: `Mathematics and logical reasoning` },
        { id: 'b', label: 'B', text: `Literature and creative writing` },
        { id: 'c', label: 'C', text: `Science experiments and research` },
        { id: 'd', label: 'D', text: `Art, music, or design projects` }
      ]
    },
    {
      id: 5,
      number: 5,
      total: 25,
      type: 'situational',
      difficulty: 'hard',text: `What's your approach to this career dilemma?`,
      scenario: `You've been offered two internship opportunities: One at a prestigious company in a field you're not passionate about, and another at a startup in your dream field but with no guarantee of future employment. Both are unpaid, and you can only choose one.`,
      options: [
        { id: 'a', text: `Choose the prestigious company for the brand name and networking` },
        { id: 'b', text: `Follow your passion and join the startup in your dream field` },
        { id: 'c', text: `Research both options more thoroughly before deciding` },
        { id: 'd', text: `Seek advice from mentors and family members first` }
      ]
    }
  ];

  // Timer effect
  useEffect(() => {
    if (!isPaused && !isCompleted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleQuizComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isPaused, isCompleted, timeRemaining]);

  // Handle answer selection
  const handleAnswerSelect = useCallback((answerId) => {
    const questionId = quizQuestions?.[currentQuestionIndex]?.id;
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerId
    }));

    // Remove from skipped if previously skipped
    setSkippedQuestions(prev => prev?.filter(index => index !== currentQuestionIndex));

    // Award XP for correct answers
    const currentQuestion = quizQuestions?.[currentQuestionIndex];
    if (currentQuestion?.correctAnswer === answerId) {
      const xpGain = currentQuestion?.difficulty === 'hard' ? 15 : 
                     currentQuestion?.difficulty === 'medium' ? 10 : 5;
      setXpPoints(prev => prev + xpGain);
      setStreakCount(prev => prev + 1);
      
      // Add achievement for streaks
      if (streakCount + 1 === 5) {
        setAchievements(prev => [...prev, {
          title: 'On Fire!',
          icon: 'Flame',
          xp: 25
        }]);
        setXpPoints(prev => prev + 25);
      }
    } else {
      setStreakCount(0);
    }
  }, [currentQuestionIndex, streakCount]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    if (currentQuestionIndex < quizQuestions?.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleQuizComplete();
    }
  }, [currentQuestionIndex]);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  const handleSkip = useCallback(() => {
    setSkippedQuestions(prev => [...prev, currentQuestionIndex]);
    handleNext();
  }, [currentQuestionIndex, handleNext]);

  const handleQuestionSelect = useCallback((index) => {
    setCurrentQuestionIndex(index);
  }, []);

  // Quiz control handlers
  const handlePause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleResume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const handleExit = useCallback(() => {
    navigate('/student-dashboard');
  }, [navigate]);

  const handleQuizComplete = useCallback(() => {
    setIsCompleted(true);
  }, []);

  const handleRetake = useCallback(() => {
    // Reset all state
    setCurrentQuestionIndex(0);
    setAnswers({});
    setSkippedQuestions([]);
    setTimeRemaining(3600);
    setXpPoints(0);
    setStreakCount(0);
    setAchievements([]);
    setIsCompleted(false);
    setIsPaused(false);
  }, []);

  // Calculate results
  const calculateResults = useCallback(() => {
    const answeredQuestions = Object.keys(answers)?.length;
    const correctAnswers = Object.entries(answers)?.reduce((count, [questionId, answerId]) => {
      const question = quizQuestions?.find(q => q?.id === parseInt(questionId));
      return question && question?.correctAnswer === answerId ? count + 1 : count;
    }, 0);
    
    const accuracy = answeredQuestions > 0 ? Math.round((correctAnswers / answeredQuestions) * 100) : 0;
    const timeSpent = Math.floor((Date.now() - quizStartTime) / 1000);

    return {
      totalQuestions: quizQuestions?.length,
      answeredQuestions,
      correctAnswers,
      totalXP: xpPoints,
      timeSpent,
      accuracy,
      strengths: [
        'Logical Reasoning',
        'Problem Solving',
        'Analytical Thinking',
        'Creative Approach'
      ],
      recommendations: [
        { name: 'Science Stream', match: 92 },
        { name: 'Engineering', match: 88 },
        { name: 'Mathematics', match: 85 }
      ]
    };
  }, [answers, xpPoints, quizStartTime]);

  // Current question data
  const currentQuestion = {
    ...quizQuestions?.[currentQuestionIndex],
    isLast: currentQuestionIndex === quizQuestions?.length - 1
  };

  const answeredQuestionIndices = quizQuestions?.map((q, index) => answers?.[q?.id] ? index : null)?.filter(index => index !== null);

  const canGoNext = answers?.[currentQuestion?.id] || currentQuestion?.isLast;
  const canGoPrevious = currentQuestionIndex > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <QuizHeader
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={quizQuestions?.length}
        timeRemaining={timeRemaining}
        xpPoints={xpPoints}
        streakCount={streakCount}
        onPause={handlePause}
        onExit={handleExit}
      />
      <div className="flex h-[calc(100vh-8rem)]">
        {/* Main Quiz Area */}
        <div className={`flex-1 overflow-y-auto ${showSidebar ? 'mr-80' : ''}`}>
          <QuestionDisplay
            question={currentQuestion}
            selectedAnswer={answers?.[currentQuestion?.id]}
            onAnswerSelect={handleAnswerSelect}
            onNext={handleNext}
            onPrevious={handlePrevious}
            canGoNext={canGoNext}
            canGoPrevious={canGoPrevious}
            onSkip={handleSkip}
          />
        </div>

        {/* Sidebar */}
        {showSidebar && (
          <QuizSidebar
            questions={quizQuestions}
            currentQuestionIndex={currentQuestionIndex}
            answeredQuestions={answeredQuestionIndices}
            skippedQuestions={skippedQuestions}
            onQuestionSelect={handleQuestionSelect}
            achievements={achievements}
            className="fixed right-0 top-16 bottom-0"
          />
        )}

        {/* Sidebar Toggle */}
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className={`
            fixed top-1/2 -translate-y-1/2 z-40 w-6 h-12 bg-card border border-border
            rounded-l-lg flex items-center justify-center hover:bg-muted transition-all duration-200
            ${showSidebar ? 'right-80' : 'right-0'}
          `}
        >
          <Icon 
            name={showSidebar ? "ChevronRight" : "ChevronLeft"} 
            size={16} 
            color="var(--color-muted-foreground)" 
          />
        </button>
      </div>
      {/* Modals */}
      <QuizPauseModal
        isOpen={isPaused}
        onResume={handleResume}
        onExit={handleExit}
        currentProgress={{
          answered: answeredQuestionIndices?.length,
          total: quizQuestions?.length
        }}
        timeRemaining={timeRemaining}
      />
      <QuizCompletionModal
        isOpen={isCompleted}
        results={calculateResults()}
        onClose={() => setIsCompleted(false)}
        onRetake={handleRetake}
        onViewRecommendations={() => setIsCompleted(false)}
      />
    </div>
  );
};

export default AptitudeQuizInterface;
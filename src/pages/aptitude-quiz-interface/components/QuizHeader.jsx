import React from 'react';
import Icon from '../../../components/AppIcon';
import ProgressIndicator from '../../../components/ui/ProgressIndicator';

const QuizHeader = ({ 
  currentQuestion, 
  totalQuestions, 
  timeRemaining, 
  xpPoints, 
  streakCount,
  onPause,
  onExit 
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getTimeUrgency = () => {
    if (timeRemaining <= 60) return 'urgent';
    if (timeRemaining <= 300) return 'warning';
    return 'normal';
  };

  const urgency = getTimeUrgency();

  return (
    <div className="bg-card border-b border-border sticky top-16 z-50">
      <div className="max-w-4xl mx-auto px-4 py-4">
        {/* Top Row - Progress and Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onExit}
              className="flex items-center space-x-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Icon name="ArrowLeft" size={16} />
              <span>Exit Quiz</span>
            </button>
            
            <div className="h-4 w-px bg-border" />
            
            <div className="flex items-center space-x-2">
              <Icon name="Brain" size={18} color="var(--color-primary)" />
              <span className="text-sm font-medium text-foreground">Aptitude Assessment</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* XP Points */}
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-accent/10 rounded-full">
              <Icon name="Zap" size={16} color="var(--color-accent)" />
              <span className="text-sm font-semibold text-accent">{xpPoints} XP</span>
            </div>

            {/* Streak Counter */}
            {streakCount > 0 && (
              <div className="flex items-center space-x-2 px-3 py-1.5 bg-success/10 rounded-full">
                <Icon name="Flame" size={16} color="var(--color-success)" />
                <span className="text-sm font-semibold text-success">{streakCount} streak</span>
              </div>
            )}

            {/* Timer */}
            <div className={`
              flex items-center space-x-2 px-3 py-1.5 rounded-full font-mono text-sm font-semibold
              ${urgency === 'urgent' ?'bg-error/10 text-error animate-pulse' 
                : urgency === 'warning' ?'bg-warning/10 text-warning' :'bg-primary/10 text-primary'
              }
            `}>
              <Icon 
                name="Clock" 
                size={16} 
                color={
                  urgency === 'urgent' ? 'var(--color-error)' :
                  urgency === 'warning' ? 'var(--color-warning)' :
                  'var(--color-primary)'
                }
              />
              <span>{formatTime(timeRemaining)}</span>
            </div>

            <button
              onClick={onPause}
              className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-muted transition-colors duration-200"
              title="Pause Quiz"
            >
              <Icon name="Pause" size={16} color="var(--color-muted-foreground)" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <ProgressIndicator
          currentStep={currentQuestion}
          totalSteps={totalQuestions}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default QuizHeader;
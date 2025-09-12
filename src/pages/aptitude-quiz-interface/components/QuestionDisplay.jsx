import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const QuestionDisplay = ({ 
  question, 
  selectedAnswer, 
  onAnswerSelect, 
  onNext, 
  onPrevious, 
  canGoNext, 
  canGoPrevious,
  showSkip = true,
  onSkip
}) => {
  const [selectedOption, setSelectedOption] = useState(selectedAnswer);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    setSelectedOption(selectedAnswer);
    setShowFeedback(false);
  }, [question?.id, selectedAnswer]);

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    onAnswerSelect(optionId);
    
    // Show immediate feedback for correct answers
    if (question?.type === 'mcq' && question?.correctAnswer === optionId) {
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 1500);
    }
  };

  const renderMCQOptions = () => (
    <div className="space-y-3">
      {question?.options?.map((option) => {
        const isSelected = selectedOption === option?.id;
        const isCorrect = question?.correctAnswer === option?.id;
        
        return (
          <button
            key={option?.id}
            onClick={() => handleOptionSelect(option?.id)}
            className={`
              w-full p-4 text-left rounded-lg border-2 transition-all duration-200
              hover-scale group relative overflow-hidden
              ${isSelected
                ? 'border-primary bg-primary/5 shadow-sm'
                : 'border-border bg-card hover:border-primary/30 hover:bg-muted/50'
              }
            `}
          >
            <div className="flex items-start space-x-3">
              <div className={`
                flex items-center justify-center w-6 h-6 rounded-full border-2 flex-shrink-0 mt-0.5
                ${isSelected
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-muted-foreground group-hover:border-primary'
                }
              `}>
                {isSelected && <Icon name="Check" size={14} strokeWidth={2.5} />}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`
                    text-xs font-medium px-2 py-0.5 rounded-full
                    ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
                  `}>
                    {option?.label}
                  </span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {option?.text}
                </p>
              </div>
            </div>
            {/* Selection indicator */}
            {isSelected && (
              <div className="absolute right-3 top-3">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );

  const renderSituationalQuestion = () => (
    <div className="space-y-4">
      {question?.scenario && (
        <div className="p-4 bg-muted/30 rounded-lg border border-muted">
          <div className="flex items-start space-x-3">
            <Icon name="Users" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-2">Scenario</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {question?.scenario}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        {question?.options?.map((option) => {
          const isSelected = selectedOption === option?.id;
          
          return (
            <button
              key={option?.id}
              onClick={() => handleOptionSelect(option?.id)}
              className={`
                w-full p-4 text-left rounded-lg border-2 transition-all duration-200
                hover-scale group
                ${isSelected
                  ? 'border-secondary bg-secondary/5 shadow-sm'
                  : 'border-border bg-card hover:border-secondary/30 hover:bg-muted/50'
                }
              `}
            >
              <div className="flex items-start space-x-3">
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0
                  ${isSelected
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-muted text-muted-foreground group-hover:bg-secondary/10'
                  }
                `}>
                  <Icon name="MessageSquare" size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground leading-relaxed">
                    {option?.text}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderPuzzleQuestion = () => (
    <div className="space-y-6">
      {question?.puzzleImage && (
        <div className="flex justify-center">
          <div className="relative max-w-md w-full">
            <Image
              src={question?.puzzleImage}
              alt="Puzzle diagram"
              className="w-full h-auto rounded-lg border border-border"
            />
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-3">
        {question?.options?.map((option) => {
          const isSelected = selectedOption === option?.id;
          
          return (
            <button
              key={option?.id}
              onClick={() => handleOptionSelect(option?.id)}
              className={`
                p-4 rounded-lg border-2 transition-all duration-200
                hover-scale group text-center
                ${isSelected
                  ? 'border-accent bg-accent/5 shadow-sm'
                  : 'border-border bg-card hover:border-accent/30 hover:bg-muted/50'
                }
              `}
            >
              <div className={`
                text-lg font-semibold mb-1
                ${isSelected ? 'text-accent' : 'text-foreground'}
              `}>
                {option?.value}
              </div>
              {option?.label && (
                <div className="text-xs text-muted-foreground">
                  {option?.label}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  const getQuestionTypeIcon = () => {
    switch (question?.type) {
      case 'situational':
        return 'Users';
      case 'puzzle':
        return 'Puzzle';
      default:
        return 'HelpCircle';
    }
  };

  const getQuestionTypeLabel = () => {
    switch (question?.type) {
      case 'situational':
        return 'Situational Question';
      case 'puzzle':
        return 'Logic Puzzle';
      default:
        return 'Multiple Choice';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="bg-card rounded-xl border border-border card-shadow p-6 md:p-8">
        {/* Question Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name={getQuestionTypeIcon()} size={20} color="var(--color-primary)" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-primary">
                {getQuestionTypeLabel()}
              </span>
              {question?.difficulty && (
                <span className={`
                  text-xs px-2 py-0.5 rounded-full font-medium
                  ${question?.difficulty === 'easy' ? 'bg-success/10 text-success' :
                    question?.difficulty === 'medium'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                  }
                `}>
                  {question?.difficulty}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Question {question?.number} of {question?.total}
            </p>
          </div>
        </div>

        {/* Question Text */}
        <div className="mb-8">
          <h2 className="text-xl md:text-2xl font-semibold text-foreground leading-relaxed mb-4">
            {question?.text}
          </h2>
          
          {question?.description && (
            <p className="text-muted-foreground leading-relaxed">
              {question?.description}
            </p>
          )}
        </div>

        {/* Question Content */}
        <div className="mb-8">
          {question?.type === 'mcq' && renderMCQOptions()}
          {question?.type === 'situational' && renderSituationalQuestion()}
          {question?.type === 'puzzle' && renderPuzzleQuestion()}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-border">
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={!canGoPrevious}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Previous
            </Button>
            
            {showSkip && (
              <Button
                variant="ghost"
                onClick={onSkip}
                className="text-muted-foreground"
              >
                Skip Question
              </Button>
            )}
          </div>

          <Button
            variant="default"
            onClick={onNext}
            disabled={!canGoNext}
            iconName="ChevronRight"
            iconPosition="right"
          >
            {question?.isLast ? 'Finish Quiz' : 'Next'}
          </Button>
        </div>
      </div>
      {/* Feedback Toast */}
      {showFeedback && (
        <div className="fixed top-24 right-4 z-50 achievement-bounce">
          <div className="flex items-center space-x-2 px-4 py-2 bg-success text-success-foreground rounded-lg modal-shadow">
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm font-medium">Correct! +10 XP</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionDisplay;
import React from 'react';
import Icon from '../AppIcon';

const ProgressIndicator = ({ 
  currentStep = 1, 
  totalSteps = 5, 
  percentage = 0, 
  xpPoints = 0, 
  showXP = true,
  className = "",
  variant = "horizontal" // horizontal, circular
}) => {
  const progressPercentage = Math.min(Math.max(percentage, 0), 100);
  const stepPercentage = Math.min(Math.max((currentStep / totalSteps) * 100, 0), 100);

  if (variant === "circular") {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

    return (
      <div className={`flex flex-col items-center space-y-2 ${className}`}>
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="var(--color-muted)"
              strokeWidth="8"
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="var(--color-primary)"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-300 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-semibold text-foreground">
              {Math.round(progressPercentage)}%
            </span>
          </div>
        </div>
        
        {showXP && xpPoints > 0 && (
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Icon name="Zap" size={14} color="var(--color-accent)" />
            <span className="font-medium">{xpPoints} XP</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-foreground">
            Step {currentStep} of {totalSteps}
          </span>
          {showXP && xpPoints > 0 && (
            <div className="flex items-center space-x-1 text-sm text-accent">
              <Icon name="Zap" size={14} />
              <span className="font-medium">+{xpPoints} XP</span>
            </div>
          )}
        </div>
        <span className="text-sm text-muted-foreground">
          {Math.round(stepPercentage)}%
        </span>
      </div>
      
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300 ease-out"
          style={{ width: `${stepPercentage}%` }}
        />
      </div>
      
      {/* Step indicators */}
      <div className="flex justify-between mt-3">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div
              key={stepNumber}
              className={`
                flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium
                transition-all duration-200
                ${isCompleted
                  ? 'bg-success text-success-foreground'
                  : isCurrent
                  ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-opacity-20'
                  : 'bg-muted text-muted-foreground'
                }
              `}
            >
              {isCompleted ? (
                <Icon name="Check" size={14} strokeWidth={2.5} />
              ) : (
                stepNumber
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;
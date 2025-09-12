import React from 'react';
import Icon from '../../../components/AppIcon';

const QuizSidebar = ({ 
  questions, 
  currentQuestionIndex, 
  answeredQuestions, 
  skippedQuestions,
  onQuestionSelect,
  achievements = [],
  className = ""
}) => {
  const getQuestionStatus = (index) => {
    if (answeredQuestions?.includes(index)) return 'answered';
    if (skippedQuestions?.includes(index)) return 'skipped';
    if (index === currentQuestionIndex) return 'current';
    return 'pending';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'answered':
        return 'CheckCircle';
      case 'skipped':
        return 'SkipForward';
      case 'current':
        return 'Circle';
      default:
        return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'answered':
        return 'var(--color-success)';
      case 'skipped':
        return 'var(--color-warning)';
      case 'current':
        return 'var(--color-primary)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'answered':
        return 'bg-success/10 border-success/20';
      case 'skipped':
        return 'bg-warning/10 border-warning/20';
      case 'current':
        return 'bg-primary/10 border-primary/20';
      default:
        return 'bg-muted/30 border-border';
    }
  };

  const completionPercentage = Math.round((answeredQuestions?.length / questions?.length) * 100);

  return (
    <div className={`w-80 bg-card border-l border-border h-full overflow-y-auto ${className}`}>
      <div className="p-6">
        {/* Progress Summary */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-foreground">Quiz Progress</h3>
            <span className="text-sm font-medium text-primary">{completionPercentage}%</span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-2 mb-4">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-2 bg-success/10 rounded-lg">
              <div className="text-lg font-semibold text-success">{answeredQuestions?.length}</div>
              <div className="text-xs text-muted-foreground">Answered</div>
            </div>
            <div className="p-2 bg-warning/10 rounded-lg">
              <div className="text-lg font-semibold text-warning">{skippedQuestions?.length}</div>
              <div className="text-xs text-muted-foreground">Skipped</div>
            </div>
            <div className="p-2 bg-muted/50 rounded-lg">
              <div className="text-lg font-semibold text-foreground">
                {questions?.length - answeredQuestions?.length - skippedQuestions?.length}
              </div>
              <div className="text-xs text-muted-foreground">Remaining</div>
            </div>
          </div>
        </div>

        {/* Question Navigator */}
        <div className="mb-6">
          <h4 className="font-medium text-foreground mb-3">Questions</h4>
          <div className="grid grid-cols-5 gap-2">
            {questions?.map((question, index) => {
              const status = getQuestionStatus(index);
              
              return (
                <button
                  key={question?.id}
                  onClick={() => onQuestionSelect(index)}
                  className={`
                    relative w-10 h-10 rounded-lg border-2 transition-all duration-200
                    hover-scale flex items-center justify-center
                    ${getStatusBg(status)}
                    ${status === 'current' ? 'ring-2 ring-primary ring-opacity-20' : ''}
                  `}
                  title={`Question ${index + 1} - ${status}`}
                >
                  <Icon 
                    name={getStatusIcon(status)} 
                    size={16} 
                    color={getStatusColor(status)}
                    strokeWidth={status === 'current' ? 2.5 : 2}
                  />
                  {/* Question number */}
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-card border border-border rounded-full text-xs font-medium text-muted-foreground flex items-center justify-center">
                    {index + 1}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Achievements */}
        {achievements?.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium text-foreground mb-3">Recent Achievements</h4>
            <div className="space-y-2">
              {achievements?.slice(0, 3)?.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-accent/5 rounded-lg border border-accent/10"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-lg">
                    <Icon name={achievement?.icon} size={16} color="var(--color-accent)" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{achievement?.title}</p>
                    <p className="text-xs text-muted-foreground">+{achievement?.xp} XP</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quiz Tips */}
        <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={18} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-primary mb-2">Quiz Tips</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Read questions carefully</li>
                <li>• Trust your first instinct</li>
                <li>• Skip if unsure, return later</li>
                <li>• Manage your time wisely</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSidebar;
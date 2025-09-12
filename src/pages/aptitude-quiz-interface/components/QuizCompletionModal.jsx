import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuizCompletionModal = ({ 
  isOpen, 
  results, 
  onClose, 
  onRetake,
  onViewRecommendations 
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const {
    totalQuestions = 0,
    answeredQuestions = 0,
    correctAnswers = 0,
    totalXP = 0,
    timeSpent = 0,
    accuracy = 0,
    strengths = [],
    recommendations = []
  } = results;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getPerformanceLevel = () => {
    if (accuracy >= 85) return { label: 'Excellent', color: 'text-success', icon: 'Trophy' };
    if (accuracy >= 70) return { label: 'Good', color: 'text-primary', icon: 'Award' };
    if (accuracy >= 55) return { label: 'Average', color: 'text-warning', icon: 'Star' };
    return { label: 'Needs Improvement', color: 'text-error', icon: 'Target' };
  };

  const performance = getPerformanceLevel();

  const handleViewRecommendations = () => {
    onViewRecommendations();
    navigate('/stream-recommendations');
  };

  const handleViewDashboard = () => {
    onClose();
    navigate('/student-dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-2xl bg-card rounded-xl border border-border modal-shadow max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-lg">
                <Icon name="CheckCircle" size={24} color="var(--color-success)" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Quiz Completed!</h2>
                <p className="text-sm text-muted-foreground">Great job on finishing your assessment</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-muted transition-colors duration-200"
            >
              <Icon name="X" size={18} color="var(--color-muted-foreground)" />
            </button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="p-6">
          {/* Performance Badge */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-3">
              <Icon name={performance?.icon} size={28} color="var(--color-primary)" />
            </div>
            <h3 className={`text-lg font-semibold ${performance?.color} mb-1`}>
              {performance?.label} Performance
            </h3>
            <p className="text-2xl font-bold text-foreground">{accuracy}% Accuracy</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-primary mb-1">{answeredQuestions}</div>
              <div className="text-xs text-muted-foreground">Questions Answered</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-success mb-1">{correctAnswers}</div>
              <div className="text-xs text-muted-foreground">Correct Answers</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-accent mb-1">{totalXP}</div>
              <div className="text-xs text-muted-foreground">XP Earned</div>
            </div>
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-foreground mb-1">{formatTime(timeSpent)}</div>
              <div className="text-xs text-muted-foreground">Time Spent</div>
            </div>
          </div>

          {/* Strengths */}
          {strengths?.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-foreground mb-3">Your Key Strengths</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {strengths?.slice(0, 4)?.map((strength, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-success/5 rounded-lg border border-success/10"
                  >
                    <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                    <span className="text-sm font-medium text-foreground">{strength}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Recommendations Preview */}
          {recommendations?.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-foreground mb-3">Recommended Streams</h4>
              <div className="space-y-2">
                {recommendations?.slice(0, 3)?.map((rec, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/10"
                  >
                    <div className="flex items-center space-x-3">
                      <Icon name="Target" size={16} color="var(--color-primary)" />
                      <span className="text-sm font-medium text-foreground">{rec?.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-primary font-medium">{rec?.match}% match</span>
                      <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${rec?.match}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="default"
              onClick={handleViewRecommendations}
              iconName="Target"
              iconPosition="left"
              fullWidth
            >
              View All Recommendations
            </Button>
            <Button
              variant="outline"
              onClick={handleViewDashboard}
              iconName="LayoutDashboard"
              iconPosition="left"
              fullWidth
            >
              Go to Dashboard
            </Button>
          </div>

          <div className="flex justify-center mt-4">
            <Button
              variant="ghost"
              onClick={onRetake}
              className="text-muted-foreground"
            >
              Retake Quiz
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCompletionModal;
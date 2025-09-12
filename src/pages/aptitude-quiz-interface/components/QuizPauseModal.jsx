import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuizPauseModal = ({ 
  isOpen, 
  onResume, 
  onExit, 
  currentProgress,
  timeRemaining 
}) => {
  if (!isOpen) return null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-md bg-card rounded-xl border border-border modal-shadow">
        {/* Header */}
        <div className="p-6 text-center border-b border-border">
          <div className="flex items-center justify-center w-16 h-16 bg-warning/10 rounded-full mx-auto mb-4">
            <Icon name="Pause" size={28} color="var(--color-warning)" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Quiz Paused</h2>
          <p className="text-sm text-muted-foreground">
            Take a moment to rest. Your progress is saved.
          </p>
        </div>

        {/* Progress Info */}
        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-lg font-semibold text-primary mb-1">
                {currentProgress?.answered}
              </div>
              <div className="text-xs text-muted-foreground">Questions Answered</div>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-lg">
              <div className="text-lg font-semibold text-foreground mb-1 font-mono">
                {formatTime(timeRemaining)}
              </div>
              <div className="text-xs text-muted-foreground">Time Remaining</div>
            </div>
          </div>

          {/* Tips */}
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/10 mb-6">
            <div className="flex items-start space-x-3">
              <Icon name="Lightbulb" size={18} color="var(--color-primary)" className="flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-primary mb-2">Quick Tips</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Stay relaxed and focused</li>
                  <li>• Trust your instincts</li>
                  <li>• Review skipped questions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              variant="default"
              onClick={onResume}
              iconName="Play"
              iconPosition="left"
              fullWidth
            >
              Resume Quiz
            </Button>
            <Button
              variant="outline"
              onClick={onExit}
              iconName="LogOut"
              iconPosition="left"
              fullWidth
            >
              Exit Quiz
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Your progress will be saved if you exit
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizPauseModal;
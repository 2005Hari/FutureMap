import React from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from '../AppIcon';

const QuickActionPanel = ({ 
  userProgress = {}, 
  className = "",
  layout = "grid" // grid, horizontal, vertical
}) => {
  const navigate = useNavigate();

  const {
    hasCompletedQuiz = false,
    hasRecommendations = false,
    completionPercentage = 0,
    totalXP = 0
  } = userProgress;

  const quickActions = [
    {
      id: 'take-quiz',
      title: hasCompletedQuiz ? 'Retake Quiz' : 'Start Assessment',
      description: hasCompletedQuiz 
        ? 'Update your aptitude profile' :'Discover your strengths and interests',
      icon: 'Brain',
      path: '/aptitude-quiz-interface',
      variant: hasCompletedQuiz ? 'outline' : 'default',
      priority: 1,
      badge: hasCompletedQuiz ? null : 'New'
    },
    {
      id: 'view-recommendations',
      title: 'My Recommendations',
      description: hasRecommendations 
        ? 'View your personalized stream suggestions' :'Complete quiz to get recommendations',
      icon: 'Target',
      path: '/stream-recommendations',
      variant: hasRecommendations ? 'default' : 'outline',
      disabled: !hasRecommendations,
      priority: 2,
      badge: hasRecommendations ? 'Updated' : null
    },
    {
      id: 'explore-careers',
      title: 'Explore Careers',
      description: 'Discover career paths and opportunities',
      icon: 'Map',
      path: '/career-pathway-explorer',
      variant: 'outline',
      priority: 3
    },
    {
      id: 'ai-chat',
      title: 'Ask AI Counselor',
      description: 'Get instant career guidance',
      icon: 'MessageCircle',
      path: '/ai-career-chatbot',
      variant: 'ghost',
      priority: 4,
      badge: 'AI'
    }
  ];

  const handleActionClick = (action) => {
    if (!action?.disabled) {
      navigate(action?.path);
    }
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case 'horizontal':
        return 'flex flex-wrap gap-4';
      case 'vertical':
        return 'flex flex-col space-y-4';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 gap-4';
    }
  };

  return (
    <div className={`${className}`}>
      {/* Progress Summary */}
      {(totalXP > 0 || completionPercentage > 0) && (
        <div className="mb-6 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                <Icon name="TrendingUp" size={20} color="var(--color-primary)" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Your Progress</h3>
                <p className="text-sm text-muted-foreground">
                  {completionPercentage}% profile complete
                </p>
              </div>
            </div>
            {totalXP > 0 && (
              <div className="flex items-center space-x-2 px-3 py-1 bg-accent/10 rounded-full">
                <Icon name="Zap" size={16} color="var(--color-accent)" />
                <span className="text-sm font-medium text-accent">{totalXP} XP</span>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Quick Actions */}
      <div className={getLayoutClasses()}>
        {quickActions?.sort((a, b) => a?.priority - b?.priority)?.map((action) => (
            <div
              key={action?.id}
              className={`
                relative group p-6 bg-card border border-border rounded-lg
                transition-all duration-200 hover-scale card-shadow
                ${action?.disabled 
                  ? 'opacity-60 cursor-not-allowed' :'hover:border-primary/20 cursor-pointer'
                }
              `}
              onClick={() => handleActionClick(action)}
            >
              {/* Badge */}
              {action?.badge && (
                <div className="absolute top-3 right-3">
                  <span className={`
                    px-2 py-1 text-xs font-medium rounded-full
                    ${action?.badge === 'New' ?'bg-success/10 text-success border border-success/20'
                      : action?.badge === 'Updated' ?'bg-primary/10 text-primary border border-primary/20'
                      : action?.badge === 'AI' ?'bg-accent/10 text-accent border border-accent/20' :'bg-muted text-muted-foreground'
                    }
                  `}>
                    {action?.badge}
                  </span>
                </div>
              )}

              <div className="flex items-start space-x-4">
                <div className={`
                  flex items-center justify-center w-12 h-12 rounded-lg
                  ${action?.disabled
                    ? 'bg-muted'
                    : action?.variant === 'default' ?'bg-primary/10' :'bg-muted'
                  }
                `}>
                  <Icon 
                    name={action?.icon} 
                    size={24} 
                    color={
                      action?.disabled 
                        ? 'var(--color-muted-foreground)'
                        : action?.variant === 'default' ?'var(--color-primary)' :'var(--color-foreground)'
                    }
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-200">
                    {action?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {action?.description}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <Icon 
                    name="ChevronRight" 
                    size={20} 
                    color="var(--color-muted-foreground)"
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* Call to Action */}
      {!hasCompletedQuiz && (
        <div className="mt-6 p-4 bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg border border-accent/10">
          <div className="flex items-center space-x-3">
            <Icon name="Lightbulb" size={20} color="var(--color-accent)" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Ready to discover your ideal career path?
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Take our comprehensive aptitude quiz to get personalized recommendations.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActionPanel;
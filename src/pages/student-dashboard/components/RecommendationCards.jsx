import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationCards = ({ 
  recommendations = [],
  hasCompletedQuiz = true,
  className = ""
}) => {
  const navigate = useNavigate();

  const defaultRecommendations = [
    {
      id: 'science',
      title: 'Science Stream',
      compatibility: 92,
      description: 'Perfect match for your analytical thinking and problem-solving skills',
      icon: 'Microscope',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      careers: ['Engineering', 'Medicine', 'Research', 'Technology'],
      isRecommended: true
    },
    {
      id: 'commerce',
      title: 'Commerce Stream',
      compatibility: 78,
      description: 'Great fit for your business acumen and numerical abilities',
      icon: 'TrendingUp',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      careers: ['Business', 'Finance', 'Accounting', 'Economics'],
      isRecommended: false
    },
    {
      id: 'arts',
      title: 'Arts & Humanities',
      compatibility: 65,
      description: 'Suitable for your creative expression and communication skills',
      icon: 'Palette',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      careers: ['Literature', 'Psychology', 'History', 'Philosophy'],
      isRecommended: false
    },
    {
      id: 'vocational',
      title: 'Vocational Training',
      compatibility: 71,
      description: 'Excellent for hands-on learning and practical skill development',
      icon: 'Wrench',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      careers: ['Technical Skills', 'Craftsmanship', 'Applied Arts', 'Trade'],
      isRecommended: false
    }
  ];

  const displayRecommendations = recommendations?.length > 0 ? recommendations : defaultRecommendations;

  const handleViewDetails = (streamId) => {
    navigate('/stream-recommendations', { state: { selectedStream: streamId } });
  };

  const handleTakeQuiz = () => {
    navigate('/aptitude-quiz-interface');
  };

  if (!hasCompletedQuiz) {
    return (
      <div className={`bg-card rounded-xl border border-border p-8 text-center ${className}`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Brain" size={32} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Discover Your Perfect Stream
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Take our comprehensive aptitude assessment to get personalized stream recommendations based on your interests and abilities.
            </p>
          </div>
          <Button 
            variant="default" 
            size="lg"
            iconName="ArrowRight"
            iconPosition="right"
            onClick={handleTakeQuiz}
          >
            Start Assessment
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Your Stream Recommendations</h2>
          <p className="text-muted-foreground mt-1">Based on your aptitude assessment results</p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          iconName="RefreshCw"
          iconPosition="left"
          onClick={handleTakeQuiz}
        >
          Retake Quiz
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayRecommendations?.map((recommendation) => (
          <div
            key={recommendation?.id}
            className={`
              relative bg-card rounded-xl border-2 p-6 transition-all duration-200 hover-scale cursor-pointer
              ${recommendation?.isRecommended 
                ? 'border-primary shadow-lg ring-2 ring-primary/10' 
                : `${recommendation?.borderColor} hover:border-primary/50`
              }
            `}
            onClick={() => handleViewDetails(recommendation?.id)}
          >
            {recommendation?.isRecommended && (
              <div className="absolute -top-3 left-6">
                <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                  <Icon name="Star" size={12} />
                  <span>Top Match</span>
                </div>
              </div>
            )}

            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${recommendation?.bgColor} flex items-center justify-center`}>
                <Icon 
                  name={recommendation?.icon} 
                  size={24} 
                  color={recommendation?.color?.includes('blue') ? '#3b82f6' : 
                         recommendation?.color?.includes('green') ? '#10b981' :
                         recommendation?.color?.includes('purple') ? '#8b5cf6' : '#f97316'}
                />
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-foreground">
                    {recommendation?.compatibility}%
                  </span>
                  <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${recommendation?.color} transition-all duration-300`}
                      style={{ width: `${recommendation?.compatibility}%` }}
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Compatibility</p>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {recommendation?.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {recommendation?.description}
              </p>
            </div>

            <div className="mb-4">
              <p className="text-xs font-medium text-muted-foreground mb-2">Popular Careers:</p>
              <div className="flex flex-wrap gap-2">
                {recommendation?.careers?.slice(0, 3)?.map((career, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                  >
                    {career}
                  </span>
                ))}
                {recommendation?.careers?.length > 3 && (
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                    +{recommendation?.careers?.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm">
                View Details
              </Button>
              <Icon name="ChevronRight" size={16} color="var(--color-muted-foreground)" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationCards;
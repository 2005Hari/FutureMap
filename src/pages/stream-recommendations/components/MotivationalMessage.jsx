import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MotivationalMessage = ({ hasRecommendations = true, className = "" }) => {
  const navigate = useNavigate();

  if (!hasRecommendations) {
    return (
      <div className={`p-6 bg-gradient-to-r from-accent/5 to-primary/5 border border-accent/20 rounded-lg ${className}`}>
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mx-auto">
            <Icon name="Brain" size={32} color="var(--color-accent)" />
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Ready to Discover Your Path?
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Complete your aptitude assessment to receive personalized stream recommendations 
              tailored to your unique strengths and interests.
            </p>
          </div>
          
          <Button
            variant="default"
            onClick={() => navigate('/aptitude-quiz-interface')}
            iconName="ArrowRight"
            iconPosition="right"
            className="mt-4"
          >
            Take Assessment Now
          </Button>
        </div>
      </div>
    );
  }

  const motivationalMessages = [
    {
      icon: 'Lightbulb',
      title: 'Every Expert Was Once a Beginner',
      message: `Your journey starts with choosing the right stream. These recommendations are based on your unique profile - trust the process and embrace the adventure ahead.`,
      color: 'accent'
    },
    {
      icon: 'Target',
      title: 'Your Future is Taking Shape',
      message: `These personalized recommendations align with your strengths and interests. Remember, success comes from passion combined with the right direction.`,
      color: 'primary'
    },
    {
      icon: 'Star',
      title: 'You Have What It Takes',
      message: `The assessment reveals your potential across different streams. Choose the path that excites you most - your enthusiasm will fuel your success.`,
      color: 'success'
    }
  ];

  const randomMessage = motivationalMessages?.[Math.floor(Math.random() * motivationalMessages?.length)];

  const getColorClasses = (color) => {
    switch (color) {
      case 'accent':
        return {
          bg: 'bg-accent/10',
          border: 'border-accent/20',
          icon: 'var(--color-accent)',
          gradient: 'from-accent/5 to-orange-500/5'
        };
      case 'primary':
        return {
          bg: 'bg-primary/10',
          border: 'border-primary/20',
          icon: 'var(--color-primary)',
          gradient: 'from-primary/5 to-blue-500/5'
        };
      case 'success':
        return {
          bg: 'bg-success/10',
          border: 'border-success/20',
          icon: 'var(--color-success)',
          gradient: 'from-success/5 to-green-500/5'
        };
      default:
        return {
          bg: 'bg-muted/50',
          border: 'border-muted',
          icon: 'var(--color-muted-foreground)',
          gradient: 'from-muted/5 to-gray-500/5'
        };
    }
  };

  const colors = getColorClasses(randomMessage?.color);

  return (
    <div className={`p-6 bg-gradient-to-r ${colors?.gradient} border ${colors?.border} rounded-lg ${className}`}>
      <div className="flex items-start space-x-4">
        <div className={`flex items-center justify-center w-12 h-12 ${colors?.bg} rounded-lg flex-shrink-0`}>
          <Icon name={randomMessage?.icon} size={24} color={colors?.icon} />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground mb-2">
            {randomMessage?.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            {randomMessage?.message}
          </p>
          
          <div className="flex flex-wrap gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/ai-career-chatbot')}
              iconName="MessageCircle"
              iconPosition="left"
            >
              Ask AI Counselor
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/career-pathway-explorer')}
              iconName="Map"
              iconPosition="left"
            >
              Explore Career Paths
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotivationalMessage;
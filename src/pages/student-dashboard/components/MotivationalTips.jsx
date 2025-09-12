import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MotivationalTips = ({ 
  studentProfile = {},
  className = ""
}) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const motivationalTips = [
    {
      id: 1,
      title: "Embrace Your Unique Journey",
      content: "Every successful person started where you are now. Your career path doesn't have to look like anyone else's - focus on your strengths and interests.",
      icon: "Compass",
      category: "mindset",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      id: 2,
      title: "Skills Can Be Developed",
      content: "Don't worry if you feel behind in certain areas. With dedication and practice, you can develop any skill you need for your dream career.",
      icon: "TrendingUp",
      category: "growth",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      id: 3,
      title: "Explore Before You Decide",
      content: "It's okay to be uncertain about your future. Use this time to explore different fields, talk to professionals, and gain diverse experiences.",
      icon: "Map",
      category: "exploration",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      id: 4,
      title: "Network and Connect",
      content: "Building relationships with mentors, peers, and professionals in your field of interest can open doors you never knew existed.",
      icon: "Users",
      category: "networking",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      id: 5,
      title: "Stay Curious and Keep Learning",
      content: "The job market is constantly evolving. Cultivate a love for learning and stay updated with trends in your areas of interest.",
      icon: "BookOpen",
      category: "learning",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      id: 6,
      title: "Take Action, Even Small Steps",
      content: "Progress is progress, no matter how small. Take one small step today towards understanding your career options better.",
      icon: "ArrowRight",
      category: "action",
      color: "text-green-600",
      bgColor: "bg-green-100"
    }
  ];

  const currentTip = motivationalTips?.[currentTipIndex];

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % motivationalTips?.length);
  };

  const previousTip = () => {
    setCurrentTipIndex((prev) => (prev - 1 + motivationalTips?.length) % motivationalTips?.length);
  };

  // Auto-rotate tips every 10 seconds
  useEffect(() => {
    const interval = setInterval(nextTip, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`bg-card rounded-xl border border-border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Daily Motivation</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronLeft"
            onClick={previousTip}
            className="w-8 h-8 p-0"
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronRight"
            onClick={nextTip}
            className="w-8 h-8 p-0"
          />
        </div>
      </div>
      <div className="relative">
        <div className={`p-6 rounded-lg ${currentTip?.bgColor} transition-all duration-300`}>
          <div className="flex items-start space-x-4">
            <div className="flex items-center justify-center w-12 h-12 bg-card rounded-lg flex-shrink-0">
              <Icon 
                name={currentTip?.icon} 
                size={24} 
                color={currentTip?.color?.replace('text-', '')}
              />
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">
                {currentTip?.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {currentTip?.content}
              </p>
            </div>
          </div>
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center space-x-2 mt-4">
          {motivationalTips?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTipIndex(index)}
              className={`
                w-2 h-2 rounded-full transition-all duration-200
                ${index === currentTipIndex 
                  ? 'bg-primary w-6' :'bg-muted hover:bg-muted-foreground/30'
                }
              `}
            />
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Lightbulb" size={16} color="var(--color-accent)" />
            <span className="text-sm font-medium text-foreground">Need guidance?</span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            iconName="MessageCircle"
            iconPosition="left"
            onClick={() => window.location.href = '/ai-career-chatbot'}
          >
            Ask AI Counselor
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MotivationalTips;
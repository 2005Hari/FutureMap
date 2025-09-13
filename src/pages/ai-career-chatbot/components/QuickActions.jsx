import React from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from '../../../components/AppIcon';

const QuickActions = ({ onQuickAction, className = "" }) => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'take-quiz',
      title: 'Take Aptitude Quiz',
      description: 'Get personalized recommendations',
      icon: 'Brain',
      action: () => navigate('/aptitude-quiz-interface'),
      variant: 'default'
    },
    {
      id: 'view-recommendations',
      title: 'My Recommendations',
      description: 'View your stream suggestions',
      icon: 'Target',
      action: () => navigate('/stream-recommendations'),
      variant: 'outline'
    },
    {
      id: 'explore-careers',
      title: 'Career Explorer',
      description: 'Discover career pathways',
      icon: 'Map',
      action: () => navigate('/career-pathway-explorer'),
      variant: 'outline'
    },
    {
      id: 'course-explorer',
      title: 'Course Programs',
      description: 'Browse courses and programs',
      icon: 'BookOpen',
      action: () => navigate('/course-program-explorer'),
      variant: 'outline'
    }
  ];

  const chatQuickActions = [
    "What career suits my personality?",
    "How to choose between Engineering and Medicine?",
    "What are the job prospects in AI/ML?",
    "Should I pursue higher studies or start working?",
    "How to build skills for my dream job?",
    "What are the trending career fields?"
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Navigation Quick Actions */}
      <div>
        <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Zap" size={18} />
          <span>Quick Actions</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={action?.action}
              className="h-full flex flex-col justify-between p-4 bg-card border border-border rounded-lg hover:border-primary/20 transition-all duration-200 hover-scale text-left"
            >
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg flex-shrink-0">
                  <Icon name={action?.icon} size={20} color="var(--color-primary)" />
                </div>
                <div className="flex-1 min-w-0 overflow-hidden">
                  <h4 className="font-medium text-foreground break-words">{action?.title}</h4>
                  <p className="text-sm text-muted-foreground break-words">{action?.description}</p>
                </div>
              </div>
              <div className="flex justify-end w-full">
                  <Icon name="ChevronRight" size={16} color="var(--color-muted-foreground)" />
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Chat Quick Actions */}
      <div>
        <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
          <Icon name="MessageCircle" size={18} />
          <span>Popular Questions</span>
        </h3>
        <div className="space-y-2">
          {chatQuickActions?.map((question, index) => (
            <button
              key={index}
              onClick={() => onQuickAction(question)}
              className="w-full text-left p-3 bg-muted/50 hover:bg-muted text-foreground rounded-lg text-sm transition-colors duration-150 hover-scale"
            >
              <div className="flex items-start space-x-2">
                <Icon
                  name="HelpCircle"
                  size={16}
                  className="flex-shrink-0 mt-1"
                  color="var(--color-muted-foreground)"
                />
                <span className="flex-1 min-w-0">{question}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Help Section */}
      <div className="bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg p-4 border border-accent/10">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} color="var(--color-accent)" />
          <div>
            <h4 className="font-medium text-foreground mb-1">How to get the best advice?</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Share your current grade and stream</li>
              <li>• Mention your interests and hobbies</li>
              <li>• Be specific about your concerns</li>
              <li>• Ask follow-up questions for clarity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
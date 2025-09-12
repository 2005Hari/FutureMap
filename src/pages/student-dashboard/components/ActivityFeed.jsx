import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ 
  activities = [],
  className = ""
}) => {
  const defaultActivities = [
    {
      id: 1,
      type: 'quiz_completed',
      title: 'Completed Aptitude Assessment',
      description: 'Scored 92% in logical reasoning section',
      timestamp: new Date('2025-01-11T14:30:00'),
      icon: 'Brain',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 2,
      type: 'recommendation_generated',
      title: 'New Stream Recommendations',
      description: 'Science stream shows 92% compatibility',
      timestamp: new Date('2025-01-11T14:35:00'),
      icon: 'Target',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 3,
      type: 'career_explored',
      title: 'Explored Engineering Pathways',
      description: 'Viewed Computer Science and Mechanical Engineering careers',
      timestamp: new Date('2025-01-11T15:20:00'),
      icon: 'Map',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 4,
      type: 'ai_chat',
      title: 'AI Counselor Session',
      description: 'Discussed career options in technology field',
      timestamp: new Date('2025-01-11T16:45:00'),
      icon: 'MessageCircle',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      id: 5,
      type: 'achievement_earned',
      title: 'Achievement Unlocked!',
      description: 'Earned "Consistent Learner" badge for 5-day streak',
      timestamp: new Date('2025-01-11T17:00:00'),
      icon: 'Trophy',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ];

  const displayActivities = activities?.length > 0 ? activities : defaultActivities;

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return timestamp?.toLocaleDateString();
  };

  return (
    <div className={`bg-card rounded-xl border border-border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
        <button className="text-sm text-primary hover:text-primary/80 font-medium">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {displayActivities?.map((activity, index) => (
          <div key={activity?.id} className="flex items-start space-x-3">
            <div className={`
              flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0
              ${activity?.bgColor}
            `}>
              <Icon 
                name={activity?.icon} 
                size={18} 
                color={activity?.color?.includes('text-') ? activity?.color?.replace('text-', '') : activity?.color}
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground text-sm">
                  {activity?.title}
                </h3>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {formatTimeAgo(activity?.timestamp)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                {activity?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {displayActivities?.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Activity" size={24} color="var(--color-muted-foreground)" />
          </div>
          <p className="text-muted-foreground">No recent activity</p>
          <p className="text-sm text-muted-foreground mt-1">
            Start exploring to see your activity here
          </p>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
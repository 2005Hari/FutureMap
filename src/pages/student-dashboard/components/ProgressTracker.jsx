import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressTracker = ({ 
  completedAssessments = 1,
  totalAssessments = 3,
  achievements = [],
  currentStreak = 5,
  className = ""
}) => {
  const defaultAchievements = [
    {
      id: 'first-quiz',
      title: 'Quiz Master',
      description: 'Completed your first aptitude assessment',
      icon: 'Trophy',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      earned: true,
      earnedDate: '2025-01-08'
    },
    {
      id: 'explorer',
      title: 'Career Explorer',
      description: 'Explored 5 different career pathways',
      icon: 'Map',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      earned: true,
      earnedDate: '2025-01-09'
    },
    {
      id: 'streak-5',
      title: 'Consistent Learner',
      description: 'Maintained a 5-day learning streak',
      icon: 'Flame',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      earned: true,
      earnedDate: '2025-01-11'
    },
    {
      id: 'ai-chat',
      title: 'AI Conversationalist',
      description: 'Had 10 conversations with AI counselor',
      icon: 'MessageCircle',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      earned: false
    },
    {
      id: 'course-explorer',
      title: 'Course Curator',
      description: 'Explored 20 different courses',
      icon: 'BookOpen',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      earned: false
    }
  ];

  const displayAchievements = achievements?.length > 0 ? achievements : defaultAchievements;
  const earnedAchievements = displayAchievements?.filter(achievement => achievement?.earned);
  const progressPercentage = (completedAssessments / totalAssessments) * 100;

  return (
    <div className={`bg-card rounded-xl border border-border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Your Progress</h2>
        <div className="flex items-center space-x-2 text-accent">
          <Icon name="Flame" size={18} />
          <span className="font-semibold">{currentStreak} day streak</span>
        </div>
      </div>
      {/* Assessment Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-foreground">Assessment Progress</span>
          <span className="text-sm text-muted-foreground">
            {completedAssessments}/{totalAssessments} completed
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Aptitude Quiz</span>
          <span>Interest Survey</span>
          <span>Skills Assessment</span>
        </div>
      </div>
      {/* Achievements */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Recent Achievements</h3>
          <span className="text-sm text-muted-foreground">
            {earnedAchievements?.length}/{displayAchievements?.length}
          </span>
        </div>

        <div className="space-y-3">
          {displayAchievements?.slice(0, 4)?.map((achievement) => (
            <div
              key={achievement?.id}
              className={`
                flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200
                ${achievement?.earned
                  ? 'bg-success/5 border-success/20' :'bg-muted/30 border-muted opacity-60'
                }
              `}
            >
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center
                ${achievement?.earned ? achievement?.bgColor : 'bg-muted'}
              `}>
                <Icon 
                  name={achievement?.icon} 
                  size={20} 
                  color={achievement?.earned ? achievement?.color?.replace('text-', '') : 'var(--color-muted-foreground)'}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h4 className={`font-medium ${achievement?.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {achievement?.title}
                  </h4>
                  {achievement?.earned && (
                    <Icon name="CheckCircle" size={16} color="var(--color-success)" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {achievement?.description}
                </p>
                {achievement?.earned && achievement?.earnedDate && (
                  <p className="text-xs text-success mt-1">
                    Earned on {new Date(achievement.earnedDate)?.toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {displayAchievements?.length > 4 && (
          <div className="mt-4 text-center">
            <button className="text-sm text-primary hover:text-primary/80 font-medium">
              View All Achievements ({displayAchievements?.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressTracker;
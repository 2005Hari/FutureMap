import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const WelcomeHeader = ({ 
  studentName = "Alex",
  currentXP = 1250,
  level = 5,
  avatarUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  nextMilestone = 1500,
  className = ""
}) => {
  const progressToNext = ((currentXP % 300) / 300) * 100;
  const timeOfDay = new Date()?.getHours() < 12 ? 'morning' : new Date()?.getHours() < 17 ? 'afternoon' : 'evening';

  const handleLogout = () => {
    localStorage.removeItem('auth');
    window.location.href = '/login';
  };

  return (
    <div className={`bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-xl p-6 border border-primary/20 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-primary/20">
              <Image 
                src={avatarUrl}
                alt={`${studentName}'s avatar`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {level}
            </div>
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Good {timeOfDay}, {studentName}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Ready to explore your career journey today?
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <div className="text-center">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Zap" size={20} color="var(--color-accent)" />
              <span className="text-2xl font-bold text-foreground">{currentXP?.toLocaleString()}</span>
            </div>
            <p className="text-sm text-muted-foreground">Total XP</p>
          </div>
          
          <div className="w-px h-12 bg-border"></div>
          
          <div className="text-center min-w-[120px]">
            <div className="mb-2">
              <span className="text-sm text-muted-foreground">Next Milestone</span>
              <div className="w-full bg-muted rounded-full h-2 mt-1">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300"
                  style={{ width: `${progressToNext}%` }}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {nextMilestone - currentXP} XP to Level {level + 1}
            </p>
          </div>
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="ml-8 px-4 py-2 rounded-lg bg-error text-white font-semibold shadow hover:bg-error-foreground transition"
            title="Logout"
          >
            Logout
          </button>
        </div>
      </div>
      {/* Mobile XP Display */}
      <div className="md:hidden mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={16} color="var(--color-accent)" />
          <span className="font-bold text-foreground">{currentXP?.toLocaleString()} XP</span>
        </div>
        <div className="flex-1 mx-4">
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300"
              style={{ width: `${progressToNext}%` }}
            />
          </div>
        </div>
        <span className="text-sm text-muted-foreground">Level {level}</span>
        {/* Mobile Logout Button */}
        <button
          onClick={handleLogout}
          className="ml-4 px-3 py-1 rounded-lg bg-error text-white font-semibold shadow hover:bg-error-foreground transition text-xs"
          title="Logout"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default WelcomeHeader;
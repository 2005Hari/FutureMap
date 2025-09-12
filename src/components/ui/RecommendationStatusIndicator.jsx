import React from 'react';
import Icon from '../AppIcon';

const RecommendationStatusIndicator = ({ 
  status = 'pending', // pending, processing, ready, updated
  confidence = 0, // 0-100
  lastUpdated = null,
  recommendationCount = 0,
  className = "",
  variant = "default" // default, compact, detailed
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'processing':
        return {
          icon: 'Loader2',
          label: 'Analyzing Your Profile',
          description: 'Our AI is processing your assessment results...',
          color: 'text-primary',
          bgColor: 'bg-primary/10',
          borderColor: 'border-primary/20',
          animate: 'animate-spin'
        };
      case 'ready':
        return {
          icon: 'CheckCircle',
          label: 'Recommendations Ready',
          description: `${recommendationCount} personalized recommendations available`,
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20'
        };
      case 'updated':
        return {
          icon: 'RefreshCw',
          label: 'Recently Updated',
          description: 'Your recommendations have been refreshed',
          color: 'text-accent',
          bgColor: 'bg-accent/10',
          borderColor: 'border-accent/20'
        };
      default:
        return {
          icon: 'Clock',
          label: 'Assessment Pending',
          description: 'Complete your aptitude quiz to get recommendations',
          color: 'text-muted-foreground',
          bgColor: 'bg-muted/50',
          borderColor: 'border-muted'
        };
    }
  };

  const statusConfig = getStatusConfig();

  const getConfidenceLevel = () => {
    if (confidence >= 85) return { label: 'Very High', color: 'text-success' };
    if (confidence >= 70) return { label: 'High', color: 'text-primary' };
    if (confidence >= 55) return { label: 'Moderate', color: 'text-warning' };
    return { label: 'Low', color: 'text-error' };
  };

  const confidenceLevel = getConfidenceLevel();

  const formatLastUpdated = (date) => {
    if (!date) return null;
    const now = new Date();
    const updated = new Date(date);
    const diffInHours = Math.floor((now - updated) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return updated?.toLocaleDateString();
  };

  if (variant === 'compact') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className={`flex items-center justify-center w-6 h-6 rounded-full ${statusConfig?.bgColor}`}>
          <Icon 
            name={statusConfig?.icon} 
            size={14} 
            color={statusConfig?.color?.replace('text-', 'var(--color-')}
            className={statusConfig?.animate}
          />
        </div>
        <span className={`text-sm font-medium ${statusConfig?.color}`}>
          {statusConfig?.label}
        </span>
        {confidence > 0 && (
          <span className={`text-xs ${confidenceLevel?.color}`}>
            ({confidence}%)
          </span>
        )}
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={`p-4 rounded-lg border ${statusConfig?.borderColor} ${statusConfig?.bgColor} ${className}`}>
        <div className="flex items-start space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-card">
            <Icon 
              name={statusConfig?.icon} 
              size={20} 
              color={statusConfig?.color?.replace('text-', 'var(--color-')}
              className={statusConfig?.animate}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className={`font-semibold ${statusConfig?.color}`}>
                {statusConfig?.label}
              </h3>
              {lastUpdated && (
                <span className="text-xs text-muted-foreground">
                  {formatLastUpdated(lastUpdated)}
                </span>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">
              {statusConfig?.description}
            </p>
            
            {confidence > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Confidence Level</span>
                  <span className={`font-medium ${confidenceLevel?.color}`}>
                    {confidenceLevel?.label} ({confidence}%)
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      confidence >= 85 ? 'bg-success' :
                      confidence >= 70 ? 'bg-primary' :
                      confidence >= 55 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${confidence}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-3 p-3 rounded-lg border ${statusConfig?.borderColor} ${statusConfig?.bgColor} ${className}`}>
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-card">
        <Icon 
          name={statusConfig?.icon} 
          size={16} 
          color={statusConfig?.color?.replace('text-', 'var(--color-')}
          className={statusConfig?.animate}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${statusConfig?.color}`}>
            {statusConfig?.label}
          </span>
          {confidence > 0 && (
            <span className={`text-xs ${confidenceLevel?.color}`}>
              {confidence}%
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          {statusConfig?.description}
        </p>
      </div>
      {lastUpdated && (
        <div className="text-xs text-muted-foreground">
          {formatLastUpdated(lastUpdated)}
        </div>
      )}
    </div>
  );
};

export default RecommendationStatusIndicator;
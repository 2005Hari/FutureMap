import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StreamCard = ({ 
  stream, 
  onExplore, 
  onCompare, 
  isSelected = false,
  isComparing = false 
}) => {
  const getCompatibilityColor = (percentage) => {
    if (percentage >= 85) return 'text-success';
    if (percentage >= 70) return 'text-primary';
    if (percentage >= 55) return 'text-warning';
    return 'text-error';
  };

  const getCompatibilityBg = (percentage) => {
    if (percentage >= 85) return 'bg-success/10 border-success/20';
    if (percentage >= 70) return 'bg-primary/10 border-primary/20';
    if (percentage >= 55) return 'bg-warning/10 border-warning/20';
    return 'bg-error/10 border-error/20';
  };

  return (
    <div className={`
      relative p-6 bg-card border rounded-lg transition-all duration-200 hover-scale card-shadow
      ${isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/30'}
      ${isComparing ? 'ring-2 ring-accent/20 border-accent' : ''}
    `}>
      {/* Compatibility Badge */}
      <div className={`
        absolute top-4 right-4 px-3 py-1 rounded-full border text-sm font-semibold
        ${getCompatibilityBg(stream?.compatibility)}
      `}>
        <span className={getCompatibilityColor(stream?.compatibility)}>
          {stream?.compatibility}% Match
        </span>
      </div>
      {/* Stream Header */}
      <div className="flex items-start space-x-4 mb-4">
        <div className={`
          flex items-center justify-center w-16 h-16 rounded-xl
          ${stream?.bgColor} ${stream?.iconColor}
        `}>
          <Icon name={stream?.icon} size={32} strokeWidth={2} />
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground mb-1">
            {stream?.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {stream?.description}
          </p>
        </div>
      </div>
      {/* Key Subjects */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-foreground mb-2">Key Subjects:</h4>
        <div className="flex flex-wrap gap-2">
          {stream?.keySubjects?.map((subject, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
            >
              {subject}
            </span>
          ))}
        </div>
      </div>
      {/* Career Potential */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="TrendingUp" size={16} color="var(--color-primary)" />
          <h4 className="text-sm font-semibold text-foreground">Career Potential:</h4>
        </div>
        <p className="text-sm text-muted-foreground">
          {stream?.careerPotential}
        </p>
      </div>
      {/* Alignment Reasoning */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Target" size={16} color="var(--color-success)" />
          <h4 className="text-sm font-semibold text-foreground">Why This Fits:</h4>
        </div>
        <p className="text-sm text-muted-foreground">
          {stream?.alignmentReason}
        </p>
      </div>
      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button
          variant="default"
          size="sm"
          onClick={() => onExplore(stream)}
          iconName="ArrowRight"
          iconPosition="right"
          className="flex-1"
        >
          Explore Further
        </Button>
        
        <Button
          variant={isComparing ? "default" : "outline"}
          size="sm"
          onClick={() => onCompare(stream)}
          iconName={isComparing ? "Check" : "GitCompare"}
          className="px-3"
        >
          {isComparing ? "Added" : "Compare"}
        </Button>
      </div>
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-2 left-2">
          <div className="flex items-center justify-center w-6 h-6 bg-primary rounded-full">
            <Icon name="Check" size={14} color="white" strokeWidth={2.5} />
          </div>
        </div>
      )}
    </div>
  );
};

export default StreamCard;
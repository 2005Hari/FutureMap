import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProgramCard = ({ 
  program, 
  onCompare, 
  onBookmark, 
  onViewDetails,
  isCompared = false,
  isBookmarked = false,
  className = ""
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatFees = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const getDurationColor = (duration) => {
    if (duration <= 2) return 'text-success bg-success/10';
    if (duration <= 4) return 'text-primary bg-primary/10';
    return 'text-accent bg-accent/10';
  };

  const getEligibilityBadgeColor = (level) => {
    switch (level?.toLowerCase()) {
      case '10th': return 'bg-success/10 text-success';
      case '12th': return 'bg-primary/10 text-primary';
      case 'graduation': return 'bg-accent/10 text-accent';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg card-shadow hover-scale transition-all duration-200 ${className}`}>
      {/* Program Image */}
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <Image
          src={program?.image}
          alt={program?.name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
            <Icon name="BookOpen" size={32} color="var(--color-muted-foreground)" />
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className={`w-8 h-8 bg-card/80 backdrop-blur-sm ${isBookmarked ? 'text-accent' : 'text-muted-foreground'}`}
            onClick={() => onBookmark(program?.id)}
          >
            <Icon name={isBookmarked ? "Bookmark" : "BookmarkPlus"} size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={`w-8 h-8 bg-card/80 backdrop-blur-sm ${isCompared ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => onCompare(program?.id)}
          >
            <Icon name="GitCompare" size={16} />
          </Button>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
            {program?.category}
          </span>
        </div>

        {/* New/Popular Badge */}
        {program?.badge && (
          <div className="absolute bottom-3 left-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              program?.badge === 'New' ? 'bg-success text-success-foreground' :
              program?.badge === 'Popular' ? 'bg-accent text-accent-foreground' :
              'bg-secondary text-secondary-foreground'
            }`}>
              {program?.badge}
            </span>
          </div>
        )}
      </div>
      {/* Program Content */}
      <div className="p-4">
        {/* Program Name & Institution */}
        <div className="mb-3">
          <h3 className="font-semibold text-foreground text-lg mb-1 line-clamp-2">
            {program?.name}
          </h3>
          <p className="text-sm text-muted-foreground flex items-center">
            <Icon name="Building" size={14} className="mr-1" />
            {program?.institution}
          </p>
        </div>

        {/* Key Details */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center space-x-2">
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDurationColor(program?.duration)}`}>
              {program?.duration} Years
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getEligibilityBadgeColor(program?.eligibility)}`}>
              {program?.eligibility}
            </div>
          </div>
        </div>

        {/* Fees */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Annual Fees</span>
            <span className="font-semibold text-foreground">
              {formatFees(program?.fees)}
            </span>
          </div>
        </div>

        {/* Key Highlights */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {program?.highlights?.slice(0, 3)?.map((highlight, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full"
              >
                {highlight}
              </span>
            ))}
            {program?.highlights?.length > 3 && (
              <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                +{program?.highlights?.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Placement Stats */}
        {program?.placementRate && (
          <div className="mb-4 p-2 bg-success/5 rounded-lg border border-success/10">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Placement Rate</span>
              <span className="font-semibold text-success">{program?.placementRate}%</span>
            </div>
            {program?.averagePackage && (
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="text-muted-foreground">Avg. Package</span>
                <span className="font-semibold text-foreground">
                  {formatFees(program?.averagePackage)}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => onViewDetails(program)}
          >
            <Icon name="Eye" size={16} className="mr-2" />
            View Details
          </Button>
          {program?.applicationLink && (
            <Button
              variant="default"
              size="sm"
              className="flex-1"
              onClick={() => window.open(program?.applicationLink, '_blank')}
            >
              <Icon name="ExternalLink" size={16} className="mr-2" />
              Apply Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
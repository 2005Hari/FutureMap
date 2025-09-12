import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ComparisonPanel = ({ 
  comparedPrograms, 
  onRemoveProgram, 
  onClearAll, 
  isOpen, 
  onToggle,
  className = ""
}) => {
  const formatFees = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const comparisonFields = [
    { key: 'duration', label: 'Duration', format: (value) => `${value} Years` },
    { key: 'fees', label: 'Annual Fees', format: formatFees },
    { key: 'eligibility', label: 'Eligibility', format: (value) => value },
    { key: 'placementRate', label: 'Placement Rate', format: (value) => `${value || 'N/A'}%` },
    { key: 'averagePackage', label: 'Avg. Package', format: (value) => value ? formatFees(value) : 'N/A' }
  ];

  if (comparedPrograms?.length === 0) {
    return (
      <div className={`bg-card border border-border rounded-lg p-6 text-center ${className}`}>
        <Icon name="GitCompare" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
        <h3 className="font-semibold text-foreground mb-2">No Programs to Compare</h3>
        <p className="text-muted-foreground text-sm">
          Select programs using the compare button to see side-by-side comparison
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="GitCompare" size={20} color="var(--color-primary)" />
          <h3 className="font-semibold text-foreground">Compare Programs</h3>
          <span className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded-full">
            {comparedPrograms?.length}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="md:hidden"
          >
            <Icon name={isOpen ? "ChevronUp" : "ChevronDown"} size={20} />
          </Button>
        </div>
      </div>
      {/* Comparison Content */}
      <div className={`${!isOpen ? 'hidden md:block' : ''}`}>
        {/* Program Headers */}
        <div className="p-4 border-b border-border">
          <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${comparedPrograms?.length}, 1fr)` }}>
            <div className="font-medium text-foreground">Programs</div>
            {comparedPrograms?.map((program) => (
              <div key={program?.id} className="relative">
                <div className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
                  <div className="w-12 h-12 overflow-hidden rounded-lg flex-shrink-0">
                    <Image
                      src={program?.image}
                      alt={program?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm line-clamp-2">
                      {program?.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {program?.institution}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveProgram(program?.id)}
                    className="w-6 h-6 text-muted-foreground hover:text-error"
                  >
                    <Icon name="X" size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Fields */}
        <div className="p-4 space-y-4">
          {comparisonFields?.map((field) => (
            <div key={field?.key} className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${comparedPrograms?.length}, 1fr)` }}>
              <div className="font-medium text-foreground text-sm py-2">
                {field?.label}
              </div>
              {comparedPrograms?.map((program) => (
                <div key={program?.id} className="py-2 px-3 bg-muted/50 rounded text-sm text-muted-foreground">
                  {field?.format(program?.[field?.key])}
                </div>
              ))}
            </div>
          ))}

          {/* Highlights Comparison */}
          <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${comparedPrograms?.length}, 1fr)` }}>
            <div className="font-medium text-foreground text-sm py-2">
              Key Highlights
            </div>
            {comparedPrograms?.map((program) => (
              <div key={program?.id} className="py-2 px-3 bg-muted/50 rounded">
                <div className="space-y-1">
                  {program?.highlights?.slice(0, 3)?.map((highlight, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Check" size={12} color="var(--color-success)" />
                      <span className="text-xs text-muted-foreground">{highlight}</span>
                    </div>
                  ))}
                  {program?.highlights?.length > 3 && (
                    <div className="text-xs text-muted-foreground">
                      +{program?.highlights?.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${comparedPrograms?.length}, 1fr)` }}>
            <div className="font-medium text-foreground text-sm py-2">
              Actions
            </div>
            {comparedPrograms?.map((program) => (
              <div key={program?.id} className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    // This would typically open the program details modal
                    console.log('View details for:', program?.name);
                  }}
                >
                  <Icon name="Eye" size={14} className="mr-2" />
                  View Details
                </Button>
                {program?.applicationLink && (
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full"
                    onClick={() => window.open(program?.applicationLink, '_blank')}
                  >
                    <Icon name="ExternalLink" size={14} className="mr-2" />
                    Apply
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Insights */}
        {comparedPrograms?.length >= 2 && (
          <div className="p-4 border-t border-border bg-muted/30">
            <h4 className="font-medium text-foreground mb-3">Quick Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} color="var(--color-primary)" />
                <div>
                  <div className="font-medium">Shortest Duration</div>
                  <div className="text-muted-foreground">
                    {Math.min(...comparedPrograms?.map(p => p?.duration))} Years
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="DollarSign" size={16} color="var(--color-success)" />
                <div>
                  <div className="font-medium">Most Affordable</div>
                  <div className="text-muted-foreground">
                    {formatFees(Math.min(...comparedPrograms?.map(p => p?.fees)))}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={16} color="var(--color-accent)" />
                <div>
                  <div className="font-medium">Best Placement</div>
                  <div className="text-muted-foreground">
                    {Math.max(...comparedPrograms?.map(p => p?.placementRate || 0))}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonPanel;
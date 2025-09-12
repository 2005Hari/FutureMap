import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NEPFlexibilityIndicator = ({ className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const flexibilityFeatures = [
    {
      icon: 'ArrowLeftRight',
      title: 'Stream Switching',
      description: 'Switch between streams with bridge courses and credit transfers',
      example: 'Science to Commerce with Business Mathematics bridge course'
    },
    {
      icon: 'Layers',
      title: 'Multidisciplinary Learning',
      description: 'Combine subjects from different streams for holistic education',
      example: 'Physics + Economics + Psychology combination possible'
    },
    {
      icon: 'Puzzle',
      title: 'Skill-Based Pathways',
      description: 'Focus on competencies rather than rigid subject boundaries',
      example: 'Digital Marketing skills across Commerce and Arts streams'
    },
    {
      icon: 'Repeat',
      title: 'Multiple Entry-Exit Points',
      description: 'Join or leave programs at various stages with certifications',
      example: 'Certificate after 1 year, Diploma after 2 years, Degree after 3 years'
    }
  ];

  const interconnections = [
    { from: 'Science', to: 'Commerce', bridge: 'Business Mathematics, Statistics' },
    { from: 'Commerce', to: 'Arts', bridge: 'Economics, Psychology' },
    { from: 'Arts', to: 'Science', bridge: 'Research Methodology, Data Analysis' },
    { from: 'Vocational', to: 'Any Stream', bridge: 'Skill Recognition & Credit Transfer' }
  ];

  return (
    <div className={`bg-card border border-border rounded-lg overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name="Shuffle" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">NEP 2020 Flexibility</h3>
              <p className="text-sm text-muted-foreground">
                Multiple pathways and switching options available
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          >
            {isExpanded ? 'Less' : 'More'} Info
          </Button>
        </div>
      </div>
      {/* Quick Overview */}
      <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {flexibilityFeatures?.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center w-8 h-8 bg-secondary/10 rounded-lg mx-auto mb-2">
                <Icon name={feature?.icon} size={16} color="var(--color-secondary)" />
              </div>
              <h4 className="text-sm font-medium text-foreground mb-1">{feature?.title}</h4>
              <p className="text-xs text-muted-foreground leading-tight">
                {feature?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-border">
          {/* Detailed Features */}
          <div className="p-4">
            <h4 className="font-semibold text-foreground mb-4">Flexibility Features in Detail</h4>
            <div className="space-y-4">
              {flexibilityFeatures?.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 bg-secondary/10 rounded-lg flex-shrink-0">
                    <Icon name={feature?.icon} size={16} color="var(--color-secondary)" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-foreground mb-1">{feature?.title}</h5>
                    <p className="text-sm text-muted-foreground mb-2">{feature?.description}</p>
                    <div className="flex items-center space-x-2">
                      <Icon name="Lightbulb" size={12} color="var(--color-accent)" />
                      <span className="text-xs text-accent font-medium">Example:</span>
                      <span className="text-xs text-muted-foreground">{feature?.example}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stream Interconnections */}
          <div className="p-4 border-t border-border bg-muted/20">
            <h4 className="font-semibold text-foreground mb-4">Stream Switching Pathways</h4>
            <div className="space-y-3">
              {interconnections?.map((connection, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-card rounded-lg border border-border">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-sm rounded">
                      {connection?.from}
                    </span>
                    <Icon name="ArrowRight" size={16} color="var(--color-muted-foreground)" />
                    <span className="px-2 py-1 bg-secondary/10 text-secondary text-sm rounded">
                      {connection?.to}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Icon name="Bridge" size={14} color="var(--color-accent)" />
                      <span className="text-sm text-muted-foreground">
                        Bridge: {connection?.bridge}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Info" size={16} color="var(--color-primary)" />
                <span className="text-sm text-muted-foreground">
                  Want to learn more about flexible pathways?
                </span>
              </div>
              <Button variant="outline" size="sm" iconName="ExternalLink" iconPosition="right">
                NEP 2020 Guide
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NEPFlexibilityIndicator;
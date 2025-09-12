import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparisonPanel = ({ streams, onClose, onSelectStream }) => {
  if (!streams || streams?.length === 0) return null;

  const comparisonCriteria = [
    { key: 'compatibility', label: 'Compatibility', icon: 'Target' },
    { key: 'difficulty', label: 'Difficulty Level', icon: 'BarChart3' },
    { key: 'careerProspects', label: 'Career Prospects', icon: 'TrendingUp' },
    { key: 'marketDemand', label: 'Market Demand', icon: 'Users' },
    { key: 'averageSalary', label: 'Average Salary', icon: 'DollarSign' }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy': return 'text-success';
      case 'medium': return 'text-warning';
      case 'hard': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getProspectColor = (prospect) => {
    switch (prospect?.toLowerCase()) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-primary';
      case 'average': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-6xl max-h-[90vh] bg-card rounded-lg modal-shadow overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Stream Comparison</h2>
            <p className="text-sm text-muted-foreground">
              Compare {streams?.length} streams side by side
            </p>
          </div>
          
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Stream Headers */}
            <div className="flex border-b border-border">
              <div className="w-48 p-4 bg-muted/50">
                <span className="font-semibold text-foreground">Criteria</span>
              </div>
              {streams?.map((stream) => (
                <div key={stream?.id} className="flex-1 min-w-64 p-4 text-center border-l border-border">
                  <div className="flex flex-col items-center space-y-2">
                    <div className={`
                      flex items-center justify-center w-12 h-12 rounded-lg
                      ${stream?.bgColor} ${stream?.iconColor}
                    `}>
                      <Icon name={stream?.icon} size={24} />
                    </div>
                    <h3 className="font-semibold text-foreground">{stream?.name}</h3>
                    <div className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${stream?.compatibility >= 85 ? 'bg-success/10 text-success' :
                        stream?.compatibility >= 70 ? 'bg-primary/10 text-primary': 'bg-warning/10 text-warning'}
                    `}>
                      {stream?.compatibility}% Match
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Comparison Rows */}
            {comparisonCriteria?.map((criteria, index) => (
              <div key={criteria?.key} className={`flex ${index % 2 === 0 ? 'bg-muted/20' : ''}`}>
                <div className="w-48 p-4 border-r border-border">
                  <div className="flex items-center space-x-2">
                    <Icon name={criteria?.icon} size={16} color="var(--color-primary)" />
                    <span className="font-medium text-foreground">{criteria?.label}</span>
                  </div>
                </div>
                {streams?.map((stream) => (
                  <div key={stream?.id} className="flex-1 min-w-64 p-4 text-center border-l border-border">
                    {criteria?.key === 'compatibility' && (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-success rounded-full"
                            style={{ width: `${stream?.compatibility}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{stream?.compatibility}%</span>
                      </div>
                    )}
                    {criteria?.key === 'difficulty' && (
                      <span className={`font-medium ${getDifficultyColor(stream?.difficulty)}`}>
                        {stream?.difficulty}
                      </span>
                    )}
                    {criteria?.key === 'careerProspects' && (
                      <span className={`font-medium ${getProspectColor(stream?.careerProspects)}`}>
                        {stream?.careerProspects}
                      </span>
                    )}
                    {criteria?.key === 'marketDemand' && (
                      <div className="flex items-center justify-center space-x-1">
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5]?.map((star) => (
                            <Icon
                              key={star}
                              name="Star"
                              size={14}
                              color={star <= stream?.marketDemand ? 'var(--color-warning)' : 'var(--color-muted)'}
                              className={star <= stream?.marketDemand ? 'fill-current' : ''}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground ml-1">
                          ({stream?.marketDemand}/5)
                        </span>
                      </div>
                    )}
                    {criteria?.key === 'averageSalary' && (
                      <span className="font-medium text-success">
                        ₹{stream?.averageSalary}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}

            {/* Pros and Cons */}
            <div className="border-t border-border">
              <div className="flex">
                <div className="w-48 p-4 border-r border-border bg-muted/50">
                  <span className="font-semibold text-foreground">Pros & Cons</span>
                </div>
                {streams?.map((stream) => (
                  <div key={stream?.id} className="flex-1 min-w-64 p-4 border-l border-border">
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-semibold text-success mb-2">Pros:</h4>
                        <ul className="space-y-1">
                          {stream?.pros?.map((pro, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <Icon name="Plus" size={12} color="var(--color-success)" className="mt-0.5" />
                              <span className="text-xs text-muted-foreground">{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-error mb-2">Cons:</h4>
                        <ul className="space-y-1">
                          {stream?.cons?.map((con, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <Icon name="Minus" size={12} color="var(--color-error)" className="mt-0.5" />
                              <span className="text-xs text-muted-foreground">{con}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/20">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={16} color="var(--color-primary)" />
            <span className="text-sm text-muted-foreground">
              Select a stream to explore detailed course options
            </span>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose}>
              Close Comparison
            </Button>
            {streams?.map((stream) => (
              <Button
                key={stream?.id}
                variant="default"
                size="sm"
                onClick={() => onSelectStream(stream)}
                iconName="ArrowRight"
                iconPosition="right"
              >
                Choose {stream?.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonPanel;
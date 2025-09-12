import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparisonPanel = ({ 
  comparedPathways = [], 
  onRemoveFromComparison, 
  onClearComparison,
  isVisible = false,
  onToggleVisibility 
}) => {
  const [activeComparison, setActiveComparison] = useState('overview');

  // Mock comparison data
  const getPathwayComparisonData = (pathwayId) => {
    const comparisonData = {
      'engineering': {
        duration: '4 years',
        fees: '₹2-15 LPA',
        salary: '₹4-25 LPA',
        difficulty: 'High',
        jobSecurity: 'High',
        growth: 'Excellent',
        skills: ['Problem Solving', 'Technical Skills', 'Mathematics'],
        pros: ['High salary potential', 'Diverse opportunities', 'Innovation-focused'],
        cons: ['Competitive field', 'Continuous learning required', 'High study pressure']
      },
      'medical': {
        duration: '5.5 years',
        fees: '₹5-25 LPA',
        salary: '₹6-50 LPA',
        difficulty: 'Very High',
        jobSecurity: 'Very High',
        growth: 'Excellent',
        skills: ['Empathy', 'Communication', 'Problem Solving'],
        pros: ['Noble profession', 'High respect', 'Job security'],
        cons: ['Long study duration', 'High stress', 'Expensive education']
      },
      'bcom': {
        duration: '3 years',
        fees: '₹50K-3 LPA',
        salary: '₹3-12 LPA',
        difficulty: 'Medium',
        jobSecurity: 'Medium',
        growth: 'Good',
        skills: ['Business Acumen', 'Communication', 'Analytical Thinking'],
        pros: ['Shorter duration', 'Affordable', 'Diverse career options'],
        cons: ['Lower starting salary', 'Competitive market', 'Requires additional certifications']
      }
    };

    return comparisonData?.[pathwayId] || {
      duration: 'N/A',
      fees: 'N/A',
      salary: 'N/A',
      difficulty: 'N/A',
      jobSecurity: 'N/A',
      growth: 'N/A',
      skills: [],
      pros: [],
      cons: []
    };
  };

  const comparisonCategories = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'financial', label: 'Financial', icon: 'DollarSign' },
    { id: 'skills', label: 'Skills', icon: 'Brain' },
    { id: 'proscons', label: 'Pros & Cons', icon: 'Scale' }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'very high': return 'text-error';
      case 'high': return 'text-warning';
      case 'medium': return 'text-primary';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getGrowthColor = (growth) => {
    switch (growth?.toLowerCase()) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-primary';
      case 'average': return 'text-warning';
      case 'poor': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const renderOverviewComparison = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left p-3 text-sm font-semibold text-foreground">Criteria</th>
            {comparedPathways?.map((pathway) => (
              <th key={pathway?.id} className="text-left p-3 text-sm font-semibold text-foreground min-w-32">
                {pathway?.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border hover:bg-muted/20">
            <td className="p-3 text-sm font-medium text-muted-foreground">Duration</td>
            {comparedPathways?.map((pathway) => (
              <td key={pathway?.id} className="p-3 text-sm text-foreground">
                {getPathwayComparisonData(pathway?.id)?.duration}
              </td>
            ))}
          </tr>
          <tr className="border-b border-border hover:bg-muted/20">
            <td className="p-3 text-sm font-medium text-muted-foreground">Difficulty Level</td>
            {comparedPathways?.map((pathway) => {
              const data = getPathwayComparisonData(pathway?.id);
              return (
                <td key={pathway?.id} className="p-3 text-sm">
                  <span className={`font-medium ${getDifficultyColor(data?.difficulty)}`}>
                    {data?.difficulty}
                  </span>
                </td>
              );
            })}
          </tr>
          <tr className="border-b border-border hover:bg-muted/20">
            <td className="p-3 text-sm font-medium text-muted-foreground">Job Security</td>
            {comparedPathways?.map((pathway) => (
              <td key={pathway?.id} className="p-3 text-sm text-foreground">
                {getPathwayComparisonData(pathway?.id)?.jobSecurity}
              </td>
            ))}
          </tr>
          <tr className="border-b border-border hover:bg-muted/20">
            <td className="p-3 text-sm font-medium text-muted-foreground">Growth Potential</td>
            {comparedPathways?.map((pathway) => {
              const data = getPathwayComparisonData(pathway?.id);
              return (
                <td key={pathway?.id} className="p-3 text-sm">
                  <span className={`font-medium ${getGrowthColor(data?.growth)}`}>
                    {data?.growth}
                  </span>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderFinancialComparison = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gradient-to-r from-accent/5 to-warning/5 rounded-lg border border-accent/10">
          <h4 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
            <Icon name="CreditCard" size={16} />
            <span>Education Investment</span>
          </h4>
          <div className="space-y-3">
            {comparedPathways?.map((pathway) => (
              <div key={pathway?.id} className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{pathway?.name}</span>
                <span className="text-sm font-medium text-foreground">
                  {getPathwayComparisonData(pathway?.id)?.fees}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-success/5 to-primary/5 rounded-lg border border-success/10">
          <h4 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} />
            <span>Earning Potential</span>
          </h4>
          <div className="space-y-3">
            {comparedPathways?.map((pathway) => (
              <div key={pathway?.id} className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{pathway?.name}</span>
                <span className="text-sm font-medium text-success">
                  {getPathwayComparisonData(pathway?.id)?.salary}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROI Calculation */}
      <div className="p-4 bg-muted/20 rounded-lg">
        <h4 className="font-semibold text-foreground mb-3">Return on Investment (ROI) Analysis</h4>
        <p className="text-sm text-muted-foreground mb-3">
          Based on average fees and starting salaries, here's the estimated payback period:
        </p>
        <div className="space-y-2">
          {comparedPathways?.map((pathway) => {
            const data = getPathwayComparisonData(pathway?.id);
            // Simple ROI calculation (mock)
            const avgFees = pathway?.id === 'engineering' ? 8 : pathway?.id === 'medical' ? 15 : 1.5;
            const avgSalary = pathway?.id === 'engineering' ? 14 : pathway?.id === 'medical' ? 28 : 7.5;
            const paybackYears = Math.round(avgFees / avgSalary * 10) / 10;
            
            return (
              <div key={pathway?.id} className="flex justify-between items-center p-2 bg-card rounded">
                <span className="text-sm text-foreground">{pathway?.name}</span>
                <span className="text-sm font-medium text-primary">~{paybackYears} years</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderSkillsComparison = () => (
    <div className="space-y-6">
      {comparedPathways?.map((pathway) => {
        const data = getPathwayComparisonData(pathway?.id);
        return (
          <div key={pathway?.id} className="p-4 border border-border rounded-lg">
            <h4 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
              <Icon name="Target" size={16} color="var(--color-primary)" />
              <span>{pathway?.name}</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {data?.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderProsConsComparison = () => (
    <div className="space-y-6">
      {comparedPathways?.map((pathway) => {
        const data = getPathwayComparisonData(pathway?.id);
        return (
          <div key={pathway?.id} className="p-4 border border-border rounded-lg">
            <h4 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
              <Icon name="Scale" size={16} color="var(--color-primary)" />
              <span>{pathway?.name}</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-semibold text-success mb-2 flex items-center space-x-1">
                  <Icon name="Plus" size={14} />
                  <span>Advantages</span>
                </h5>
                <ul className="space-y-1">
                  {data?.pros?.map((pro, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                      <Icon name="Check" size={12} color="var(--color-success)" className="mt-0.5 flex-shrink-0" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="text-sm font-semibold text-error mb-2 flex items-center space-x-1">
                  <Icon name="Minus" size={14} />
                  <span>Challenges</span>
                </h5>
                <ul className="space-y-1">
                  {data?.cons?.map((con, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                      <Icon name="X" size={12} color="var(--color-error)" className="mt-0.5 flex-shrink-0" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderComparisonContent = () => {
    switch (activeComparison) {
      case 'financial': return renderFinancialComparison();
      case 'skills': return renderSkillsComparison();
      case 'proscons': return renderProsConsComparison();
      default: return renderOverviewComparison();
    }
  };

  if (!isVisible || comparedPathways?.length === 0) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-lg card-shadow">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="GitCompare" size={20} color="var(--color-primary)" />
          <div>
            <h3 className="font-semibold text-foreground">Pathway Comparison</h3>
            <p className="text-sm text-muted-foreground">
              Comparing {comparedPathways?.length} pathway{comparedPathways?.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearComparison}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleVisibility}
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      </div>
      {/* Compared Pathways */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-wrap gap-2">
          {comparedPathways?.map((pathway) => (
            <div
              key={pathway?.id}
              className="flex items-center space-x-2 px-3 py-2 bg-primary/10 text-primary rounded-lg border border-primary/20"
            >
              <span className="text-sm font-medium">{pathway?.name}</span>
              <button
                onClick={() => onRemoveFromComparison(pathway?.id)}
                className="hover:bg-primary/20 rounded p-0.5 transition-colors"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Comparison Tabs */}
      <div className="flex border-b border-border overflow-x-auto">
        {comparisonCategories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => setActiveComparison(category?.id)}
            className={`
              flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap
              ${activeComparison === category?.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }
            `}
          >
            <Icon name={category?.icon} size={16} />
            <span>{category?.label}</span>
          </button>
        ))}
      </div>
      {/* Comparison Content */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {renderComparisonContent()}
      </div>
    </div>
  );
};

export default ComparisonPanel;
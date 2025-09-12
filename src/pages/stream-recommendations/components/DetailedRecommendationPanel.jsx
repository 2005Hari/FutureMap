import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DetailedRecommendationPanel = ({ stream, onClose, onProceedToCourses }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!stream) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'subjects', label: 'Subject Combinations', icon: 'BookOpen' },
    { id: 'careers', label: 'Career Outcomes', icon: 'Briefcase' },
    { id: 'timeline', label: 'Success Timeline', icon: 'Clock' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Target" size={20} color="var(--color-primary)" />
            <h4 className="font-semibold text-foreground">Compatibility Score</h4>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex-1 bg-muted rounded-full h-2">
              <div
                className="h-full bg-gradient-to-r from-primary to-success rounded-full transition-all duration-300"
                style={{ width: `${stream?.compatibility}%` }}
              />
            </div>
            <span className="text-lg font-bold text-primary">{stream?.compatibility}%</span>
          </div>
        </div>

        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Users" size={20} color="var(--color-secondary)" />
            <h4 className="font-semibold text-foreground">Popularity</h4>
          </div>
          <p className="text-sm text-muted-foreground">
            {stream?.popularity}% of students with similar profiles choose this stream
          </p>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-foreground mb-3">Detailed Analysis</h4>
        <p className="text-muted-foreground leading-relaxed">
          {stream?.detailedAnalysis}
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-foreground mb-3">Prerequisites</h4>
        <ul className="space-y-2">
          {stream?.prerequisites?.map((prereq, index) => (
            <li key={index} className="flex items-start space-x-2">
              <Icon name="CheckCircle" size={16} color="var(--color-success)" className="mt-0.5" />
              <span className="text-sm text-muted-foreground">{prereq}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderSubjects = () => (
    <div className="space-y-6">
      {stream?.subjectCombinations?.map((combination, index) => (
        <div key={index} className="p-4 border border-border rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-foreground">{combination?.name}</h4>
            <span className={`
              px-2 py-1 text-xs rounded-full
              ${combination?.difficulty === 'Easy' ? 'bg-success/10 text-success' :
                combination?.difficulty === 'Medium'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'}
            `}>
              {combination?.difficulty}
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
            {combination?.subjects?.map((subject, subIndex) => (
              <div key={subIndex} className="flex items-center space-x-2 p-2 bg-muted/50 rounded">
                <Icon name="Book" size={14} color="var(--color-primary)" />
                <span className="text-sm text-foreground">{subject}</span>
              </div>
            ))}
          </div>
          
          <p className="text-sm text-muted-foreground">
            {combination?.description}
          </p>
        </div>
      ))}
    </div>
  );

  const renderCareers = () => (
    <div className="space-y-4">
      {stream?.careerOutcomes?.map((career, index) => (
        <div key={index} className="p-4 border border-border rounded-lg hover:border-primary/30 transition-colors">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-semibold text-foreground">{career?.title}</h4>
            <span className="text-sm font-medium text-success">₹{career?.salaryRange}</span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">{career?.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {career?.skills?.map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderTimeline = () => (
    <div className="space-y-6">
      {stream?.successTimeline?.map((phase, index) => (
        <div key={index} className="flex items-start space-x-4">
          <div className="flex flex-col items-center">
            <div className={`
              flex items-center justify-center w-10 h-10 rounded-full
              ${index === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
            `}>
              <span className="text-sm font-semibold">{index + 1}</span>
            </div>
            {index < stream?.successTimeline?.length - 1 && (
              <div className="w-0.5 h-12 bg-muted mt-2" />
            )}
          </div>
          
          <div className="flex-1 pb-6">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-semibold text-foreground">{phase?.phase}</h4>
              <span className="text-sm text-muted-foreground">({phase?.duration})</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{phase?.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {phase?.milestones?.map((milestone, mIndex) => (
                <span
                  key={mIndex}
                  className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded"
                >
                  {milestone}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-4xl max-h-[90vh] bg-card rounded-lg modal-shadow overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className={`
              flex items-center justify-center w-12 h-12 rounded-lg
              ${stream?.bgColor} ${stream?.iconColor}
            `}>
              <Icon name={stream?.icon} size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{stream?.name}</h2>
              <p className="text-sm text-muted-foreground">Detailed Recommendation</p>
            </div>
          </div>
          
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`
                flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors
                ${activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
                }
              `}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'subjects' && renderSubjects()}
          {activeTab === 'careers' && renderCareers()}
          {activeTab === 'timeline' && renderTimeline()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/20">
          <div className="flex items-center space-x-2">
            <Icon name="Lightbulb" size={16} color="var(--color-accent)" />
            <span className="text-sm text-muted-foreground">
              Ready to explore courses in this stream?
            </span>
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button 
              variant="default" 
              onClick={() => onProceedToCourses(stream)}
              iconName="ArrowRight"
              iconPosition="right"
            >
              Explore Courses
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedRecommendationPanel;
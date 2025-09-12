import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CareerPathwayVisualization = ({ 
  program, 
  isOpen, 
  onClose,
  className = ""
}) => {
  const [selectedPath, setSelectedPath] = useState(null);

  if (!isOpen || !program) return null;

  // Mock career pathway data
  const careerPaths = [
    {
      id: 'technical',
      title: 'Technical Track',
      description: 'Focus on technical expertise and specialization',
      color: 'primary',
      timeline: [
        {
          year: '0-2',
          role: 'Junior Developer/Engineer',
          skills: ['Programming', 'Problem Solving', 'Team Collaboration'],
          salary: '₹3-6 LPA'
        },
        {
          year: '2-5',
          role: 'Senior Developer/Engineer',
          skills: ['Advanced Programming', 'System Design', 'Mentoring'],
          salary: '₹6-15 LPA'
        },
        {
          year: '5-8',
          role: 'Tech Lead/Architect',
          skills: ['Architecture Design', 'Team Leadership', 'Strategic Planning'],
          salary: '₹15-30 LPA'
        },
        {
          year: '8+',
          role: 'Principal Engineer/CTO',
          skills: ['Technology Strategy', 'Innovation', 'Business Alignment'],
          salary: '₹30+ LPA'
        }
      ]
    },
    {
      id: 'management',
      title: 'Management Track',
      description: 'Leadership and business management focus',
      color: 'secondary',
      timeline: [
        {
          year: '0-2',
          role: 'Associate/Analyst',
          skills: ['Business Analysis', 'Communication', 'Project Management'],
          salary: '₹4-7 LPA'
        },
        {
          year: '2-5',
          role: 'Manager/Team Lead',
          skills: ['Team Management', 'Strategic Thinking', 'Stakeholder Management'],
          salary: '₹8-18 LPA'
        },
        {
          year: '5-8',
          role: 'Senior Manager/Director',
          skills: ['Business Strategy', 'P&L Management', 'Cross-functional Leadership'],
          salary: '₹18-40 LPA'
        },
        {
          year: '8+',
          role: 'VP/General Manager',
          skills: ['Organizational Leadership', 'Vision Setting', 'Market Strategy'],
          salary: '₹40+ LPA'
        }
      ]
    },
    {
      id: 'entrepreneurship',
      title: 'Entrepreneurship Track',
      description: 'Start your own venture or business',
      color: 'accent',
      timeline: [
        {
          year: '0-2',
          role: 'Founder/Co-founder',
          skills: ['Business Planning', 'Product Development', 'Fundraising'],
          salary: 'Variable'
        },
        {
          year: '2-5',
          role: 'CEO/Business Owner',
          skills: ['Market Expansion', 'Team Building', 'Investor Relations'],
          salary: 'Equity Based'
        },
        {
          year: '5-8',
          role: 'Serial Entrepreneur',
          skills: ['Portfolio Management', 'Mentoring', 'Angel Investing'],
          salary: 'Portfolio Returns'
        },
        {
          year: '8+',
          role: 'Industry Leader/Investor',
          skills: ['Industry Expertise', 'Investment Strategy', 'Thought Leadership'],
          salary: 'Investment Returns'
        }
      ]
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-primary/10',
          border: 'border-primary/20',
          text: 'text-primary',
          dot: 'bg-primary'
        };
      case 'secondary':
        return {
          bg: 'bg-secondary/10',
          border: 'border-secondary/20',
          text: 'text-secondary',
          dot: 'bg-secondary'
        };
      case 'accent':
        return {
          bg: 'bg-accent/10',
          border: 'border-accent/20',
          text: 'text-accent',
          dot: 'bg-accent'
        };
      default:
        return {
          bg: 'bg-muted',
          border: 'border-border',
          text: 'text-foreground',
          dot: 'bg-muted-foreground'
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card border border-border rounded-lg modal-shadow w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-1">
              Career Pathways for {program?.name}
            </h2>
            <p className="text-muted-foreground">
              Explore different career trajectories and growth opportunities
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[75vh]">
          {/* Path Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {careerPaths?.map((path) => {
              const colors = getColorClasses(path?.color);
              const isSelected = selectedPath === path?.id;
              
              return (
                <button
                  key={path?.id}
                  onClick={() => setSelectedPath(path?.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all duration-200 hover-scale ${
                    isSelected 
                      ? `${colors?.border} ${colors?.bg}` 
                      : 'border-border bg-card hover:border-primary/20'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-3 h-3 rounded-full ${colors?.dot}`} />
                    <h3 className={`font-semibold ${isSelected ? colors?.text : 'text-foreground'}`}>
                      {path?.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {path?.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Timeline Visualization */}
          {selectedPath && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-6">
                <Icon name="Route" size={20} color="var(--color-primary)" />
                <h3 className="text-lg font-semibold text-foreground">
                  {careerPaths?.find(p => p?.id === selectedPath)?.title} Timeline
                </h3>
              </div>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

                {/* Timeline Items */}
                <div className="space-y-8">
                  {careerPaths?.find(p => p?.id === selectedPath)?.timeline?.map((item, index) => {
                    const colors = getColorClasses(careerPaths?.find(p => p?.id === selectedPath)?.color);
                    
                    return (
                      <div key={index} className="relative flex items-start space-x-6">
                        {/* Timeline Dot */}
                        <div className={`w-4 h-4 rounded-full ${colors?.dot} border-4 border-card relative z-10`} />
                        {/* Content */}
                        <div className="flex-1 pb-8">
                          <div className="bg-card border border-border rounded-lg p-4 card-shadow">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <span className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                                  {item?.year} Years
                                </span>
                                <span className="text-sm font-medium text-success">
                                  {item?.salary}
                                </span>
                              </div>
                            </div>
                            
                            <h4 className="font-semibold text-foreground mb-2">
                              {item?.role}
                            </h4>
                            
                            <div className="space-y-3">
                              <div>
                                <h5 className="text-sm font-medium text-foreground mb-2">
                                  Key Skills Required:
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                  {item?.skills?.map((skill, skillIndex) => (
                                    <span
                                      key={skillIndex}
                                      className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Default State */}
          {!selectedPath && (
            <div className="text-center py-12">
              <Icon name="Route" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">
                Select a Career Path
              </h3>
              <p className="text-muted-foreground">
                Choose a career track above to visualize your potential growth journey
              </p>
            </div>
          )}

          {/* Additional Information */}
          {selectedPath && (
            <div className="mt-8 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="Lightbulb" size={20} color="var(--color-accent)" />
                <div>
                  <h4 className="font-medium text-foreground mb-2">Pro Tips</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Build relevant skills early through internships and projects</li>
                    <li>• Network with professionals in your chosen track</li>
                    <li>• Consider additional certifications to accelerate growth</li>
                    <li>• Stay updated with industry trends and technologies</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <div className="text-sm text-muted-foreground">
            Career pathways are indicative and may vary based on individual performance and market conditions
          </div>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CareerPathwayVisualization;
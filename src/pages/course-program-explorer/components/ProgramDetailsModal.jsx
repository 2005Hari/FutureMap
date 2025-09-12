import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProgramDetailsModal = ({ 
  program, 
  isOpen, 
  onClose, 
  onBookmark, 
  onCompare,
  isBookmarked = false,
  isCompared = false 
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !program) return null;

  const formatFees = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    })?.format(amount);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'curriculum', label: 'Curriculum', icon: 'BookOpen' },
    { id: 'admission', label: 'Admission', icon: 'FileText' },
    { id: 'placement', label: 'Placement', icon: 'TrendingUp' },
    { id: 'alumni', label: 'Alumni', icon: 'Users' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3">Program Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {program?.description}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-foreground mb-3">Key Details</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium">{program?.duration} Years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mode:</span>
                    <span className="font-medium">{program?.mode || 'Full-time'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Eligibility:</span>
                    <span className="font-medium">{program?.eligibility}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Seats:</span>
                    <span className="font-medium">{program?.seats || 'N/A'}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground mb-3">Fee Structure</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Annual Fees:</span>
                    <span className="font-medium">{formatFees(program?.fees)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Fees:</span>
                    <span className="font-medium">{formatFees(program?.fees * program?.duration)}</span>
                  </div>
                  {program?.scholarshipAvailable && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Scholarship:</span>
                      <span className="font-medium text-success">Available</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3">Key Highlights</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {program?.highlights?.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-muted rounded-lg">
                    <Icon name="Check" size={16} color="var(--color-success)" />
                    <span className="text-sm text-muted-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'curriculum':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Course Structure</h3>
              <div className="space-y-4">
                {program?.curriculum?.map((year, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <h4 className="font-medium text-foreground mb-2">Year {year?.year}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {year?.subjects?.map((subject, subIndex) => (
                        <div key={subIndex} className="flex items-center space-x-2">
                          <Icon name="BookOpen" size={14} color="var(--color-primary)" />
                          <span className="text-sm text-muted-foreground">{subject}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )) || (
                  <p className="text-muted-foreground">Curriculum details will be updated soon.</p>
                )}
              </div>
            </div>
          </div>
        );

      case 'admission':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Admission Requirements</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Eligibility Criteria</h4>
                  <ul className="space-y-1">
                    {program?.admissionRequirements?.eligibility?.map((req, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Icon name="ChevronRight" size={14} color="var(--color-primary)" className="mt-0.5" />
                        <span className="text-sm text-muted-foreground">{req}</span>
                      </li>
                    )) || (
                      <li className="text-muted-foreground">Standard eligibility criteria apply</li>
                    )}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Application Process</h4>
                  <div className="space-y-3">
                    {program?.admissionRequirements?.process?.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex items-center justify-center w-6 h-6 bg-primary text-primary-foreground rounded-full text-xs font-medium">
                          {index + 1}
                        </div>
                        <span className="text-sm text-muted-foreground">{step}</span>
                      </div>
                    )) || (
                      <p className="text-muted-foreground">Application process details will be updated soon.</p>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">Important Dates</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Icon name="Calendar" size={16} color="var(--color-primary)" />
                        <span className="text-sm font-medium">Application Start</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {program?.applicationDates?.start || 'To be announced'}
                      </span>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Icon name="Calendar" size={16} color="var(--color-accent)" />
                        <span className="text-sm font-medium">Application End</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {program?.applicationDates?.end || 'To be announced'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'placement':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-success/5 border border-success/10 rounded-lg text-center">
                <div className="text-2xl font-bold text-success mb-1">
                  {program?.placementRate || 85}%
                </div>
                <div className="text-sm text-muted-foreground">Placement Rate</div>
              </div>
              <div className="p-4 bg-primary/5 border border-primary/10 rounded-lg text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {formatFees(program?.averagePackage || 600000)}
                </div>
                <div className="text-sm text-muted-foreground">Average Package</div>
              </div>
              <div className="p-4 bg-accent/5 border border-accent/10 rounded-lg text-center">
                <div className="text-2xl font-bold text-accent mb-1">
                  {formatFees(program?.highestPackage || 1200000)}
                </div>
                <div className="text-sm text-muted-foreground">Highest Package</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3">Top Recruiters</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(program?.topRecruiters || ['TCS', 'Infosys', 'Wipro', 'Accenture', 'IBM', 'Microsoft', 'Google', 'Amazon'])?.map((recruiter, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg text-center">
                    <span className="text-sm font-medium text-foreground">{recruiter}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'alumni':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Notable Alumni</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(program?.notableAlumni || [
                  { name: 'Rajesh Kumar', position: 'Senior Software Engineer at Google', batch: '2018' },
                  { name: 'Priya Sharma', position: 'Product Manager at Microsoft', batch: '2017' },
                  { name: 'Amit Singh', position: 'Data Scientist at Amazon', batch: '2019' },
                  { name: 'Sneha Patel', position: 'UX Designer at Adobe', batch: '2020' }
                ])?.map((alumni, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <h4 className="font-medium text-foreground">{alumni?.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{alumni?.position}</p>
                    <p className="text-xs text-muted-foreground mt-2">Batch of {alumni?.batch}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3">Alumni Network</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-muted rounded-lg text-center">
                  <div className="text-xl font-bold text-foreground mb-1">5000+</div>
                  <div className="text-sm text-muted-foreground">Total Alumni</div>
                </div>
                <div className="p-3 bg-muted rounded-lg text-center">
                  <div className="text-xl font-bold text-foreground mb-1">50+</div>
                  <div className="text-sm text-muted-foreground">Countries</div>
                </div>
                <div className="p-3 bg-muted rounded-lg text-center">
                  <div className="text-xl font-bold text-foreground mb-1">200+</div>
                  <div className="text-sm text-muted-foreground">Companies</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card border border-border rounded-lg modal-shadow w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 overflow-hidden rounded-lg">
              <Image
                src={program?.image}
                alt={program?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-1">{program?.name}</h2>
              <p className="text-muted-foreground">{program?.institution}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded-full">
                  {program?.category}
                </span>
                <span className="text-sm text-muted-foreground">
                  {program?.duration} Years • {formatFees(program?.fees)}/year
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onBookmark(program?.id)}
              className={isBookmarked ? 'text-accent' : 'text-muted-foreground'}
            >
              <Icon name={isBookmarked ? "Bookmark" : "BookmarkPlus"} size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onCompare(program?.id)}
              className={isCompared ? 'text-primary' : 'text-muted-foreground'}
            >
              <Icon name="GitCompare" size={20} />
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex overflow-x-auto">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {renderTabContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <div className="flex items-center space-x-4">
            {program?.applicationLink && (
              <Button
                variant="default"
                onClick={() => window.open(program?.applicationLink, '_blank')}
              >
                <Icon name="ExternalLink" size={16} className="mr-2" />
                Apply Now
              </Button>
            )}
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date()?.toLocaleDateString('en-IN')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDetailsModal;
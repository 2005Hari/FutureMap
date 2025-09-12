import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const PathwayDetailsPanel = ({ selectedPathway, onBookmark, isBookmarked = false }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!selectedPathway) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/20 rounded-lg border-2 border-dashed border-border">
        <div className="text-center space-y-3">
          <Icon name="MousePointer2" size={48} color="var(--color-muted-foreground)" />
          <div>
            <h3 className="font-semibold text-foreground mb-1">Select a Pathway</h3>
            <p className="text-sm text-muted-foreground">
              Click on any node in the visualization to view detailed information
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Mock detailed pathway data
  const pathwayDetails = {
    'engineering': {
      title: 'Bachelor of Technology (B.Tech)',
      description: `Engineering is a broad field that applies scientific and mathematical principles to design, build, and maintain structures, machines, systems, and processes. It offers diverse specializations and excellent career prospects in the modern technology-driven world.`,
      duration: '4 years',
      eligibility: 'Class 12 with Physics, Chemistry, Mathematics (PCM)',
      averageFees: '₹2-15 LPA',
      averageSalary: '₹4-25 LPA',
      topColleges: ['IIT Delhi', 'IIT Bombay', 'IIT Madras', 'NIT Trichy', 'BITS Pilani'],
      skills: ['Problem Solving', 'Mathematical Aptitude', 'Analytical Thinking', 'Technical Skills', 'Innovation'],
      careerOptions: ['Software Engineer', 'Data Scientist', 'Product Manager', 'Research Engineer', 'Entrepreneur'],
      successStories: [
        {
          name: 'Priya Sharma',
          role: 'Senior Software Engineer at Google',
          story: 'Started with B.Tech in Computer Science, now leading AI projects at Google with 8+ years experience.',
          image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
        },
        {
          name: 'Rahul Gupta',
          role: 'Founder of TechStart',
          story: 'B.Tech graduate who founded a successful startup, now valued at ₹50 crores.',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
        }
      ],
      timeline: [
        { year: 'Year 1-2', milestone: 'Foundation Courses', description: 'Mathematics, Physics, Chemistry, Basic Engineering' },
        { year: 'Year 3', milestone: 'Specialization', description: 'Choose your engineering branch and core subjects' },
        { year: 'Year 4', milestone: 'Industry Exposure', description: 'Internships, projects, and placement preparation' }
      ]
    },
    'medical': {
      title: 'Bachelor of Medicine (MBBS)',
      description: `Medicine is a noble profession focused on diagnosing, treating, and preventing diseases. It requires dedication, empathy, and continuous learning to serve humanity and make a meaningful impact on people's lives.`,duration: '5.5 years + 1 year internship',eligibility: 'Class 12 with Physics, Chemistry, Biology (PCB) + NEET',averageFees: '₹5-25 LPA',averageSalary: '₹6-50 LPA',
      topColleges: ['AIIMS Delhi', 'CMC Vellore', 'JIPMER', 'KGMU', 'MAMC'],
      skills: ['Empathy', 'Communication', 'Problem Solving', 'Attention to Detail', 'Stress Management'],
      careerOptions: ['General Physician', 'Specialist Doctor', 'Surgeon', 'Medical Researcher', 'Healthcare Administrator'],
      successStories: [
        {
          name: 'Dr. Anita Patel',role: 'Cardiologist at Apollo Hospital',story: 'MBBS graduate specializing in cardiology, now saving lives and mentoring young doctors.',image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
        }
      ],
      timeline: [
        { year: 'Year 1-2', milestone: 'Pre-clinical', description: 'Anatomy, Physiology, Biochemistry fundamentals' },
        { year: 'Year 3-4', milestone: 'Clinical', description: 'Patient interaction, clinical skills, specialization exposure' },
        { year: 'Year 5-6', milestone: 'Internship', description: 'Hands-on experience in hospitals and clinics' }
      ]
    },
    'bcom': {
      title: 'Bachelor of Commerce (B.Com)',
      description: `Commerce education provides comprehensive knowledge of business, finance, and economics. It opens doors to diverse career opportunities in corporate sector, banking, finance, and entrepreneurship.`,
      duration: '3 years',eligibility: 'Class 12 in any stream (Commerce preferred)',averageFees: '₹50,000-3 LPA',averageSalary: '₹3-12 LPA',
      topColleges: ['SRCC Delhi', 'LSR Delhi', 'Christ University', 'Loyola Chennai', 'NMIMS Mumbai'],
      skills: ['Numerical Aptitude', 'Communication', 'Analytical Thinking', 'Business Acumen', 'Leadership'],
      careerOptions: ['Chartered Accountant', 'Financial Analyst', 'Business Analyst', 'Banking Professional', 'Entrepreneur'],
      successStories: [
        {
          name: 'Vikram Singh',role: 'CFO at Reliance Industries',story: 'B.Com graduate who climbed the corporate ladder to become CFO of a Fortune 500 company.',image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        }
      ],
      timeline: [
        { year: 'Year 1', milestone: 'Foundation', description: 'Accounting, Economics, Business Studies basics' },
        { year: 'Year 2', milestone: 'Specialization', description: 'Choose specialization: Finance, Marketing, HR' },
        { year: 'Year 3', milestone: 'Industry Readiness', description: 'Internships, certifications, placement preparation' }
      ]
    }
  };

  const details = pathwayDetails?.[selectedPathway?.id] || {
    title: selectedPathway?.name,
    description: 'Detailed information about this pathway will be available soon.',
    duration: 'Variable',
    eligibility: 'To be determined',
    averageFees: 'Contact for details',
    averageSalary: 'Market dependent',
    topColleges: [],
    skills: [],
    careerOptions: [],
    successStories: [],
    timeline: []
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'requirements', label: 'Requirements', icon: 'CheckSquare' },
    { id: 'timeline', label: 'Timeline', icon: 'Calendar' },
    { id: 'success', label: 'Success Stories', icon: 'Users' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-3">About This Pathway</h3>
        <p className="text-muted-foreground leading-relaxed">{details?.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} color="var(--color-primary)" />
            <span className="text-sm font-medium text-foreground">Duration</span>
          </div>
          <p className="text-sm text-muted-foreground">{details?.duration}</p>
        </div>
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="DollarSign" size={16} color="var(--color-secondary)" />
            <span className="text-sm font-medium text-foreground">Average Salary</span>
          </div>
          <p className="text-sm text-muted-foreground">{details?.averageSalary}</p>
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-foreground mb-3">Key Skills Required</h4>
        <div className="flex flex-wrap gap-2">
          {details?.skills?.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-foreground mb-3">Career Opportunities</h4>
        <div className="grid grid-cols-1 gap-2">
          {details?.careerOptions?.map((career, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded">
              <Icon name="ArrowRight" size={14} color="var(--color-accent)" />
              <span className="text-sm text-muted-foreground">{career}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRequirements = () => (
    <div className="space-y-6">
      <div className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
        <h4 className="font-semibold text-foreground mb-2 flex items-center space-x-2">
          <Icon name="GraduationCap" size={16} />
          <span>Eligibility Criteria</span>
        </h4>
        <p className="text-sm text-muted-foreground">{details?.eligibility}</p>
      </div>

      <div className="p-4 bg-gradient-to-r from-accent/5 to-warning/5 rounded-lg border border-accent/10">
        <h4 className="font-semibold text-foreground mb-2 flex items-center space-x-2">
          <Icon name="CreditCard" size={16} />
          <span>Investment Required</span>
        </h4>
        <p className="text-sm text-muted-foreground">{details?.averageFees}</p>
      </div>

      <div>
        <h4 className="font-semibold text-foreground mb-3">Top Institutions</h4>
        <div className="space-y-2">
          {details?.topColleges?.map((college, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                <span className="text-sm font-semibold text-primary">{index + 1}</span>
              </div>
              <span className="text-sm text-foreground">{college}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTimeline = () => (
    <div className="space-y-4">
      {details?.timeline?.map((phase, index) => (
        <div key={index} className="flex space-x-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full">
              <span className="text-sm font-semibold text-primary-foreground">{index + 1}</span>
            </div>
            {index < details?.timeline?.length - 1 && (
              <div className="w-0.5 h-16 bg-border mt-2"></div>
            )}
          </div>
          <div className="flex-1 pb-8">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className="font-semibold text-foreground">{phase?.milestone}</h4>
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">{phase?.year}</span>
            </div>
            <p className="text-sm text-muted-foreground">{phase?.description}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSuccessStories = () => (
    <div className="space-y-6">
      {details?.successStories?.map((story, index) => (
        <div key={index} className="p-4 border border-border rounded-lg hover:border-primary/20 transition-colors">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={story?.image}
                alt={story?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground">{story?.name}</h4>
              <p className="text-sm text-primary mb-2">{story?.role}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{story?.story}</p>
            </div>
          </div>
        </div>
      ))}
      
      {details?.successStories?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Users" size={48} color="var(--color-muted-foreground)" />
          <p className="text-muted-foreground mt-2">Success stories will be added soon</p>
        </div>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'requirements': return renderRequirements();
      case 'timeline': return renderTimeline();
      case 'success': return renderSuccessStories();
      default: return renderOverview();
    }
  };

  return (
    <div className="h-full flex flex-col bg-card border border-border rounded-lg card-shadow">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Target" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">{details?.title}</h2>
            <p className="text-sm text-muted-foreground">Pathway Details</p>
          </div>
        </div>
        <Button
          variant={isBookmarked ? 'default' : 'outline'}
          size="sm"
          onClick={() => onBookmark(selectedPathway)}
          iconName={isBookmarked ? 'BookmarkCheck' : 'Bookmark'}
          iconPosition="left"
        >
          {isBookmarked ? 'Saved' : 'Save'}
        </Button>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`
              flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-colors
              ${activeTab === tab?.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }
            `}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default PathwayDetailsPanel;
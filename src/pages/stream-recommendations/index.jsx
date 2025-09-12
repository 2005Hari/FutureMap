import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import RecommendationStatusIndicator from '../../components/ui/RecommendationStatusIndicator';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Component imports
import StreamCard from './components/StreamCard';
import DetailedRecommendationPanel from './components/DetailedRecommendationPanel';
import ComparisonPanel from './components/ComparisonPanel';
import FilterSortControls from './components/FilterSortControls';
import MotivationalMessage from './components/MotivationalMessage';
import NEPFlexibilityIndicator from './components/NEPFlexibilityIndicator';

const StreamRecommendations = () => {
  const navigate = useNavigate();
  const [selectedStream, setSelectedStream] = useState(null);
  const [comparisonStreams, setComparisonStreams] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [filters, setFilters] = useState({
    interestLevel: 'all',
    difficulty: 'all',
    careerProspects: 'all'
  });
  const [sortBy, setSortBy] = useState('compatibility');

  // Mock data for stream recommendations
  const streamRecommendations = [
    {
      id: 'science',
      name: 'Science Stream',
      icon: 'Atom',
      bgColor: 'bg-primary/10',
      iconColor: 'text-primary',
      compatibility: 92,
      popularity: 78,
      description: 'Perfect for analytical minds who love problem-solving and research',
      keySubjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
      careerPotential: 'Engineering, Medicine, Research, Technology sectors with high growth potential',
      alignmentReason: 'Your strong analytical skills and interest in logical problem-solving make this an excellent fit',
      difficulty: 'Hard',
      careerProspects: 'Excellent',
      marketDemand: 5,
      averageSalary: '8-15 LPA',
      detailedAnalysis: `Based on your aptitude assessment, you demonstrate exceptional logical reasoning and mathematical abilities. Your interest in understanding how things work and solving complex problems aligns perfectly with the Science stream. This path offers diverse opportunities in cutting-edge fields like biotechnology, artificial intelligence, and space research.`,
      prerequisites: [
        'Strong foundation in Mathematics and Science',
        'Analytical and logical thinking abilities',
        'Interest in research and experimentation',
        'Patience for detailed study and practice'
      ],
      subjectCombinations: [
        {
          name: 'PCM (Physics, Chemistry, Mathematics)',
          difficulty: 'Hard',
          subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Computer Science'],
          description: 'Ideal for engineering and technology careers'
        },
        {
          name: 'PCB (Physics, Chemistry, Biology)',
          difficulty: 'Hard',
          subjects: ['Physics', 'Chemistry', 'Biology', 'English', 'Mathematics'],
          description: 'Perfect pathway for medical and life sciences'
        },
        {
          name: 'PCMB (All Sciences)',
          difficulty: 'Very Hard',
          subjects: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'English'],
          description: 'Maximum flexibility for both engineering and medical fields'
        }
      ],
      careerOutcomes: [
        {
          title: 'Software Engineer',
          salaryRange: '6-20 LPA',
          description: 'Design and develop software applications and systems',
          skills: ['Programming', 'Problem Solving', 'System Design', 'Mathematics']
        },
        {
          title: 'Medical Doctor',
          salaryRange: '8-25 LPA',
          description: 'Diagnose and treat patients in various medical specializations',
          skills: ['Biology', 'Chemistry', 'Patient Care', 'Critical Thinking']
        },
        {
          title: 'Research Scientist',
          salaryRange: '5-15 LPA',
          description: 'Conduct research in specialized scientific fields',
          skills: ['Research Methods', 'Data Analysis', 'Scientific Writing', 'Innovation']
        }
      ],
      successTimeline: [
        {
          phase: 'Class 11-12',
          duration: '2 years',
          description: 'Build strong foundation in core science subjects',
          milestones: ['Board Exams', 'Entrance Prep', 'Lab Skills']
        },
        {
          phase: 'Undergraduate',
          duration: '3-4 years',
          description: 'Specialize in chosen field (Engineering/Medical/Pure Sciences)',
          milestones: ['Degree Completion', 'Internships', 'Projects']
        },
        {
          phase: 'Career Launch',
          duration: '1-2 years',
          description: 'Enter workforce or pursue higher studies',
          milestones: ['Job Placement', 'Professional Skills', 'Industry Experience']
        }
      ],
      pros: [
        'High earning potential',
        'Diverse career options',
        'Innovation opportunities',
        'Global job market'
      ],
      cons: [
        'Highly competitive',
        'Requires continuous learning',
        'Long study hours',
        'High academic pressure'
      ]
    },
    {
      id: 'commerce',
      name: 'Commerce Stream',
      icon: 'TrendingUp',
      bgColor: 'bg-secondary/10',
      iconColor: 'text-secondary',
      compatibility: 88,
      popularity: 65,
      description: 'Ideal for business-minded individuals with strong numerical skills',
      keySubjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics'],
      careerPotential: 'Business, Finance, Banking, Entrepreneurship with excellent growth prospects',
      alignmentReason: 'Your numerical aptitude and interest in business concepts make this a strong match',
      difficulty: 'Medium',
      careerProspects: 'Excellent',
      marketDemand: 4,
      averageSalary: '5-12 LPA',
      detailedAnalysis: `Your assessment reveals strong numerical skills and business acumen. You show interest in understanding market dynamics and financial concepts. The Commerce stream will help you develop analytical skills for business decision-making and provide pathways to leadership roles in various industries.`,
      prerequisites: [
        'Good numerical and analytical skills',
        'Interest in business and economics',
        'Communication and presentation abilities',
        'Understanding of basic mathematics'
      ],
      subjectCombinations: [
        {
          name: 'Commerce with Mathematics',
          difficulty: 'Medium',
          subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics', 'English'],
          description: 'Opens doors to engineering economics and technical management'
        },
        {
          name: 'Commerce without Mathematics',
          difficulty: 'Easy',
          subjects: ['Accountancy', 'Business Studies', 'Economics', 'Informatics Practices', 'English'],
          description: 'Focus on pure commerce and business applications'
        }
      ],
      careerOutcomes: [
        {
          title: 'Chartered Accountant',
          salaryRange: '8-20 LPA',
          description: 'Financial expert handling auditing, taxation, and advisory services',
          skills: ['Accounting', 'Taxation', 'Auditing', 'Financial Analysis']
        },
        {
          title: 'Investment Banker',
          salaryRange: '10-25 LPA',
          description: 'Facilitate corporate financing and investment decisions',
          skills: ['Financial Modeling', 'Market Analysis', 'Risk Assessment', 'Communication']
        },
        {
          title: 'Business Analyst',
          salaryRange: '6-15 LPA',
          description: 'Analyze business processes and recommend improvements',
          skills: ['Data Analysis', 'Process Improvement', 'Strategic Thinking', 'Technology']
        }
      ],
      successTimeline: [
        {
          phase: 'Class 11-12',
          duration: '2 years',
          description: 'Master commerce fundamentals and business concepts',
          milestones: ['Board Exams', 'Commerce Competitions', 'Internships']
        },
        {
          phase: 'Undergraduate',
          duration: '3 years',
          description: 'Specialize in chosen commerce field (BCom/BBA/Economics)',
          milestones: ['Degree Completion', 'Professional Courses', 'Industry Projects']
        },
        {
          phase: 'Professional Growth',
          duration: '2-3 years',
          description: 'Build expertise and advance in chosen career path',
          milestones: ['Professional Certification', 'Leadership Roles', 'Business Network']
        }
      ],
      pros: [
        'Entrepreneurship opportunities',
        'Diverse career paths',
        'Good work-life balance',
        'Strong job market'
      ],
      cons: [
        'Requires continuous skill updates',
        'Market-dependent opportunities',
        'Initial salary may be moderate',
        'High competition in top roles'
      ]
    },
    {
      id: 'arts',
      name: 'Arts Stream',
      icon: 'Palette',
      bgColor: 'bg-accent/10',
      iconColor: 'text-accent',
      compatibility: 85,
      popularity: 45,
      description: 'Perfect for creative minds with strong communication and analytical skills',
      keySubjects: ['History', 'Political Science', 'Psychology', 'English Literature'],
      careerPotential: 'Media, Civil Services, Psychology, Literature, Social Work with growing opportunities',
      alignmentReason: 'Your creative thinking and communication skills align well with humanities subjects',
      difficulty: 'Easy',
      careerProspects: 'Good',
      marketDemand: 3,
      averageSalary: '4-10 LPA',
      detailedAnalysis: `Your profile shows strong verbal reasoning and creative thinking abilities. You demonstrate interest in understanding human behavior and social dynamics. The Arts stream will nurture your analytical and communication skills while providing diverse career opportunities in emerging fields.`,
      prerequisites: [
        'Strong reading and writing skills',
        'Interest in human behavior and society',
        'Creative and analytical thinking',
        'Good communication abilities'
      ],
      subjectCombinations: [
        {
          name: 'Humanities Core',
          difficulty: 'Easy',
          subjects: ['History', 'Political Science', 'Psychology', 'English', 'Economics'],
          description: 'Comprehensive understanding of human society and behavior'
        },
        {
          name: 'Literature & Languages',
          difficulty: 'Medium',
          subjects: ['English Literature', 'Hindi Literature', 'Psychology', 'History', 'Philosophy'],
          description: 'Focus on language, literature, and philosophical thinking'
        }
      ],
      careerOutcomes: [
        {
          title: 'Civil Services Officer',
          salaryRange: '7-15 LPA',
          description: 'Serve in administrative roles in government departments',
          skills: ['Public Administration', 'Policy Analysis', 'Leadership', 'Communication']
        },
        {
          title: 'Clinical Psychologist',
          salaryRange: '5-12 LPA',
          description: 'Help individuals overcome mental health challenges',
          skills: ['Psychology', 'Counseling', 'Research', 'Empathy']
        },
        {
          title: 'Content Writer/Journalist',
          salaryRange: '3-8 LPA',
          description: 'Create engaging content for various media platforms',
          skills: ['Writing', 'Research', 'Communication', 'Digital Marketing']
        }
      ],
      successTimeline: [
        {
          phase: 'Class 11-12',
          duration: '2 years',
          description: 'Develop strong foundation in humanities subjects',
          milestones: ['Board Exams', 'Essay Competitions', 'Social Projects']
        },
        {
          phase: 'Undergraduate',
          duration: '3 years',
          description: 'Specialize in chosen humanities field (BA/Psychology/Literature)',
          milestones: ['Degree Completion', 'Research Projects', 'Internships']
        },
        {
          phase: 'Career Development',
          duration: '2-4 years',
          description: 'Build expertise and establish professional presence',
          milestones: ['Professional Skills', 'Portfolio Building', 'Network Development']
        }
      ],
      pros: [
        'Creative freedom',
        'Diverse career options',
        'Social impact opportunities',
        'Flexible work arrangements'
      ],
      cons: [
        'Lower initial salaries',
        'Competitive job market',
        'Requires continuous skill development',
        'Limited technical roles'
      ]
    },
    {
      id: 'vocational',
      name: 'Vocational Stream',
      icon: 'Wrench',
      bgColor: 'bg-warning/10',
      iconColor: 'text-warning',
      compatibility: 78,
      popularity: 35,
      description: 'Hands-on learning with direct industry connections and practical skills',
      keySubjects: ['Applied Mathematics', 'Technical Skills', 'Industry Practices', 'Entrepreneurship'],
      careerPotential: 'Skilled trades, Technical services, Entrepreneurship with immediate employment opportunities',
      alignmentReason: 'Your practical approach and hands-on learning preference make this suitable',
      difficulty: 'Medium',
      careerProspects: 'Good',
      marketDemand: 4,
      averageSalary: '3-8 LPA',
      detailedAnalysis: `Your assessment indicates strong practical intelligence and preference for hands-on learning. You show interest in creating tangible outcomes and working with tools/technology. Vocational education will provide direct pathways to employment with opportunities for entrepreneurship.`,
      prerequisites: [
        'Interest in practical and applied learning',
        'Basic technical aptitude',
        'Willingness to work with hands and tools',
        'Entrepreneurial mindset'
      ],
      subjectCombinations: [
        {
          name: 'Technical Trades',
          difficulty: 'Medium',
          subjects: ['Applied Mathematics', 'Technical Drawing', 'Workshop Practice', 'English', 'Entrepreneurship'],
          description: 'Focus on technical skills and trade expertise'
        },
        {
          name: 'Business Vocational',
          difficulty: 'Easy',
          subjects: ['Business Studies', 'Computer Applications', 'Marketing', 'Accounting', 'Communication'],
          description: 'Blend of business skills with practical applications'
        }
      ],
      careerOutcomes: [
        {
          title: 'Skilled Technician',
          salaryRange: '4-8 LPA',
          description: 'Specialized technical roles in various industries',
          skills: ['Technical Skills', 'Problem Solving', 'Equipment Handling', 'Safety Protocols']
        },
        {
          title: 'Small Business Owner',
          salaryRange: '5-15 LPA',
          description: 'Start and manage your own business venture',
          skills: ['Entrepreneurship', 'Business Management', 'Customer Service', 'Financial Planning']
        },
        {
          title: 'Digital Marketing Specialist',
          salaryRange: '3-7 LPA',
          description: 'Manage online marketing campaigns and social media',
          skills: ['Digital Marketing', 'Social Media', 'Analytics', 'Content Creation']
        }
      ],
      successTimeline: [
        {
          phase: 'Class 11-12',
          duration: '2 years',
          description: 'Learn practical skills and industry-relevant knowledge',
          milestones: ['Skill Certifications', 'Industry Exposure', 'Project Work']
        },
        {
          phase: 'Skill Development',
          duration: '1-2 years',
          description: 'Advanced training and specialization in chosen field',
          milestones: ['Professional Certification', 'Apprenticeship', 'Portfolio Building']
        },
        {
          phase: 'Career Launch',
          duration: '1 year',
          description: 'Enter workforce or start own business',
          milestones: ['Job Placement', 'Business Setup', 'Client Acquisition']
        }
      ],
      pros: [
        'Quick employment opportunities',
        'Practical skill development',
        'Entrepreneurship potential',
        'Industry connections'
      ],
      cons: [
        'Limited academic progression',
        'Physical work requirements',
        'Technology dependency',
        'Market fluctuations'
      ]
    }
  ];

  // Filter and sort streams
  const getFilteredAndSortedStreams = () => {
    let filtered = streamRecommendations?.filter(stream => {
      if (filters?.interestLevel !== 'all') {
        const threshold = filters?.interestLevel === 'high' ? 80 : filters?.interestLevel === 'medium' ? 60 : 0;
        const maxThreshold = filters?.interestLevel === 'high' ? 100 : filters?.interestLevel === 'medium' ? 79 : 59;
        if (stream?.compatibility < threshold || stream?.compatibility > maxThreshold) return false;
      }
      
      if (filters?.difficulty !== 'all' && stream?.difficulty?.toLowerCase() !== filters?.difficulty) {
        return false;
      }
      
      if (filters?.careerProspects !== 'all' && stream?.careerProspects?.toLowerCase() !== filters?.careerProspects) {
        return false;
      }
      
      return true;
    });

    // Sort streams
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'compatibility':
          return b?.compatibility - a?.compatibility;
        case 'popularity':
          return b?.popularity - a?.popularity;
        case 'difficulty-asc':
          const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 };
          return difficultyOrder?.[a?.difficulty?.toLowerCase()] - difficultyOrder?.[b?.difficulty?.toLowerCase()];
        case 'difficulty-desc':
          const difficultyOrderDesc = { 'easy': 1, 'medium': 2, 'hard': 3 };
          return difficultyOrderDesc?.[b?.difficulty?.toLowerCase()] - difficultyOrderDesc?.[a?.difficulty?.toLowerCase()];
        case 'salary-desc':
          const getSalaryValue = (range) => parseInt(range?.split('-')?.[1]?.replace(' LPA', ''));
          return getSalaryValue(b?.averageSalary) - getSalaryValue(a?.averageSalary);
        case 'name':
          return a?.name?.localeCompare(b?.name);
        default:
          return b?.compatibility - a?.compatibility;
      }
    });

    return filtered;
  };

  const filteredStreams = getFilteredAndSortedStreams();

  const handleExploreStream = (stream) => {
    setSelectedStream(stream);
  };

  const handleCompareStream = (stream) => {
    setComparisonStreams(prev => {
      const exists = prev?.find(s => s?.id === stream?.id);
      if (exists) {
        return prev?.filter(s => s?.id !== stream?.id);
      } else if (prev?.length < 3) {
        return [...prev, stream];
      }
      return prev;
    });
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      interestLevel: 'all',
      difficulty: 'all',
      careerProspects: 'all'
    });
    setSortBy('compatibility');
  };

  const handleProceedToCourses = (stream) => {
    navigate('/course-program-explorer', { state: { selectedStream: stream?.id } });
  };

  const hasRecommendations = streamRecommendations?.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6" />

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Your Stream Recommendations
                </h1>
                <p className="text-muted-foreground">
                  Personalized educational pathway suggestions based on your aptitude assessment
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => navigate('/aptitude-quiz-interface')}
                  iconName="RefreshCw"
                  iconPosition="left"
                >
                  Retake Quiz
                </Button>
                
                {comparisonStreams?.length > 0 && (
                  <Button
                    variant="default"
                    onClick={() => setShowComparison(true)}
                    iconName="GitCompare"
                    iconPosition="left"
                  >
                    Compare ({comparisonStreams?.length})
                  </Button>
                )}
              </div>
            </div>

            {/* Recommendation Status */}
            <RecommendationStatusIndicator
              status="ready"
              confidence={92}
              lastUpdated={new Date(Date.now() - 3600000)}
              recommendationCount={filteredStreams?.length}
              variant="detailed"
              className="mb-6"
            />
          </div>

          {/* Motivational Message */}
          <MotivationalMessage 
            hasRecommendations={hasRecommendations}
            className="mb-8"
          />

          {hasRecommendations && (
            <>
              {/* Filter and Sort Controls */}
              <FilterSortControls
                filters={filters}
                onFilterChange={handleFilterChange}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onResetFilters={handleResetFilters}
              />

              {/* Stream Recommendations Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {filteredStreams?.map((stream) => (
                  <StreamCard
                    key={stream?.id}
                    stream={stream}
                    onExplore={handleExploreStream}
                    onCompare={handleCompareStream}
                    isSelected={selectedStream?.id === stream?.id}
                    isComparing={comparisonStreams?.some(s => s?.id === stream?.id)}
                  />
                ))}
              </div>

              {filteredStreams?.length === 0 && (
                <div className="text-center py-12">
                  <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full mx-auto mb-4">
                    <Icon name="Search" size={32} color="var(--color-muted-foreground)" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    No streams match your filters
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filter criteria to see more recommendations
                  </p>
                  <Button variant="outline" onClick={handleResetFilters}>
                    Reset Filters
                  </Button>
                </div>
              )}

              {/* NEP Flexibility Indicator */}
              <NEPFlexibilityIndicator className="mb-8" />

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-card border border-border rounded-lg text-center hover-scale">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4">
                    <Icon name="Map" size={24} color="var(--color-primary)" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Explore Career Paths</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Discover detailed career pathways for your chosen streams
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/career-pathway-explorer')}
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    Explore Now
                  </Button>
                </div>

                <div className="p-6 bg-card border border-border rounded-lg text-center hover-scale">
                  <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg mx-auto mb-4">
                    <Icon name="BookOpen" size={24} color="var(--color-secondary)" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Browse Courses</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Find specific courses and programs in your preferred streams
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/course-program-explorer')}
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    Browse Courses
                  </Button>
                </div>

                <div className="p-6 bg-card border border-border rounded-lg text-center hover-scale">
                  <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mx-auto mb-4">
                    <Icon name="MessageCircle" size={24} color="var(--color-accent)" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Ask AI Counselor</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get personalized guidance and answers to your career questions
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/ai-career-chatbot')}
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    Chat Now
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      {/* Detailed Recommendation Panel */}
      {selectedStream && (
        <DetailedRecommendationPanel
          stream={selectedStream}
          onClose={() => setSelectedStream(null)}
          onProceedToCourses={handleProceedToCourses}
        />
      )}
      {/* Comparison Panel */}
      {showComparison && comparisonStreams?.length > 0 && (
        <ComparisonPanel
          streams={comparisonStreams}
          onClose={() => setShowComparison(false)}
          onSelectStream={(stream) => {
            setShowComparison(false);
            handleProceedToCourses(stream);
          }}
        />
      )}
    </div>
  );
};

export default StreamRecommendations;
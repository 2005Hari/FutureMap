import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import ProgramCard from './components/ProgramCard';
import FilterPanel from './components/FilterPanel';
import ProgramDetailsModal from './components/ProgramDetailsModal';
import ComparisonPanel from './components/ComparisonPanel';
import CareerPathwayVisualization from './components/CareerPathwayVisualization';

const CourseProgramExplorer = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    duration: 'all',
    eligibility: 'all',
    location: 'all',
    feeRanges: [],
    features: []
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCareerPathway, setShowCareerPathway] = useState(false);
  const [comparedPrograms, setComparedPrograms] = useState([]);
  const [bookmarkedPrograms, setBookmarkedPrograms] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const programsPerPage = 12;

  // Mock programs data
  const allPrograms = [
    {
      id: 1,
      name: 'Bachelor of Technology in Computer Science',
      institution: 'Indian Institute of Technology, Delhi',
      category: 'Engineering',
      duration: 4,
      fees: 200000,
      eligibility: '12th',
      location: 'Delhi',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop',
      highlights: ['Industry Projects', 'Research Opportunities', 'International Exchange', 'Top Faculty', 'Modern Labs'],
      placementRate: 95,
      averagePackage: 1200000,
      highestPackage: 5000000,
      badge: 'Popular',
      description: `A comprehensive 4-year undergraduate program in Computer Science and Engineering that combines theoretical foundations with practical applications. The curriculum covers core areas including programming, data structures, algorithms, computer systems, software engineering, and emerging technologies like AI and machine learning.`,
      curriculum: [
        {
          year: 1,
          subjects: ['Programming Fundamentals', 'Mathematics', 'Physics', 'Engineering Drawing', 'Communication Skills']
        },
        {
          year: 2,
          subjects: ['Data Structures', 'Computer Organization', 'Discrete Mathematics', 'Database Systems', 'Web Technologies']
        },
        {
          year: 3,
          subjects: ['Algorithms', 'Operating Systems', 'Computer Networks', 'Software Engineering', 'Machine Learning']
        },
        {
          year: 4,
          subjects: ['Artificial Intelligence', 'Distributed Systems', 'Cybersecurity', 'Capstone Project', 'Industry Internship']
        }
      ],
      admissionRequirements: {
        eligibility: ['12th pass with PCM', 'Minimum 75% marks', 'JEE Main qualification'],
        process: ['JEE Main Exam', 'JEE Advanced Exam', 'Counseling Process', 'Document Verification', 'Fee Payment']
      },
      applicationDates: {
        start: '01/02/2024',
        end: '31/05/2024'
      },
      topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta', 'Netflix', 'Adobe', 'Uber'],
      notableAlumni: [
        { name: 'Sundar Pichai', position: 'CEO at Google', batch: '1993' },
        { name: 'Satya Nadella', position: 'CEO at Microsoft', batch: '1988' },
        { name: 'Arvind Krishna', position: 'CEO at IBM', batch: '1985' }
      ],
      applicationLink: 'https://example.com/apply',
      scholarshipAvailable: true
    },
    {
      id: 2,
      name: 'Bachelor of Laws (LLB)',
      institution: 'National Law School of India University',
      category: 'Law',
      duration: 3,
      fees: 150000,
      eligibility: 'Graduation',
      location: 'Bangalore',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop',
      highlights: ['Moot Court', 'Legal Aid Clinic', 'International Law', 'Corporate Law', 'Constitutional Law'],
      placementRate: 88,
      averagePackage: 800000,
      highestPackage: 2500000,
      badge: 'New',
      description: `A rigorous 3-year undergraduate law program designed to provide comprehensive legal education. The curriculum covers constitutional law, criminal law, corporate law, international law, and legal research methodology with emphasis on practical training through moot courts and internships.`,
      curriculum: [
        {
          year: 1,
          subjects: ['Constitutional Law', 'Contract Law', 'Tort Law', 'Criminal Law', 'Legal Methods']
        },
        {
          year: 2,
          subjects: ['Corporate Law', 'Property Law', 'Family Law', 'Administrative Law', 'International Law']
        },
        {
          year: 3,
          subjects: ['Intellectual Property Law', 'Environmental Law', 'Human Rights Law', 'Dissertation', 'Internship']
        }
      ],
      admissionRequirements: {
        eligibility: ['Graduation in any discipline', 'Minimum 50% marks', 'CLAT qualification'],
        process: ['CLAT Exam', 'Counseling Process', 'Document Verification', 'Interview', 'Fee Payment']
      },
      applicationDates: {
        start: '01/01/2024',
        end: '31/03/2024'
      },
      topRecruiters: ['Khaitan & Co', 'AZB & Partners', 'Cyril Amarchand Mangaldas', 'JSA', 'Luthra & Luthra'],
      applicationLink: 'https://example.com/apply-law'
    },
    {
      id: 3,
      name: 'Bachelor of Design (B.Des) in Product Design',
      institution: 'National Institute of Design, Ahmedabad',
      category: 'Design',
      duration: 4,
      fees: 180000,
      eligibility: '12th',
      location: 'Ahmedabad',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      highlights: ['Design Thinking', 'Prototyping', 'User Research', 'Industry Projects', 'International Exposure'],
      placementRate: 92,
      averagePackage: 600000,
      highestPackage: 1800000,
      description: `A comprehensive 4-year design program focusing on product design, user experience, and design thinking. Students learn to create innovative solutions through research, ideation, prototyping, and testing methodologies.`,
      curriculum: [
        {
          year: 1,
          subjects: ['Design Fundamentals', 'Drawing & Sketching', 'Material Studies', 'Design History', 'Basic Workshop']
        },
        {
          year: 2,
          subjects: ['Product Design', 'User Research', 'CAD Modeling', 'Ergonomics', 'Design Psychology']
        },
        {
          year: 3,
          subjects: ['Advanced Prototyping', 'Design Strategy', 'Sustainability', 'Brand Design', 'Industry Project']
        },
        {
          year: 4,
          subjects: ['Portfolio Development', 'Entrepreneurship', 'Design Management', 'Thesis Project', 'Internship']
        }
      ],
      topRecruiters: ['IDEO', 'Frog Design', 'Godrej', 'Titan', 'Samsung', 'LG', 'Philips', 'Whirlpool']
    },
    {
      id: 4,
      name: 'Bachelor of Science in Agriculture',
      institution: 'Indian Agricultural Research Institute',
      category: 'Agriculture',
      duration: 4,
      fees: 50000,
      eligibility: '12th',
      location: 'Delhi',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop',
      highlights: ['Sustainable Farming', 'Research Projects', 'Modern Technology', 'Field Experience', 'Government Support'],
      placementRate: 78,
      averagePackage: 400000,
      highestPackage: 1000000,
      description: `A 4-year comprehensive program in agricultural sciences covering crop production, soil science, plant breeding, agricultural economics, and modern farming technologies with emphasis on sustainable agriculture practices.`,
      curriculum: [
        {
          year: 1,
          subjects: ['Crop Production', 'Soil Science', 'Plant Biology', 'Agricultural Chemistry', 'Farm Management']
        },
        {
          year: 2,
          subjects: ['Plant Breeding', 'Entomology', 'Plant Pathology', 'Agricultural Economics', 'Horticulture']
        },
        {
          year: 3,
          subjects: ['Agricultural Engineering', 'Food Technology', 'Agricultural Extension', 'Research Methods', 'Biotechnology']
        },
        {
          year: 4,
          subjects: ['Sustainable Agriculture', 'Agribusiness', 'Rural Development', 'Thesis Project', 'Field Training']
        }
      ],
      topRecruiters: ['ITC', 'Mahindra Agri', 'Bayer', 'Syngenta', 'NABARD', 'FCI', 'State Agriculture Departments']
    },
    {
      id: 5,
      name: 'Master of Business Administration (MBA)',
      institution: 'Indian Institute of Management, Bangalore',
      category: 'Management',
      duration: 2,
      fees: 2300000,
      eligibility: 'Graduation',
      location: 'Bangalore',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      highlights: ['Case Study Method', 'Industry Immersion', 'Global Exchange', 'Leadership Development', 'Consulting Projects'],
      placementRate: 100,
      averagePackage: 2800000,
      highestPackage: 7000000,
      badge: 'Popular',
      description: `A prestigious 2-year MBA program designed to develop future business leaders. The curriculum combines core business subjects with specialization options in finance, marketing, operations, and strategy.`,
      curriculum: [
        {
          year: 1,
          subjects: ['Financial Accounting', 'Marketing Management', 'Operations Management', 'Organizational Behavior', 'Business Statistics']
        },
        {
          year: 2,
          subjects: ['Strategic Management', 'Specialization Courses', 'Consulting Project', 'International Study Tour', 'Capstone Project']
        }
      ],
      topRecruiters: ['McKinsey', 'BCG', 'Bain', 'Goldman Sachs', 'JP Morgan', 'Google', 'Amazon', 'Microsoft'],
      applicationLink: 'https://example.com/apply-mba'
    },
    {
      id: 6,
      name: 'Bachelor of Medicine and Bachelor of Surgery (MBBS)',
      institution: 'All India Institute of Medical Sciences',
      category: 'Medical',
      duration: 5.5,
      fees: 5000,
      eligibility: '12th',
      location: 'Delhi',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      highlights: ['Clinical Training', 'Research Opportunities', 'Modern Facilities', 'Expert Faculty', 'Community Service'],
      placementRate: 100,
      averagePackage: 800000,
      highestPackage: 2000000,
      description: `A comprehensive 5.5-year medical program including 1 year of internship. The curriculum covers basic medical sciences, clinical subjects, and practical training in hospitals with emphasis on patient care and medical ethics.`,
      topRecruiters: ['AIIMS', 'PGIMER', 'CMC Vellore', 'Apollo Hospitals', 'Fortis Healthcare', 'Max Healthcare']
    },
    {
      id: 7,
      name: 'Diploma in Mechanical Engineering',
      institution: 'Government Polytechnic College',
      category: 'Vocational',
      duration: 3,
      fees: 25000,
      eligibility: '10th',
      location: 'Mumbai',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      highlights: ['Hands-on Training', 'Industry Exposure', 'Job-ready Skills', 'Affordable Fees', 'Government Recognition'],
      placementRate: 85,
      averagePackage: 300000,
      highestPackage: 600000,
      description: `A 3-year diploma program in mechanical engineering providing practical skills and theoretical knowledge in manufacturing, design, and maintenance of mechanical systems.`,
      topRecruiters: ['Tata Motors', 'Mahindra', 'Bajaj Auto', 'L&T', 'Thermax', 'Kirloskar', 'BHEL']
    },
    {
      id: 8,
      name: 'Bachelor of Commerce (B.Com)',
      institution: 'Shri Ram College of Commerce',
      category: 'Commerce',
      duration: 3,
      fees: 75000,
      eligibility: '12th',
      location: 'Delhi',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
      highlights: ['Industry Integration', 'Internship Programs', 'Professional Skills', 'Career Guidance', 'Alumni Network'],
      placementRate: 90,
      averagePackage: 500000,
      highestPackage: 1500000,
      description: `A 3-year undergraduate program in commerce covering accounting, finance, economics, business law, and taxation with focus on practical applications and industry readiness.`,
      topRecruiters: ['Deloitte', 'EY', 'KPMG', 'PwC', 'ICICI Bank', 'HDFC Bank', 'Wipro', 'TCS']
    }
  ];

  // Filter and search logic
  const filteredPrograms = useMemo(() => {
    let filtered = allPrograms;

    // Search filter
    if (filters?.search) {
      filtered = filtered?.filter(program =>
        program?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        program?.institution?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        program?.category?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    // Category filter
    if (filters?.category !== 'all') {
      filtered = filtered?.filter(program =>
        program?.category?.toLowerCase() === filters?.category?.toLowerCase()
      );
    }

    // Duration filter
    if (filters?.duration !== 'all') {
      if (filters?.duration === '5+') {
        filtered = filtered?.filter(program => program?.duration >= 5);
      } else {
        filtered = filtered?.filter(program => program?.duration === parseInt(filters?.duration));
      }
    }

    // Eligibility filter
    if (filters?.eligibility !== 'all') {
      filtered = filtered?.filter(program =>
        program?.eligibility?.toLowerCase() === filters?.eligibility?.toLowerCase()
      );
    }

    // Location filter
    if (filters?.location !== 'all') {
      filtered = filtered?.filter(program =>
        program?.location?.toLowerCase()?.includes(filters?.location?.toLowerCase())
      );
    }

    // Fee range filter
    if (filters?.feeRanges && filters?.feeRanges?.length > 0) {
      filtered = filtered?.filter(program => {
        return filters?.feeRanges?.some(rangeId => {
          switch (rangeId) {
            case 'budget': return program?.fees < 100000;
            case 'moderate': return program?.fees >= 100000 && program?.fees <= 500000;
            case 'premium': return program?.fees > 500000 && program?.fees <= 1500000;
            case 'luxury': return program?.fees > 1500000;
            default: return true;
          }
        });
      });
    }

    // Features filter
    if (filters?.features && filters?.features?.length > 0) {
      filtered = filtered?.filter(program => {
        return filters?.features?.every(feature => {
          switch (feature) {
            case 'placement': return program?.placementRate >= 80;
            case 'scholarship': return program?.scholarshipAvailable;
            case 'internship': return program?.highlights?.some(h => h?.toLowerCase()?.includes('internship'));
            case 'international': return program?.highlights?.some(h => h?.toLowerCase()?.includes('international'));
            case 'research': return program?.highlights?.some(h => h?.toLowerCase()?.includes('research'));
            case 'industry': return program?.highlights?.some(h => h?.toLowerCase()?.includes('industry'));
            default: return true;
          }
        });
      });
    }

    // Sorting
    switch (sortBy) {
      case 'fees-low':
        filtered?.sort((a, b) => a?.fees - b?.fees);
        break;
      case 'fees-high':
        filtered?.sort((a, b) => b?.fees - a?.fees);
        break;
      case 'duration':
        filtered?.sort((a, b) => a?.duration - b?.duration);
        break;
      case 'placement':
        filtered?.sort((a, b) => (b?.placementRate || 0) - (a?.placementRate || 0));
        break;
      case 'name':
        filtered?.sort((a, b) => a?.name?.localeCompare(b?.name));
        break;
      default:
        // Keep original order for relevance
        break;
    }

    return filtered;
  }, [filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredPrograms?.length / programsPerPage);
  const paginatedPrograms = filteredPrograms?.slice(
    (currentPage - 1) * programsPerPage,
    currentPage * programsPerPage
  );

  // Event handlers
  const handleSearch = (query) => {
    setSearchQuery(query);
    setFilters(prev => ({ ...prev, search: query }));
    setCurrentPage(1);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      category: 'all',
      duration: 'all',
      eligibility: 'all',
      location: 'all',
      feeRanges: [],
      features: []
    };
    setFilters(clearedFilters);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleProgramCompare = (programId) => {
    const program = allPrograms?.find(p => p?.id === programId);
    if (!program) return;

    setComparedPrograms(prev => {
      const isAlreadyCompared = prev?.some(p => p?.id === programId);
      if (isAlreadyCompared) {
        return prev?.filter(p => p?.id !== programId);
      } else {
        if (prev?.length >= 3) {
          // Replace the first program if already comparing 3
          return [program, ...prev?.slice(1)];
        }
        return [...prev, program];
      }
    });

    if (comparedPrograms?.length === 0) {
      setShowComparison(true);
    }
  };

  const handleProgramBookmark = (programId) => {
    setBookmarkedPrograms(prev => {
      const isBookmarked = prev?.includes(programId);
      if (isBookmarked) {
        return prev?.filter(id => id !== programId);
      } else {
        return [...prev, programId];
      }
    });
  };

  const handleViewDetails = (program) => {
    setSelectedProgram(program);
    setShowDetailsModal(true);
  };

  const handleShowCareerPathway = (program) => {
    setSelectedProgram(program);
    setShowCareerPathway(true);
  };

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'fees-low', label: 'Fees: Low to High' },
    { value: 'fees-high', label: 'Fees: High to Low' },
    { value: 'duration', label: 'Duration' },
    { value: 'placement', label: 'Placement Rate' }
  ];

  // Update search when filters change
  useEffect(() => {
    setSearchQuery(filters?.search);
  }, [filters?.search]);

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
                  Course Program Explorer
                </h1>
                <p className="text-muted-foreground">
                  Discover and compare educational programs across various fields and institutions
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => navigate('/ai-career-chatbot')}
                >
                  <Icon name="MessageCircle" size={16} className="mr-2" />
                  Ask AI
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/career-pathway-explorer')}
                >
                  <Icon name="Map" size={16} className="mr-2" />
                  Career Paths
                </Button>
              </div>
            </div>

            {/* Search and Controls */}
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex-1 max-w-md">
                <Input
                  type="search"
                  placeholder="Search programs, institutions, or keywords..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e?.target?.value)}
                  className="w-full"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm font-medium text-foreground">Sort by:</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e?.target?.value)}
                    className="px-3 py-2 border border-border rounded-lg bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {sortOptions?.map(option => (
                      <option key={option?.value} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center space-x-1 border border-border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Icon name="Grid3X3" size={16} />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <Icon name="List" size={16} />
                  </Button>
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Icon name="Filter" size={16} className="mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Results Summary */}
            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
              <span>
                Showing {paginatedPrograms?.length} of {filteredPrograms?.length} programs
              </span>
              {comparedPrograms?.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowComparison(!showComparison)}
                >
                  <Icon name="GitCompare" size={16} className="mr-2" />
                  Compare ({comparedPrograms?.length})
                </Button>
              )}
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <div className={`w-80 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <FilterPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
                isOpen={showFilters}
                onToggle={() => setShowFilters(!showFilters)}
                className="sticky top-24"
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Comparison Panel */}
              {showComparison && comparedPrograms?.length > 0 && (
                <ComparisonPanel
                  comparedPrograms={comparedPrograms}
                  onRemoveProgram={(id) => setComparedPrograms(prev => prev?.filter(p => p?.id !== id))}
                  onClearAll={() => {
                    setComparedPrograms([]);
                    setShowComparison(false);
                  }}
                  isOpen={showComparison}
                  onToggle={() => setShowComparison(!showComparison)}
                  className="mb-8"
                />
              )}

              {/* Programs Grid/List */}
              {paginatedPrograms?.length > 0 ? (
                <div className={`${
                  viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' :'space-y-4'
                }`}>
                  {paginatedPrograms?.map((program) => (
                    <ProgramCard
                      key={program?.id}
                      program={program}
                      onCompare={handleProgramCompare}
                      onBookmark={handleProgramBookmark}
                      onViewDetails={handleViewDetails}
                      isCompared={comparedPrograms?.some(p => p?.id === program?.id)}
                      isBookmarked={bookmarkedPrograms?.includes(program?.id)}
                      className={viewMode === 'list' ? 'flex-row' : ''}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">No Programs Found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button variant="outline" onClick={handleClearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    <Icon name="ChevronLeft" size={16} />
                  </Button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    );
                  })}
                  
                  {totalPages > 5 && (
                    <>
                      <span className="text-muted-foreground">...</span>
                      <Button
                        variant={currentPage === totalPages ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentPage(totalPages)}
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    <Icon name="ChevronRight" size={16} />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Modals */}
      <ProgramDetailsModal
        program={selectedProgram}
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedProgram(null);
        }}
        onBookmark={handleProgramBookmark}
        onCompare={handleProgramCompare}
        isBookmarked={selectedProgram ? bookmarkedPrograms?.includes(selectedProgram?.id) : false}
        isCompared={selectedProgram ? comparedPrograms?.some(p => p?.id === selectedProgram?.id) : false}
      />
      <CareerPathwayVisualization
        program={selectedProgram}
        isOpen={showCareerPathway}
        onClose={() => {
          setShowCareerPathway(false);
          setSelectedProgram(null);
        }}
      />
    </div>
  );
};

export default CourseProgramExplorer;
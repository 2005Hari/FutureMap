import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PathwayVisualization from './components/PathwayVisualization';
import FilterControls from './components/FilterControls';
import PathwayDetailsPanel from './components/PathwayDetailsPanel';
import ComparisonPanel from './components/ComparisonPanel';

const CareerPathwayExplorer = () => {
  const navigate = useNavigate();
  const [selectedPathway, setSelectedPathway] = useState(null);
  const [activeFilters, setActiveFilters] = useState({});
  const [bookmarkedPathways, setBookmarkedPathways] = useState([]);
  const [comparedPathways, setComparedPathways] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [viewMode, setViewMode] = useState('flowchart');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock user progress data
  const userProgress = {
    hasCompletedQuiz: true,
    currentStream: 'Science',
    interests: ['Technology', 'Problem Solving', 'Innovation'],
    strengths: ['Analytical Thinking', 'Mathematics', 'Logical Reasoning'],
    recommendedPathways: ['engineering', 'medical', 'bsc']
  };

  useEffect(() => {
    // Load bookmarked pathways from localStorage
    const saved = localStorage.getItem('bookmarkedPathways');
    if (saved) {
      setBookmarkedPathways(JSON.parse(saved));
    }
  }, []);

  const handleNodeClick = (pathway) => {
    setSelectedPathway(pathway);
  };

  const handleFiltersChange = (filters) => {
    setActiveFilters(filters);
  };

  const handleBookmark = (pathway) => {
    const isBookmarked = bookmarkedPathways?.some(p => p?.id === pathway?.id);
    let updatedBookmarks;
    
    if (isBookmarked) {
      updatedBookmarks = bookmarkedPathways?.filter(p => p?.id !== pathway?.id);
    } else {
      updatedBookmarks = [...bookmarkedPathways, pathway];
    }
    
    setBookmarkedPathways(updatedBookmarks);
    localStorage.setItem('bookmarkedPathways', JSON.stringify(updatedBookmarks));
  };

  const handleAddToComparison = (pathway) => {
    if (comparedPathways?.length >= 3) {
      alert('You can compare up to 3 pathways at once');
      return;
    }
    
    if (!comparedPathways?.some(p => p?.id === pathway?.id)) {
      setComparedPathways([...comparedPathways, pathway]);
      setShowComparison(true);
    }
  };

  const handleRemoveFromComparison = (pathwayId) => {
    setComparedPathways(comparedPathways?.filter(p => p?.id !== pathwayId));
    if (comparedPathways?.length <= 1) {
      setShowComparison(false);
    }
  };

  const handleClearComparison = () => {
    setComparedPathways([]);
    setShowComparison(false);
  };

  const isPathwayBookmarked = (pathway) => {
    return bookmarkedPathways?.some(p => p?.id === pathway?.id);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters)?.reduce((count, filters) => count + (filters?.length || 0), 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="w-full px-8 py-6">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6" />

          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Career Pathway Explorer
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                Discover your educational journey through interactive visualizations. Explore career pathways, 
                compare options, and find the perfect route to your dream career with NEP 2020 flexible pathways.
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === 'flowchart' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('flowchart')}
                  className="px-3"
                >
                  <Icon name="GitBranch" size={16} />
                  <span className="ml-2 hidden sm:inline">Flowchart</span>
                </Button>
                <Button
                  variant={viewMode === 'timeline' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('timeline')}
                  className="px-3"
                >
                  <Icon name="Calendar" size={16} />
                  <span className="ml-2 hidden sm:inline">Timeline</span>
                </Button>
              </div>

              {/* Quick Actions */}
              <Button
                variant="outline"
                onClick={() => navigate('/ai-career-chatbot')}
                iconName="MessageCircle"
                iconPosition="left"
              >
                Ask AI
              </Button>
              
              {bookmarkedPathways?.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => {/* Show bookmarks modal */}}
                  iconName="Bookmark"
                  iconPosition="left"
                >
                  Saved ({bookmarkedPathways?.length})
                </Button>
              )}
            </div>
          </div>

          {/* User Context Banner */}
          {userProgress?.hasCompletedQuiz && (
            <div className="mb-6 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
              <div className="flex items-start space-x-3">
                <Icon name="Lightbulb" size={20} color="var(--color-primary)" />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    Personalized for {userProgress?.currentStream} Stream
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Based on your quiz results, we've highlighted pathways matching your interests: {userProgress?.interests?.join(', ')}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {userProgress?.recommendedPathways?.map((pathwayId) => (
                      <span
                        key={pathwayId}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20"
                      >
                        Recommended
                      </span>
                    ))}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/aptitude-quiz-interface')}
                  className="text-primary hover:text-primary"
                >
                  Retake Quiz
                </Button>
              </div>
            </div>
          )}

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className={`xl:col-span-1 ${sidebarCollapsed ? 'hidden xl:block' : ''}`}>
              <div className="sticky top-24">
                <FilterControls
                  onFiltersChange={handleFiltersChange}
                  activeFilters={activeFilters}
                />
                
                {/* Filter Summary */}
                {getActiveFilterCount() > 0 && (
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">Active Filters</span>
                      <span className="text-xs text-muted-foreground">{getActiveFilterCount()} applied</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveFilters({})}
                      className="w-full text-muted-foreground hover:text-foreground"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Visualization Area */}
            <div className={`${sidebarCollapsed ? 'xl:col-span-4' : 'xl:col-span-3'}`}>
              <div className="space-y-6">
                {/* Visualization Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                      className="xl:hidden"
                    >
                      <Icon name="SlidersHorizontal" size={16} />
                    </Button>
                    <h2 className="text-lg font-semibold text-foreground">
                      Interactive Pathway Map
                    </h2>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {selectedPathway && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddToComparison(selectedPathway)}
                          disabled={comparedPathways?.some(p => p?.id === selectedPathway?.id)}
                          iconName="GitCompare"
                          iconPosition="left"
                        >
                          Compare
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleBookmark(selectedPathway)}
                          iconName={isPathwayBookmarked(selectedPathway) ? 'BookmarkCheck' : 'Bookmark'}
                          iconPosition="left"
                        >
                          {isPathwayBookmarked(selectedPathway) ? 'Saved' : 'Save'}
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Main Visualization */}
                <div className="bg-card border border-border rounded-lg card-shadow overflow-hidden">
                  <div className="h-[600px]">
                    <PathwayVisualization
                      selectedFilters={activeFilters}
                      onNodeClick={handleNodeClick}
                      selectedPathway={selectedPathway}
                      viewMode={viewMode}
                    />
                  </div>
                </div>

                {/* Pathway Details */}
                {selectedPathway && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <PathwayDetailsPanel
                        selectedPathway={selectedPathway}
                        onBookmark={handleBookmark}
                        isBookmarked={isPathwayBookmarked(selectedPathway)}
                      />
                    </div>
                    
                    {/* Quick Actions Panel */}
                    <div className="space-y-4">
                      <div className="p-4 bg-card border border-border rounded-lg card-shadow">
                        <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
                          <Icon name="Zap" size={16} />
                          <span>Quick Actions</span>
                        </h3>
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            fullWidth
                            onClick={() => navigate('/course-program-explorer')}
                            iconName="BookOpen"
                            iconPosition="left"
                          >
                            Explore Courses
                          </Button>
                          <Button
                            variant="outline"
                            fullWidth
                            onClick={() => navigate('/ai-career-chatbot')}
                            iconName="MessageCircle"
                            iconPosition="left"
                          >
                            Ask AI Counselor
                          </Button>
                          <Button
                            variant="outline"
                            fullWidth
                            onClick={() => navigate('/stream-recommendations')}
                            iconName="Target"
                            iconPosition="left"
                          >
                            View Recommendations
                          </Button>
                        </div>
                      </div>

                      {/* Related Pathways */}
                      <div className="p-4 bg-card border border-border rounded-lg card-shadow">
                        <h3 className="font-semibold text-foreground mb-3 flex items-center space-x-2">
                          <Icon name="Route" size={16} />
                          <span>Related Pathways</span>
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded cursor-pointer">
                            <span className="text-muted-foreground">Alternative Routes</span>
                            <Icon name="ArrowRight" size={14} />
                          </div>
                          <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded cursor-pointer">
                            <span className="text-muted-foreground">Similar Fields</span>
                            <Icon name="ArrowRight" size={14} />
                          </div>
                          <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded cursor-pointer">
                            <span className="text-muted-foreground">Cross-Stream Options</span>
                            <Icon name="ArrowRight" size={14} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Comparison Panel */}
                {showComparison && (
                  <ComparisonPanel
                    comparedPathways={comparedPathways}
                    onRemoveFromComparison={handleRemoveFromComparison}
                    onClearComparison={handleClearComparison}
                    isVisible={showComparison}
                    onToggleVisibility={() => setShowComparison(!showComparison)}
                  />
                )}

                {/* Help Section */}
                <div className="p-6 bg-gradient-to-r from-muted/30 to-muted/10 rounded-lg border border-border">
                  <div className="flex items-start space-x-4">
                    <Icon name="HelpCircle" size={24} color="var(--color-primary)" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">How to Use the Pathway Explorer</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div className="space-y-2">
                          <div className="flex items-start space-x-2">
                            <Icon name="MousePointer2" size={14} className="mt-0.5" />
                            <span>Click on pathway nodes to view detailed information</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Icon name="Filter" size={14} className="mt-0.5" />
                            <span>Use filters to narrow down pathways by industry and requirements</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-start space-x-2">
                            <Icon name="GitCompare" size={14} className="mt-0.5" />
                            <span>Compare up to 3 pathways side by side</span>
                          </div>
                          <div className="flex items-start space-x-2">
                            <Icon name="Bookmark" size={14} className="mt-0.5" />
                            <span>Save interesting pathways for later review</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CareerPathwayExplorer;
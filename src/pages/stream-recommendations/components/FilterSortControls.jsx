import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterSortControls = ({ 
  filters, 
  onFilterChange, 
  sortBy, 
  onSortChange,
  onResetFilters 
}) => {
  const sortOptions = [
    { value: 'compatibility', label: 'Best Match First' },
    { value: 'popularity', label: 'Most Popular' },
    { value: 'difficulty-asc', label: 'Easiest First' },
    { value: 'difficulty-desc', label: 'Most Challenging First' },
    { value: 'salary-desc', label: 'Highest Salary First' },
    { value: 'name', label: 'Alphabetical' }
  ];

  const interestLevelOptions = [
    { value: 'all', label: 'All Interest Levels' },
    { value: 'high', label: 'High Interest (80%+)' },
    { value: 'medium', label: 'Medium Interest (60-79%)' },
    { value: 'low', label: 'Low Interest (Below 60%)' }
  ];

  const difficultyOptions = [
    { value: 'all', label: 'All Difficulty Levels' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  const careerProspectOptions = [
    { value: 'all', label: 'All Career Prospects' },
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'average', label: 'Average' }
  ];

  const hasActiveFilters = () => {
    return filters?.interestLevel !== 'all' || 
           filters?.difficulty !== 'all' || 
           filters?.careerProspects !== 'all';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} color="var(--color-primary)" />
          <h3 className="font-semibold text-foreground">Filter & Sort</h3>
        </div>
        
        {hasActiveFilters() && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset Filters
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Sort By */}
        <Select
          label="Sort By"
          options={sortOptions}
          value={sortBy}
          onChange={onSortChange}
          className="w-full"
        />

        {/* Interest Level Filter */}
        <Select
          label="Interest Level"
          options={interestLevelOptions}
          value={filters?.interestLevel}
          onChange={(value) => onFilterChange('interestLevel', value)}
          className="w-full"
        />

        {/* Difficulty Filter */}
        <Select
          label="Difficulty"
          options={difficultyOptions}
          value={filters?.difficulty}
          onChange={(value) => onFilterChange('difficulty', value)}
          className="w-full"
        />

        {/* Career Prospects Filter */}
        <Select
          label="Career Prospects"
          options={careerProspectOptions}
          value={filters?.careerProspects}
          onChange={(value) => onFilterChange('careerProspects', value)}
          className="w-full"
        />
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters() && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Tag" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm font-medium text-muted-foreground">Active Filters:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {filters?.interestLevel !== 'all' && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                <span>Interest: {filters?.interestLevel}</span>
                <button
                  onClick={() => onFilterChange('interestLevel', 'all')}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
            
            {filters?.difficulty !== 'all' && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-secondary/10 text-secondary rounded-md text-sm">
                <span>Difficulty: {filters?.difficulty}</span>
                <button
                  onClick={() => onFilterChange('difficulty', 'all')}
                  className="hover:bg-secondary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
            
            {filters?.careerProspects !== 'all' && (
              <div className="flex items-center space-x-1 px-2 py-1 bg-accent/10 text-accent rounded-md text-sm">
                <span>Prospects: {filters?.careerProspects}</span>
                <button
                  onClick={() => onFilterChange('careerProspects', 'all')}
                  className="hover:bg-accent/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSortControls;
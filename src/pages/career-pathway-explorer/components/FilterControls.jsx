import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterControls = ({ onFiltersChange, activeFilters = {} }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState(activeFilters);

  const filterOptions = {
    industry: [
      { id: 'technology', label: 'Technology & IT', icon: 'Laptop' },
      { id: 'healthcare', label: 'Healthcare & Medicine', icon: 'Heart' },
      { id: 'finance', label: 'Finance & Business', icon: 'DollarSign' },
      { id: 'creative', label: 'Creative & Design', icon: 'Palette' },
      { id: 'legal', label: 'Legal & Governance', icon: 'Scale' },
      { id: 'research', label: 'Research & Academia', icon: 'Microscope' },
      { id: 'engineering', label: 'Engineering', icon: 'Cog' },
      { id: 'education', label: 'Education & Training', icon: 'GraduationCap' }
    ],
    educationLevel: [
      { id: 'undergraduate', label: 'Undergraduate (3-4 years)', icon: 'BookOpen' },
      { id: 'postgraduate', label: 'Postgraduate (1-2 years)', icon: 'Book' },
      { id: 'vocational', label: 'Vocational Training', icon: 'Wrench' },
      { id: 'certification', label: 'Professional Certification', icon: 'Award' }
    ],
    timeCommitment: [
      { id: 'short', label: 'Short-term (6 months - 2 years)', icon: 'Clock' },
      { id: 'medium', label: 'Medium-term (2-4 years)', icon: 'Calendar' },
      { id: 'long', label: 'Long-term (4+ years)', icon: 'CalendarDays' }
    ],
    earningPotential: [
      { id: 'entry', label: 'Entry Level (₹2-5 LPA)', icon: 'TrendingUp' },
      { id: 'mid', label: 'Mid Level (₹5-15 LPA)', icon: 'BarChart3' },
      { id: 'senior', label: 'Senior Level (₹15+ LPA)', icon: 'TrendingUp' }
    ]
  };

  const handleFilterChange = (category, optionId, checked) => {
    const updatedFilters = { ...localFilters };
    
    if (!updatedFilters?.[category]) {
      updatedFilters[category] = [];
    }

    if (checked) {
      updatedFilters[category] = [...updatedFilters?.[category], optionId];
    } else {
      updatedFilters[category] = updatedFilters?.[category]?.filter(id => id !== optionId);
    }

    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const clearAllFilters = () => {
    setLocalFilters({});
    onFiltersChange({});
  };

  const getActiveFilterCount = () => {
    return Object.values(localFilters)?.reduce((count, filters) => count + (filters?.length || 0), 0);
  };

  const renderFilterSection = (category, title, options) => (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-foreground flex items-center space-x-2">
        <Icon name="Filter" size={14} />
        <span>{title}</span>
      </h4>
      <div className="space-y-2">
        {options?.map((option) => (
          <Checkbox
            key={option?.id}
            label={
              <div className="flex items-center space-x-2">
                <Icon name={option?.icon} size={16} color="var(--color-muted-foreground)" />
                <span className="text-sm">{option?.label}</span>
              </div>
            }
            checked={localFilters?.[category]?.includes(option?.id) || false}
            onChange={(e) => handleFilterChange(category, option?.id, e?.target?.checked)}
            className="text-sm"
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg card-shadow">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="SlidersHorizontal" size={20} color="var(--color-primary)" />
          <h3 className="font-semibold text-foreground">Filter Pathways</h3>
          {getActiveFilterCount() > 0 && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              {getActiveFilterCount()} active
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden"
          >
            <Icon name={isExpanded ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>
      {/* Filter Content */}
      <div className={`${isExpanded ? 'block' : 'hidden md:block'}`}>
        <div className="p-4 space-y-6">
          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={localFilters?.industry?.includes('technology') ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleFilterChange('industry', 'technology', !localFilters?.industry?.includes('technology'))}
              iconName="Laptop"
              iconPosition="left"
            >
              Tech
            </Button>
            <Button
              variant={localFilters?.industry?.includes('healthcare') ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleFilterChange('industry', 'healthcare', !localFilters?.industry?.includes('healthcare'))}
              iconName="Heart"
              iconPosition="left"
            >
              Healthcare
            </Button>
            <Button
              variant={localFilters?.industry?.includes('finance') ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleFilterChange('industry', 'finance', !localFilters?.industry?.includes('finance'))}
              iconName="DollarSign"
              iconPosition="left"
            >
              Finance
            </Button>
            <Button
              variant={localFilters?.industry?.includes('creative') ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleFilterChange('industry', 'creative', !localFilters?.industry?.includes('creative'))}
              iconName="Palette"
              iconPosition="left"
            >
              Creative
            </Button>
          </div>

          {/* Detailed Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderFilterSection('industry', 'Industry & Field', filterOptions?.industry)}
            {renderFilterSection('educationLevel', 'Education Level', filterOptions?.educationLevel)}
            {renderFilterSection('timeCommitment', 'Time Commitment', filterOptions?.timeCommitment)}
            {renderFilterSection('earningPotential', 'Earning Potential', filterOptions?.earningPotential)}
          </div>

          {/* NEP 2020 Highlight */}
          <div className="p-3 bg-gradient-to-r from-warning/5 to-accent/5 border border-warning/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Lightbulb" size={20} color="var(--color-warning)" />
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">NEP 2020 Flexible Pathways</h4>
                <p className="text-xs text-muted-foreground">
                  Explore multidisciplinary options and cross-stream transitions highlighted in orange dashed lines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters,
  isOpen,
  onToggle,
  className = ""
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'medical', label: 'Medical' },
    { value: 'law', label: 'Law' },
    { value: 'design', label: 'Design' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'commerce', label: 'Commerce' },
    { value: 'arts', label: 'Arts' },
    { value: 'vocational', label: 'Vocational' },
    { value: 'management', label: 'Management' }
  ];

  const durationOptions = [
    { value: 'all', label: 'Any Duration' },
    { value: '1', label: '1 Year' },
    { value: '2', label: '2 Years' },
    { value: '3', label: '3 Years' },
    { value: '4', label: '4 Years' },
    { value: '5+', label: '5+ Years' }
  ];

  const eligibilityOptions = [
    { value: 'all', label: 'All Levels' },
    { value: '10th', label: '10th Pass' },
    { value: '12th', label: '12th Pass' },
    { value: 'graduation', label: 'Graduation' },
    { value: 'postgraduation', label: 'Post Graduation' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'delhi', label: 'Delhi NCR' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'kolkata', label: 'Kolkata' },
    { value: 'pune', label: 'Pune' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'online', label: 'Online' }
  ];

  const feeRanges = [
    { id: 'budget', label: 'Budget Friendly (< ₹1L)', min: 0, max: 100000 },
    { id: 'moderate', label: 'Moderate (₹1L - ₹5L)', min: 100000, max: 500000 },
    { id: 'premium', label: 'Premium (₹5L - ₹15L)', min: 500000, max: 1500000 },
    { id: 'luxury', label: 'Luxury (> ₹15L)', min: 1500000, max: Infinity }
  ];

  const specialFeatures = [
    { id: 'placement', label: 'High Placement Rate (>80%)' },
    { id: 'scholarship', label: 'Scholarship Available' },
    { id: 'internship', label: 'Guaranteed Internship' },
    { id: 'international', label: 'International Exposure' },
    { id: 'research', label: 'Research Opportunities' },
    { id: 'industry', label: 'Industry Partnerships' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleFeeRangeChange = (rangeId, checked) => {
    const currentRanges = localFilters?.feeRanges || [];
    const newRanges = checked
      ? [...currentRanges, rangeId]
      : currentRanges?.filter(id => id !== rangeId);
    
    handleFilterChange('feeRanges', newRanges);
  };

  const handleFeatureChange = (featureId, checked) => {
    const currentFeatures = localFilters?.features || [];
    const newFeatures = checked
      ? [...currentFeatures, featureId]
      : currentFeatures?.filter(id => id !== featureId);
    
    handleFilterChange('features', newFeatures);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      search: '',
      category: 'all',
      duration: 'all',
      eligibility: 'all',
      location: 'all',
      feeRanges: [],
      features: []
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters?.search) count++;
    if (localFilters?.category !== 'all') count++;
    if (localFilters?.duration !== 'all') count++;
    if (localFilters?.eligibility !== 'all') count++;
    if (localFilters?.location !== 'all') count++;
    if (localFilters?.feeRanges?.length > 0) count++;
    if (localFilters?.features?.length > 0) count++;
    return count;
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} color="var(--color-primary)" />
          <h3 className="font-semibold text-foreground">Filters</h3>
          {getActiveFilterCount() > 0 && (
            <span className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="md:hidden"
          >
            <Icon name={isOpen ? "X" : "ChevronDown"} size={20} />
          </Button>
        </div>
      </div>
      {/* Filter Content */}
      <div className={`p-4 space-y-6 ${!isOpen ? 'hidden md:block' : ''}`}>
        {/* Search */}
        <div>
          <Input
            type="search"
            placeholder="Search programs, institutions..."
            value={localFilters?.search || ''}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Category */}
        <div>
          <Select
            label="Category"
            options={categoryOptions}
            value={localFilters?.category || 'all'}
            onChange={(value) => handleFilterChange('category', value)}
          />
        </div>

        {/* Duration */}
        <div>
          <Select
            label="Duration"
            options={durationOptions}
            value={localFilters?.duration || 'all'}
            onChange={(value) => handleFilterChange('duration', value)}
          />
        </div>

        {/* Eligibility */}
        <div>
          <Select
            label="Eligibility"
            options={eligibilityOptions}
            value={localFilters?.eligibility || 'all'}
            onChange={(value) => handleFilterChange('eligibility', value)}
          />
        </div>

        {/* Location */}
        <div>
          <Select
            label="Location"
            options={locationOptions}
            value={localFilters?.location || 'all'}
            onChange={(value) => handleFilterChange('location', value)}
          />
        </div>

        {/* Fee Range */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Fee Range</h4>
          <div className="space-y-2">
            {feeRanges?.map((range) => (
              <Checkbox
                key={range?.id}
                label={range?.label}
                checked={(localFilters?.feeRanges || [])?.includes(range?.id)}
                onChange={(e) => handleFeeRangeChange(range?.id, e?.target?.checked)}
              />
            ))}
          </div>
        </div>

        {/* Special Features */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Special Features</h4>
          <div className="space-y-2">
            {specialFeatures?.map((feature) => (
              <Checkbox
                key={feature?.id}
                label={feature?.label}
                checked={(localFilters?.features || [])?.includes(feature?.id)}
                onChange={(e) => handleFeatureChange(feature?.id, e?.target?.checked)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
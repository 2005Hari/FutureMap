import React, { useState, useEffect, useRef, useMemo } from 'react';

import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PathwayVisualization = ({ 
  selectedFilters, 
  onNodeClick, 
  selectedPathway,
  viewMode = 'flowchart' // flowchart, timeline, network
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Mock pathway data with NEP 2020 compliant flexible pathways
  const pathwayData = {
    nodes: [
      // Starting Points
      { id: 'class10', name: 'Class 10', category: 'education', level: 0, x: 100, y: 300 },
      { id: 'class12-science', name: 'Class 12 (Science)', category: 'education', level: 1, x: 300, y: 200 },
      { id: 'class12-commerce', name: 'Class 12 (Commerce)', category: 'education', level: 1, x: 300, y: 300 },
      { id: 'class12-arts', name: 'Class 12 (Arts)', category: 'education', level: 1, x: 300, y: 400 },
      { id: 'vocational', name: 'Vocational Training', category: 'education', level: 1, x: 300, y: 500 },
      
      // Undergraduate Options
      { id: 'engineering', name: 'B.Tech/B.E.', category: 'undergraduate', level: 2, x: 500, y: 150 },
      { id: 'medical', name: 'MBBS/BDS', category: 'undergraduate', level: 2, x: 500, y: 200 },
      { id: 'bsc', name: 'B.Sc.', category: 'undergraduate', level: 2, x: 500, y: 250 },
      { id: 'bcom', name: 'B.Com', category: 'undergraduate', level: 2, x: 500, y: 300 },
      { id: 'bba', name: 'BBA', category: 'undergraduate', level: 2, x: 500, y: 350 },
      { id: 'ba', name: 'B.A.', category: 'undergraduate', level: 2, x: 500, y: 400 },
      { id: 'design', name: 'B.Des', category: 'undergraduate', level: 2, x: 500, y: 450 },
      { id: 'law', name: 'LLB', category: 'undergraduate', level: 2, x: 500, y: 500 },
      
      // Career Destinations
      { id: 'software-engineer', name: 'Software Engineer', category: 'career', level: 3, x: 700, y: 100 },
      { id: 'data-scientist', name: 'Data Scientist', category: 'career', level: 3, x: 700, y: 150 },
      { id: 'doctor', name: 'Medical Doctor', category: 'career', level: 3, x: 700, y: 200 },
      { id: 'researcher', name: 'Research Scientist', category: 'career', level: 3, x: 700, y: 250 },
      { id: 'ca', name: 'Chartered Accountant', category: 'career', level: 3, x: 700, y: 300 },
      { id: 'entrepreneur', name: 'Entrepreneur', category: 'career', level: 3, x: 700, y: 350 },
      { id: 'designer', name: 'UX/UI Designer', category: 'career', level: 3, x: 700, y: 400 },
      { id: 'lawyer', name: 'Legal Advocate', category: 'career', level: 3, x: 700, y: 450 },
      { id: 'civil-servant', name: 'Civil Servant', category: 'career', level: 3, x: 700, y: 500 }
    ],
    links: [
      // From Class 10
      { source: 'class10', target: 'class12-science', value: 1 },
      { source: 'class10', target: 'class12-commerce', value: 1 },
      { source: 'class10', target: 'class12-arts', value: 1 },
      { source: 'class10', target: 'vocational', value: 1 },
      
      // From Class 12 Science
      { source: 'class12-science', target: 'engineering', value: 1 },
      { source: 'class12-science', target: 'medical', value: 1 },
      { source: 'class12-science', target: 'bsc', value: 1 },
      
      // From Class 12 Commerce
      { source: 'class12-commerce', target: 'bcom', value: 1 },
      { source: 'class12-commerce', target: 'bba', value: 1 },
      { source: 'class12-commerce', target: 'law', value: 1 },
      
      // From Class 12 Arts
      { source: 'class12-arts', target: 'ba', value: 1 },
      { source: 'class12-arts', target: 'design', value: 1 },
      { source: 'class12-arts', target: 'law', value: 1 },
      
      // NEP 2020 Flexible Pathways (Cross-stream transitions)
      { source: 'class12-science', target: 'bba', value: 0.5, flexible: true },
      { source: 'class12-commerce', target: 'engineering', value: 0.3, flexible: true },
      { source: 'class12-arts', target: 'bcom', value: 0.4, flexible: true },
      
      // To Careers
      { source: 'engineering', target: 'software-engineer', value: 1 },
      { source: 'engineering', target: 'data-scientist', value: 0.7 },
      { source: 'medical', target: 'doctor', value: 1 },
      { source: 'bsc', target: 'researcher', value: 1 },
      { source: 'bcom', target: 'ca', value: 1 },
      { source: 'bba', target: 'entrepreneur', value: 1 },
      { source: 'ba', target: 'civil-servant', value: 1 },
      { source: 'design', target: 'designer', value: 1 },
      { source: 'law', target: 'lawyer', value: 1 }
    ]
  };

  const filteredData = React.useMemo(() => {
    if (!selectedFilters || Object.keys(selectedFilters)?.length === 0) {
      return pathwayData;
    }

    let filteredNodes = pathwayData?.nodes;
    let filteredLinks = pathwayData?.links;

    // Apply filters
    if (selectedFilters?.industry?.length > 0) {
      const industryMap = {
        'technology': ['software-engineer', 'data-scientist', 'engineering'],
        'healthcare': ['doctor', 'medical'],
        'finance': ['ca', 'bcom', 'bba'],
        'creative': ['designer', 'design'],
        'legal': ['lawyer', 'law'],
        'research': ['researcher', 'bsc']
      };

      const allowedNodes = new Set();
      selectedFilters?.industry?.forEach(industry => {
        if (industryMap?.[industry]) {
          industryMap?.[industry]?.forEach(nodeId => allowedNodes?.add(nodeId));
        }
      });

      filteredNodes = pathwayData?.nodes?.filter(node => 
        node?.category === 'education' || allowedNodes?.has(node?.id)
      );
    }

    if (selectedFilters?.educationLevel?.length > 0) {
      const levelMap = {
        'undergraduate': ['undergraduate'],
        'postgraduate': ['postgraduate'],
        'vocational': ['vocational']
      };

      const allowedCategories = new Set();
      selectedFilters?.educationLevel?.forEach(level => {
        if (levelMap?.[level]) {
          levelMap?.[level]?.forEach(cat => allowedCategories?.add(cat));
        }
      });

      filteredNodes = filteredNodes?.filter(node => 
        node?.category === 'education' || 
        node?.category === 'career' || 
        allowedCategories?.has(node?.category)
      );
    }

    // Filter links based on remaining nodes
    const nodeIds = new Set(filteredNodes.map(node => node.id));
    filteredLinks = pathwayData?.links?.filter(link => 
      nodeIds?.has(link?.source) && nodeIds?.has(link?.target)
    );

    return { nodes: filteredNodes, links: filteredLinks };
  }, [selectedFilters]);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev / 1.2, 0.5));
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'education': return 'var(--color-primary)';
      case 'undergraduate': return 'var(--color-secondary)';
      case 'career': return 'var(--color-accent)';
      default: return 'var(--color-muted-foreground)';
    }
  };

  const renderFlowchartView = () => (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-background to-muted/20">
      <svg 
        ref={containerRef}
        width="100%" 
        height="100%" 
        viewBox={`${-panPosition?.x} ${-panPosition?.y} ${800 / zoomLevel} ${600 / zoomLevel}`}
        className="cursor-move"
      >
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--color-border)" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Bottom Layer: Links */}
        <g className="links-layer">
          {filteredData?.links?.map((link, index) => {
            const sourceNode = filteredData?.nodes?.find(n => n?.id === link?.source);
            const targetNode = filteredData?.nodes?.find(n => n?.id === link?.target);
            
            if (!sourceNode || !targetNode) return null;

            const isFlexible = link?.flexible;
            
            return (
              <g key={index}>
                <line
                  x1={sourceNode?.x}
                  y1={sourceNode?.y}
                  x2={targetNode?.x}
                  y2={targetNode?.y}
                  stroke={isFlexible ? 'var(--color-warning)' : 'var(--color-border)'}
                  strokeWidth={isFlexible ? 3 : 2}
                  strokeDasharray={isFlexible ? '5,5' : 'none'}
                  opacity={0.7}
                />
              </g>
            );
          })}
        </g>

        {/* Middle Layer: Link Labels */}
        <g className="link-labels-layer">
          {filteredData?.links?.map((link, index) => {
            const sourceNode = filteredData?.nodes?.find(n => n?.id === link?.source);
            const targetNode = filteredData?.nodes?.find(n => n?.id === link?.target);
            
            if (!sourceNode || !targetNode || !link?.flexible) return null;

            const midX = (sourceNode?.x + targetNode?.x) / 2;
            const midY = (sourceNode?.y + targetNode?.y) / 2;
            
            return (
              <g key={`label-${index}`}>
                <rect
                  x={midX - 35}
                  y={midY - 15}
                  width={70}
                  height={20}
                  fill="white"
                  rx={4}
                  className="drop-shadow-sm"
                />
                <text
                  x={(sourceNode?.x + targetNode?.x) / 2}
                  y={(sourceNode?.y + targetNode?.y) / 2 - 5}
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--color-warning)"
                  className="font-medium pointer-events-none"
                >
                  NEP 2020
                </text>
              </g>
            );
          })}
        </g>

        {/* Nodes and circles */}
        {filteredData?.nodes?.map((node) => {
          const isSelected = selectedPathway?.id === node?.id;
          const nodeColor = getCategoryColor(node?.category);
          const labelYOffset = 45;
          
          return (
            <g 
              key={node?.id} 
              className="cursor-pointer group"
              onClick={() => onNodeClick(node)}
              style={{ transform: `translate(${node?.x}px, ${node?.y}px)` }}
              >
              {/* Circle underneath */}
              <circle
                cx={0}
                cy={0}
                r={isSelected ? 25 : 20}
                fill={nodeColor}
                stroke={isSelected ? 'var(--color-ring)' : 'white'}
                strokeWidth={isSelected ? 3 : 2}
                className="drop-shadow-sm transition-transform duration-200 ease-out group-hover:scale-110"
              />
              {/* Node text on top */}
              <text
                x={0}
                y={labelYOffset}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="12"
                fill="var(--color-foreground)"
                className="font-medium pointer-events-none select-none transition-opacity duration-200 ease-out group-hover:opacity-90"
              >
                {node?.name}
              </text>
            </g>
          );
        })}

      </svg>
      
      {/* Zoom Controls */}      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleZoomIn}
          className="w-10 h-10 p-0"
        >
          <Icon name="Plus" size={16} />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleZoomOut}
          className="w-10 h-10 p-0"
        >
          <Icon name="Minus" size={16} />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleResetView}
          className="w-10 h-10 p-0"
        >
          <Icon name="Home" size={16} />
        </Button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card border border-border rounded-lg p-3 card-shadow">
        <h4 className="text-sm font-semibold text-foreground mb-2">Legend</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-primary"></div>
            <span className="text-xs text-muted-foreground">Education</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-secondary"></div>
            <span className="text-xs text-muted-foreground">Undergraduate</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-accent"></div>
            <span className="text-xs text-muted-foreground">Career</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-1 bg-warning"></div>
            <span className="text-xs text-muted-foreground">NEP 2020 Flexible</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full">
      {renderFlowchartView()}
    </div>
  );
};   

export default PathwayVisualization;
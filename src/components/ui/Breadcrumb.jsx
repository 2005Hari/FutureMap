import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ 
  items = [], 
  className = "",
  showHome = true,
  separator = "ChevronRight"
}) => {
  const location = useLocation();

  // Auto-generate breadcrumbs based on current route if no items provided
  const generateBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [];

    if (showHome) {
      breadcrumbs?.push({
        label: 'Dashboard',
        path: '/student-dashboard',
        icon: 'Home'
      });
    }

    // Route mapping for better labels
    const routeLabels = {
      'student-dashboard': 'Dashboard',
      'aptitude-quiz-interface': 'Aptitude Quiz',
      'stream-recommendations': 'My Recommendations',
      'career-pathway-explorer': 'Career Explorer',
      'course-program-explorer': 'Course Explorer',
      'ai-career-chatbot': 'AI Counselor'
    };

    pathSegments?.forEach((segment, index) => {
      const path = '/' + pathSegments?.slice(0, index + 1)?.join('/');
      const label = routeLabels?.[segment] || segment?.replace(/-/g, ' ')?.replace(/\b\w/g, l => l?.toUpperCase());
      
      // Don't duplicate home/dashboard
      if (showHome && segment === 'student-dashboard') return;
      
      breadcrumbs?.push({
        label,
        path,
        isActive: index === pathSegments?.length - 1
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items?.length > 0 ? items : generateBreadcrumbs();

  if (breadcrumbItems?.length <= 1) {
    return null;
  }

  return (
    <nav className={`flex items-center space-x-1 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbItems?.map((item, index) => {
          const isLast = index === breadcrumbItems?.length - 1;
          const isActive = item?.isActive || isLast;

          return (
            <li key={item?.path || index} className="flex items-center space-x-1">
              {index > 0 && (
                <Icon 
                  name={separator} 
                  size={14} 
                  color="var(--color-muted-foreground)" 
                  className="flex-shrink-0"
                />
              )}
              <div className="flex items-center space-x-1">
                {item?.icon && (
                  <Icon 
                    name={item?.icon} 
                    size={14} 
                    color={isActive ? 'var(--color-foreground)' : 'var(--color-muted-foreground)'}
                  />
                )}
                
                {isActive ? (
                  <span 
                    className="font-medium text-foreground"
                    aria-current="page"
                  >
                    {item?.label}
                  </span>
                ) : (
                  <Link
                    to={item?.path}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-150 hover:underline"
                  >
                    {item?.label}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
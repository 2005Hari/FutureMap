import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/student-dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'View your personalized dashboard and progress'
    },
    {
      label: 'Take Quiz',
      path: '/aptitude-quiz-interface',
      icon: 'Brain',
      tooltip: 'Start or retake your aptitude assessment'
    },
    {
      label: 'My Recommendations',
      path: '/stream-recommendations',
      icon: 'Target',
      tooltip: 'View your personalized stream recommendations'
    },
    {
      label: 'Explore Careers',
      path: '/career-pathway-explorer',
      icon: 'Map',
      tooltip: 'Discover career pathways and opportunities'
    },
    {
      label: 'Ask AI',
      path: '/ai-career-chatbot',
      icon: 'MessageCircle',
      tooltip: 'Get personalized career guidance from AI'
    }
  ];

  const secondaryItems = [
    {
      label: 'Course Explorer',
      path: '/course-program-explorer',
      icon: 'BookOpen',
      tooltip: 'Browse courses and programs'
    }
  ];

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-card border-b border-border nav-shadow">
      <div className="w-full px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/student-dashboard" 
            className="flex items-center space-x-3 hover-scale"
            onClick={closeMobileMenu}
          >
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name="Compass" size={24} color="white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold text-foreground tracking-tight">
                CareerCompass
              </span>
              <span className="text-xs text-muted-foreground -mt-1">
                Your Future, Guided
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium
                  transition-all duration-200 hover-scale group relative
                  ${isActiveRoute(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
                title={item?.tooltip}
              >
                <Icon 
                  name={item?.icon} 
                  size={18} 
                  strokeWidth={isActiveRoute(item?.path) ? 2.5 : 2}
                />
                <span>{item?.label}</span>
              </Link>
            ))}

            {/* More Menu */}
            <div className="relative group">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
              >
                <Icon name="MoreHorizontal" size={18} />
                <span>More</span>
              </Button>
              
              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg modal-shadow opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-1010">
                <div className="py-2">
                  {secondaryItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className={`
                        flex items-center space-x-3 px-4 py-2 text-sm
                        transition-colors duration-150
                        ${isActiveRoute(item?.path)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-popover-foreground hover:bg-muted'
                        }
                      `}
                      title={item?.tooltip}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <nav className="py-4 space-y-1">
              {[...navigationItems, ...secondaryItems]?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium
                    transition-all duration-200 mx-2
                    ${isActiveRoute(item?.path)
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon 
                    name={item?.icon} 
                    size={20} 
                    strokeWidth={isActiveRoute(item?.path) ? 2.5 : 2}
                  />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
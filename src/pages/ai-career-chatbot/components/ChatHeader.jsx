import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ChatHeader = ({ onClearChat, messageCount = 0 }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-card border-b border-border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg">
            <Icon name="Bot" size={24} color="white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">AI Career Counselor</h1>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>Online</span>
              </div>
              {messageCount > 0 && (
                <>
                  <span>•</span>
                  <span>{messageCount} messages</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {messageCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearChat}
              iconName="Trash2"
              iconPosition="left"
              className="text-muted-foreground hover:text-foreground"
            >
              Clear Chat
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/student-dashboard')}
            iconName="ArrowLeft"
            iconPosition="left"
          >
            Dashboard
          </Button>
        </div>
      </div>
      {/* AI Capabilities */}
      <div className="mt-4 flex flex-wrap gap-2">
        {[
          { icon: "Target", label: "Career Guidance" },
          { icon: "BookOpen", label: "Stream Selection" },
          { icon: "TrendingUp", label: "Skill Development" },
          { icon: "GraduationCap", label: "Education Planning" }
        ]?.map((capability, index) => (
          <div
            key={index}
            className="flex items-center space-x-1 px-2 py-1 bg-muted/50 rounded-md text-xs text-muted-foreground"
          >
            <Icon name={capability?.icon} size={12} />
            <span>{capability?.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHeader;